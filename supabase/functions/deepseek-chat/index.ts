import { corsHeaders } from 'npm:@supabase/supabase-js/cors'

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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const apiKey = Deno.env.get('DEEPSEEK_API_KEY')
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API Key not configured' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }

  try {
    const body = await req.json()

    if (body.taskType) {
      return await handleAutoNotes(apiKey, body)
    }

    if (body.prompt) {
      const deepseekRes = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: body.prompt }] }),
      })
      const data = await deepseekRes.json()
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
    }

    const messages = Array.isArray(body.messages) ? body.messages : []
    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: '缺少 messages' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
      })
    }

    const deepseekBody: Record<string, unknown> = { model: body.model || 'deepseek-chat', messages }
    if (body.temperature !== undefined) deepseekBody.temperature = body.temperature
    if (body.response_format !== undefined) deepseekBody.response_format = body.response_format

    const deepseekRes = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify(deepseekBody),
    })
    const data = await deepseekRes.json()
    return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500,
    })
  }
})

async function handleAutoNotes(apiKey: string, body: Record<string, unknown>) {
  const taskType = String(body.taskType || '')
  const payload = (body.payload || {}) as Record<string, unknown>

  if (!AUTO_NOTES_TASK_PROMPTS[taskType]) {
    return new Response(JSON.stringify({ error: `不支持的札记任务类型：${taskType}` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
    })
  }

  const userPrompt = [
    AUTO_NOTES_TASK_PROMPTS[taskType],
    payload.promptInstructions ? `\n补充要求：\n${payload.promptInstructions}` : '',
    '\n用户材料 JSON：', JSON.stringify(payload, null, 2),
  ].join('\n')

  const messages = [
    { role: 'system', content: '你是"古典学园数字兰台"的中国古典学研究助手。请严格遵循用户指定的数据结构，尽量返回合法 JSON，不要伪造来源。' },
    { role: 'user', content: userPrompt },
  ]

  const deepseekRes = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ model: String(body.model || 'deepseek-chat'), messages }),
  })
  const data = await deepseekRes.json()
  return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
}
