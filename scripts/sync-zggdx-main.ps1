$SourceRoot = "D:\古典学园\数字兰台\doc-reviewer\zggdx"
$TargetRoot = "C:\Users\24997\Downloads\zggdx-main\zggdx-main"

if (-not (Test-Path -LiteralPath $TargetRoot)) {
    throw "目标目录不存在：$TargetRoot"
}

# 只补充和覆盖源目录中的文件，不删除目标目录里额外存在的文件。
robocopy $SourceRoot $TargetRoot /E /XD .git /XF .env /R:1 /W:1
$exitCode = $LASTEXITCODE

if ($exitCode -ge 8) {
    throw "同步失败，robocopy exit code: $exitCode"
}

Write-Host "同步完成（保留目标目录额外文件）"
