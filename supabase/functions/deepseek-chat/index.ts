const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
}

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'

const AUTO_NOTES_TASK_PROMPTS: Record<string, string> = {
  prepare_materials: '整理用户提供的古籍、注疏、论文、图片 OCR 或札记材料，识别材料类型、核心概念、来源线索和不确定处。请返回合法 JSON。',
  generate_reading_note: '生成一份可读、可校对的完整读书会札记，不要拆成碎片卡片。必须保留资料来源线索，遇到 OCR 或解析不确定内容要标注"不确定"。请返回合法 JSON。',
  split_note_fragments: '把用户校对后的完整读书会札记拆分为适合分析、建库、检索和知识图谱使用的结构化片段。请返回合法 JSON。',
  convert_to_database_json: '把碎片化札记转换为数据库可插入前的标准 JSON。如果用户提供模板，优先贴合模板；否则使用默认 schema。请只返回合法 JSON。',
  analyze_word_cloud: '基于 fragments 生成词云数据。请返回 JSON：{ "terms": [{ "text": "仁", "weight": 10, "category": "义理" }] }。',
  analyze_comparison_table: '基于 fragments 生成对比表。请返回 JSON：{ "columns": ["概念", "原文", "何晏", "朱熹", "刘宝楠", "现代解释"], "rows": [] }。',
  analyze_mind_map: '基于 fragments 生成思维导图数据。请返回 JSON：{ "root": { "id": "root", "label": "...", "children": [] } }。',
  analyze_argument_structure: '基于 fragments 生成义理逻辑或论证结构图。请返回 JSON：{ "nodes": [], "edges": [] }。',
  analyze_knowledge_graph: '基于 fragments 生成人物、事件、关键词、正文之间的知识图谱。请返回 JSON：{ "nodes": [], "edges": [] }。',
}

Deno.serve(async (req) => {
  console.log('Function started')

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS })
  }

  const apiKey = Deno.env.get('DEEPSEEK_API_KEY')
  console.log('---DEBUG KEY---', apiKey ? apiKey.slice(0, 10) + '...' : 'undefined')

  if (!apiKey) {
    return new Response(
      JSON.stringify({ ok: false, error: { code: 'MISSING_DEEPSEEK_API_KEY', message: '后端未配置 DeepSeek API Key' } }),
      { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, status: 500 },
    )
  }

  try {
    const body = await req.json()

    if (body.taskType) {
      const taskType = String(body.taskType || '')
      const payload = (body.payload || {}) as Record<string, unknown>

      if (!AUTO_NOTES_TASK_PROMPTS[taskType]) {
        return new Response(
          JSON.stringify({ ok: false, error: { code: 'UNSUPPORTED_AUTO_NOTES_TASK', message: `不支持的札记任务类型：${taskType}` } }),
          { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, status: 400 },
        )
      }

      const userPrompt = [
        AUTO_NOTES_TASK_PROMPTS[taskType],
        payload && payload.promptInstructions ? `\n补充要求：\n${payload.promptInstructions}` : '',
        '\n用户材料 JSON：',
        JSON.stringify(payload || {}, null, 2),
      ].join('\n')

      const messages = [
        { role: 'system', content: '你是"古典学园数字兰台"的中国古典学研究助手。请严格遵循用户指定的数据结构，尽量返回合法 JSON，不要伪造来源。' },
        { role: 'user', content: userPrompt },
      ]

      const data = await callDeepSeek(apiKey, { model: String(body.model || 'deepseek-chat'), messages })
      return new Response(JSON.stringify(data), { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, status: 200 })
    }

    const messages = Array.isArray(body.messages) ? body.messages : []
    if (messages.length === 0) {
      return new Response(
        JSON.stringify({ ok: false, error: { code: 'INVALID_MESSAGES', message: '请求缺少 messages' } }),
        { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, status: 400 },
      )
    }

    const data = await callDeepSeek(apiKey, {
      model: String(body.model || 'deepseek-chat'),
      messages,
      temperature: body.temperature as number | undefined,
      response_format: body.response_format as Record<string, unknown> | undefined,
    })

    return new Response(JSON.stringify(data), { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, status: 200 })
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, error: { code: 'INTERNAL_ERROR', message: error instanceof Error ? error.message : String(error) } }),
      { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, status: 500 },
    )
  }
})

async function callDeepSeek(apiKey: string, requestBody: {
  model: string
  messages: Array<Record<string, unknown>>
  temperature?: number
  response_format?: Record<string, unknown>
}): Promise<Record<string, unknown>> {
  const body: Record<string, unknown> = { model: requestBody.model || 'deepseek-chat', messages: requestBody.messages || [] }
  if (requestBody.temperature !== undefined) body.temperature = requestBody.temperature
  if (requestBody.response_format !== undefined) body.response_format = requestBody.response_format

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify(body),
    })

    const text = await response.text()
    console.log('---DEEPSEEK RESPONSE---', response.status, text.slice(0, 200))

    let data: Record<string, unknown>
    try {
      data = text ? JSON.parse(text) : {}
    } catch {
      return { ok: false, error: { code: 'DEEPSEEK_INVALID_JSON', message: 'DeepSeek API 返回了非 JSON 内容', raw: text.slice(0, 1000) } }
    }

    if (!response.ok) {
      return { ok: false, error: { code: 'DEEPSEEK_API_ERROR', message: extractDeepSeekError(data) || `HTTP ${response.status}`, detail: data } }
    }

    return data
  } catch (error) {
    return { ok: false, error: { code: 'DEEPSEEK_NETWORK_ERROR', message: '后端请求 DeepSeek API 失败', detail: error instanceof Error ? error.message : String(error) } }
  }
}

function extractDeepSeekError(data: Record<string, unknown>): string {
  if (!data) return ''
  if (typeof data.error === 'string') return data.error as string
  if (data.error && typeof data.error === 'object' && (data.error as Record<string, unknown>).message) {
    return (data.error as Record<string, unknown>).message as string
  }
  if (data.message) return data.message as string
  return ''
}
