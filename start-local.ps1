param(
    [int]$Port = 0
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$DeepSeekApiUrl = 'https://api.deepseek.com/chat/completions'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

function Load-EnvFile {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) { return }
    Get-Content -LiteralPath $Path | ForEach-Object {
        $line = $_.Trim()
        if (-not $line -or $line.StartsWith('#') -or $line -notmatch '=') { return }
        $name, $value = $line -split '=', 2
        $name = $name.Trim()
        $value = $value.Trim().Trim('"').Trim("'")
        if ($name) {
            [Environment]::SetEnvironmentVariable($name, $value, 'Process')
        }
    }
}

function Send-Json {
    param(
        [System.Net.HttpListenerResponse]$Response,
        [int]$StatusCode,
        [object]$Data
    )
    $json = $Data | ConvertTo-Json -Depth 80
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    $Response.StatusCode = $StatusCode
    $Response.ContentType = 'application/json; charset=utf-8'
    $Response.ContentLength64 = $bytes.Length
    $Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $Response.OutputStream.Close()
}

function Add-CorsHeaders {
    param([System.Net.HttpListenerResponse]$Response)
    $Response.Headers['Access-Control-Allow-Origin'] = '*'
    $Response.Headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    $Response.Headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
}

function Read-RequestJson {
    param([System.Net.HttpListenerRequest]$Request)
    $reader = New-Object System.IO.StreamReader($Request.InputStream, [System.Text.Encoding]::UTF8)
    $raw = $reader.ReadToEnd()
    if (-not $raw) { return [pscustomobject]@{} }
    return $raw | ConvertFrom-Json
}

function Get-MimeType {
    param([string]$Path)
    $ext = [System.IO.Path]::GetExtension($Path).ToLowerInvariant()
    switch ($ext) {
        '.html' { 'text/html; charset=utf-8' }
        '.js' { 'application/javascript; charset=utf-8' }
        '.css' { 'text/css; charset=utf-8' }
        '.json' { 'application/json; charset=utf-8' }
        '.png' { 'image/png' }
        '.jpg' { 'image/jpeg' }
        '.jpeg' { 'image/jpeg' }
        '.gif' { 'image/gif' }
        '.svg' { 'image/svg+xml; charset=utf-8' }
        '.ico' { 'image/x-icon' }
        '.txt' { 'text/plain; charset=utf-8' }
        '.md' { 'text/markdown; charset=utf-8' }
        default { 'application/octet-stream' }
    }
}

function Resolve-StaticPath {
    param([string]$UrlPath)
    $decoded = [System.Uri]::UnescapeDataString($UrlPath)
    if ($decoded -eq '/') { $decoded = '/index.html' }
    $relative = $decoded.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
    $full = [System.IO.Path]::GetFullPath((Join-Path $Root $relative))
    $rootFull = [System.IO.Path]::GetFullPath($Root)
    if (-not $full.StartsWith($rootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
        return $null
    }
    return $full
}

function Send-StaticFile {
    param(
        [System.Net.HttpListenerResponse]$Response,
        [string]$UrlPath
    )
    $file = Resolve-StaticPath $UrlPath
    if (-not $file -or -not (Test-Path -LiteralPath $file -PathType Leaf)) {
        Send-Json $Response 404 @{ ok = $false; error = @{ code = 'NOT_FOUND'; message = 'File not found' } }
        return
    }
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $Response.StatusCode = 200
    $Response.ContentType = Get-MimeType $file
    $Response.ContentLength64 = $bytes.Length
    $Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $Response.OutputStream.Close()
}

function Get-DeepSeekMessagesForAutoNotes {
    param([string]$TaskType, [object]$Payload)
    $taskPrompts = @{
        prepare_materials = 'Organize the provided classical texts, commentaries, papers, OCR text, and notes. Identify material types, key concepts, source clues, and uncertain parts. Return valid JSON only.'
        generate_reading_note = 'Generate a complete, readable, editable reading-seminar note. Do not split it into cards. Keep source clues. Mark OCR or parsing uncertainty clearly. Return valid JSON only.'
        split_note_fragments = 'Split the confirmed reading note into structured fragments for analysis, database insertion, retrieval, and knowledge graphs. Return valid JSON only.'
        convert_to_database_json = 'Convert note fragments into database-ready JSON. If a user template is provided, follow it first; otherwise use the default schema. Return valid JSON only.'
        analyze_word_cloud = 'Generate word-cloud data from fragments. Return JSON: { "terms": [{ "text": "ren", "weight": 10, "category": "concept" }] }.'
        analyze_comparison_table = 'Generate comparison-table data from fragments. Return JSON: { "columns": ["concept", "original", "He Yan", "Zhu Xi", "Liu Baonan", "modern"], "rows": [] }.'
        analyze_mind_map = 'Generate mind-map data from fragments. Return JSON: { "root": { "id": "root", "label": "...", "children": [] } }.'
        analyze_argument_structure = 'Generate argument-structure graph data from fragments. Return JSON: { "nodes": [], "edges": [] }.'
        analyze_knowledge_graph = 'Generate a knowledge graph connecting persons, events, keywords, and source text. Return JSON: { "nodes": [], "edges": [] }.'
    }
    if (-not $taskPrompts.ContainsKey($TaskType)) {
        throw "UNSUPPORTED_AUTO_NOTES_TASK:$TaskType"
    }

    $payloadJson = $Payload | ConvertTo-Json -Depth 80
    $userPrompt = @(
        $taskPrompts[$TaskType],
        '',
        'User material JSON:',
        $payloadJson
    ) -join "`n"

    return @(
        @{ role = 'system'; content = 'You are a Chinese classical-studies research assistant for Lantai. Follow the requested data structure exactly, return valid JSON when requested, and do not fabricate sources.' },
        @{ role = 'user'; content = $userPrompt }
    )
}

function Invoke-DeepSeek {
    param([object]$RequestBody)
    $apiKey = [Environment]::GetEnvironmentVariable('DEEPSEEK_API_KEY', 'Process')
    if (-not $apiKey) {
        return @{
            status = 500
            data = @{ ok = $false; error = @{ code = 'MISSING_DEEPSEEK_API_KEY'; message = 'Backend DEEPSEEK_API_KEY is not configured' } }
        }
    }

    $body = @{
        model = if ($RequestBody.model) { [string]$RequestBody.model } else { 'deepseek-chat' }
        messages = @($RequestBody.messages)
    }
    if ($null -ne $RequestBody.temperature) { $body.temperature = $RequestBody.temperature }
    if ($null -ne $RequestBody.response_format) { $body.response_format = $RequestBody.response_format }

    try {
        $jsonBody = $body | ConvertTo-Json -Depth 80
        $jsonBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonBody)
        $response = Invoke-WebRequest -Uri $DeepSeekApiUrl -Method Post -Headers @{
            'Content-Type' = 'application/json; charset=utf-8'
            'Authorization' = "Bearer $apiKey"
        } -Body $jsonBytes -TimeoutSec 120 -UseBasicParsing

        if ($response.RawContentStream) {
            $response.RawContentStream.Position = 0
            $reader = New-Object System.IO.StreamReader($response.RawContentStream, [System.Text.Encoding]::UTF8)
            $responseText = $reader.ReadToEnd()
        } else {
            $responseText = $response.Content
        }
        $data = $responseText | ConvertFrom-Json
        return @{ status = [int]$response.StatusCode; data = $data }
    } catch {
        $statusCode = 502
        $message = $_.Exception.Message
        $detail = $message
        Write-Host "DeepSeek request failed: $message"
        Write-Host "DeepSeek exception type: $($_.Exception.GetType().FullName)"
        Write-Host "DeepSeek script stack: $($_.ScriptStackTrace)"
        if ($_.Exception.Response) {
            try {
                $statusCode = [int]$_.Exception.Response.StatusCode
                $stream = $_.Exception.Response.GetResponseStream()
                $reader = New-Object System.IO.StreamReader($stream)
                $detail = $reader.ReadToEnd()
                Write-Host "DeepSeek error status: $statusCode"
                Write-Host "DeepSeek error body: $detail"
                $parsed = $detail | ConvertFrom-Json
                if ($parsed.error.message) { $message = $parsed.error.message }
                elseif ($parsed.message) { $message = $parsed.message }
            } catch {}
        }
        return @{
            status = $statusCode
            data = @{ ok = $false; error = @{ code = 'DEEPSEEK_API_ERROR'; message = $message; detail = $detail } }
        }
    }
}

Load-EnvFile (Join-Path $Root '.env')
if ($Port -le 0) {
    $envPort = [Environment]::GetEnvironmentVariable('PORT', 'Process')
    $Port = if ($envPort) { [int]$envPort } else { 3000 }
}

$listener = [System.Net.HttpListener]::new()
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Host "Cannot start local service: $($_.Exception.Message)"
    Write-Host "If the port is busy, run: powershell -ExecutionPolicy Bypass -File .\start-local.ps1 -Port 3001"
    exit 1
}

Write-Host "Lantai local service started: $prefix"
Write-Host "DeepSeek key configured: $([bool][Environment]::GetEnvironmentVariable('DEEPSEEK_API_KEY', 'Process'))"
Write-Host "Press Ctrl+C to stop."

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    Add-CorsHeaders $response

    try {
        if ($request.HttpMethod -eq 'OPTIONS') {
            $response.StatusCode = 204
            $response.OutputStream.Close()
            continue
        }

        $path = $request.Url.AbsolutePath
        if ($request.HttpMethod -eq 'POST' -and $path -eq '/api/deepseek/chat') {
            $body = Read-RequestJson $request
            if (-not $body.messages -or @($body.messages).Count -eq 0) {
                Send-Json $response 400 @{ ok = $false; error = @{ code = 'INVALID_MESSAGES'; message = 'Request is missing messages' } }
                continue
            }
            $result = Invoke-DeepSeek $body
            Send-Json $response $result.status $result.data
            continue
        }

        if ($request.HttpMethod -eq 'POST' -and $path -eq '/api/auto-notes/llm') {
            $body = Read-RequestJson $request
            $taskType = [string]$body.taskType
            try {
                $messages = Get-DeepSeekMessagesForAutoNotes $taskType $body.payload
            } catch {
                Send-Json $response 400 @{ ok = $false; error = @{ code = 'UNSUPPORTED_AUTO_NOTES_TASK'; message = "Unsupported auto-notes task type: $taskType" } }
                continue
            }
            $result = Invoke-DeepSeek @{
                model = if ($body.model) { $body.model } else { 'deepseek-chat' }
                messages = $messages
            }
            Send-Json $response $result.status $result.data
            continue
        }

        if ($path.StartsWith('/api/')) {
            Send-Json $response 404 @{ ok = $false; error = @{ code = 'API_NOT_FOUND'; message = "Backend API route not found: $path" } }
            continue
        }

        Send-StaticFile $response $path
    } catch {
        Send-Json $response 500 @{ ok = $false; error = @{ code = 'INTERNAL_SERVER_ERROR'; message = $_.Exception.Message } }
    }
}
