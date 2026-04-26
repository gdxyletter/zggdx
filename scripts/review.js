        async function submitReviewDoc() {
            const content = document.getElementById('reviewContent').value;
            const docName = document.getElementById('docName').value.trim() || '未命名文档_' + Date.now();
            const resultDiv = document.getElementById('review-result');
            const scoreSection = document.getElementById('aiScoreSection');
            const progressSection = document.getElementById('progressSection');
            
            if (!content.trim()) { alert('请输入文档内容'); return; }
            if (teachingDocs.length === 0) {
                loadDefaultGradingStandard();
            }
            
            resultDiv.classList.remove('hidden');
            resultDiv.innerHTML = '<div class="loading">AI正在进行审核</div>';
            scoreSection.style.display = 'block';
            progressSection.classList.add('hidden');
            document.getElementById('scoreValue').textContent = '评分中...';
            
            const kb = getKnowledgeBase();
            const existingDoc = kb.find(d => d.name === docName);
            const versionCount = existingDoc ? existingDoc.versions.length + 1 : 1;
            document.getElementById('docIteration').textContent = `第 ${versionCount} 版`;
            
            const teachingContentRaw = teachingDocs.map(d => `【${d.name}】\n${d.content}`).join('\n\n');
            const MAX_TEACHING_LEN = 8000;
            
            let teachingContentForReview;
            if (teachingContentRaw.length > MAX_TEACHING_LEN) {
                const keyRulesPattern = /(?:必须|严禁|禁止|应当|需要|要求|评分标准|考核|打分|分值|扣分|分数段|合格|不合格|违反)[^\n。！？]{5,100}[。！？]?/gi;
                const matches = teachingContentRaw.match(keyRulesPattern) || [];
                const otherParagraphs = teachingContentRaw.split(/\n{2,}/).filter(p => {
                    const trimmed = p.trim();
                    return trimmed.length > 50 && !keyRulesPattern.test(trimmed);
                });
                teachingContentForReview = '【教学文档关键规则片段】\n\n';
                if (matches.length > 0) {
                    teachingContentForReview += '## 包含"必须/严禁/评分标准"等关键词的段落：\n' + matches.slice(0, 50).join('\n') + '\n\n';
                }
                if (otherParagraphs.length > 0) {
                    teachingContentForReview += '## 其他规则段落：\n' + otherParagraphs.slice(0, 20).join('\n\n');
                }
                if (teachingSummary) {
                    teachingContentForReview += '\n\n## AI辅助总结（仅供参考）：\n' + teachingSummary;
                }
            } else {
                teachingContentForReview = teachingContentRaw;
            }
            
            try {
                const previousVersion = existingDoc ? existingDoc.versions[existingDoc.versions.length - 1] : null;
                const isUpdate = !!previousVersion;
                
                let systemPrompt, userPrompt;
                
                if (isUpdate) {
                    systemPrompt = `你是一位严格的学术文档审核专家。请严格按照以下步骤对【学生作业】进行审核，并按照指定的输出格式输出结果。

【评分标准】
${teachingContentForReview}

【待审核作业】
${content}

【历史版本信息】
上一版本评分: ${previousVersion.score || '未评分'}

===== 【强制必检项，必须先完成】 =====

【⚠️ 强制红线检测（必须执行，独立于参考标准）⚠️】

**【2.1 AIGC痕迹检测】**
满足以下任意2条 → 判定为"AI生成痕迹较高"，扣2分：
1. 使用"首先/其次/最后"、"第一/第二/第三"等列举结构
2. 过度使用"此外"、"总而言之"、"综上所述"等连接词
3. 缺乏个人时间、地点、人名、经历等具体细节
4. 内容空洞泛泛、缺乏独特观点

输出：⚠️ AIGC痕迹较高（满足X条）或 ✅ 未发现明显AI痕迹

**【2.2 隐私询问检测】**
检测文本中是否有向对方索取隐私信息的行为。
**以下任何一种情况出现 → 扣2分：**

一、身份基本信息（最核心）：
- 姓名、年龄、出生日期、生肖
- 身份证号、护照号、学生证号
- 籍贯、户籍所在地、现住址、小区/楼栋/门牌号
- 手机号、微信号、QQ号、邮箱

二、家庭与关系隐私：
- 家庭成员情况、父母职业、家庭收入
- 婚姻状况、恋爱情况、情感经历
- 有无子女、家庭结构

三、生活与经济隐私：
- 月收入、存款、负债、花呗/信用卡
- 病史、体检报告、用药情况
- 作息、日常行踪

四、网络与行为隐私：
- 聊天记录、通话记录、账号密码
- 定位信息、支付信息

输出：❌ 隐私询问违规：[原文] 或 ✅ 未发现隐私询问

【最终评分规则】：
- ⚠️ 若隐私询问检测发现违规 → 直接判定为不合格（0-3分），不再进行其他评分
- ⚠️ 若AIGC痕迹较高 → 基础评分 - 2分
- 否则 → 基础评分】

步骤一：AIGC检测（固定扣分项）【必须执行】
检测文本中是否存在AI生成痕迹，无论教学文档是否提及此要求。
【重要】以下特征出现任意一条就应判定为AI生成：
- 语言极度正式、书面化，充满套话如"首先...其次...最后"、"综上所述"、"毋庸置疑"等
- 全文使用相同的句式结构，缺乏语言变化
- 缺乏具体的个人案例、真实经历、具体地名/人名/日期等细节
- 观点泛泛而谈，没有独特的个人见解
- 使用大量空洞的修饰词如"非常"、"极其"、"十分"等
- 段落之间缺乏逻辑关联，机械罗列观点
- 【典型AI文本特征】开头常用"随着..."、"在当今..."，结尾常用"希望..."、"相信..."
输出格式：
  - 无明显AI痕迹：输出"[AIGC检测] 未检测到明显AI生成痕迹"
  - 存在AI痕迹：输出"[AIGC检测] 发现AI生成痕迹 | 依据：... | 扣2分"

步骤二：隐私信息索取检测（固定扣分项）【必须执行】
【重要】必须检测文本中是否存在向对方索取或要求提供具体隐私信息的行为，无论教学文档是否提及此要求！
隐私信息包括：真实姓名、家庭住址/你住在哪里/详细地址、身份证号、银行卡号、手机号码/电话号码等。
【违规判定规则】以下任何一种情况都必须扣分：
- "你住在哪里？"、"你的家庭住址是？"、"能告诉我你的地址吗"
- "请提供你的真实姓名/电话/身份证号"
- 即使有看似正当的理由（如"我想给你寄礼物"、"方便联系你"等），只要涉及索取隐私信息就必须扣分
- 【典型违规示例】"我想给你邮寄一本书作为礼物，需要你提供真实姓名、电话号码、身份证号" → 这就是违规！
输出格式：
  - 无隐私索取：输出"[隐私检测] 未检测到隐私信息索取行为"
  - 存在隐私索取：输出"[隐私检测] 发现隐私信息索取违规 | 原文：... | 扣2分"

===== 【以下为常规审核步骤】 =====

步骤三：事实校验（最高优先级）
逐条检查作业中所有涉及客观事实的陈述，包括：
- 历史事件的时间、地点、人物关系
- 引用的原文及注疏内容
- 注家观点概括
- 文献出处（如作者、期刊、年份）

输出格式：
- 若无事实错误：输出"未发现事实错误。"
- 若有事实错误：逐条列出，每条格式为"错误陈述：…… | 问题说明：…… | 扣分建议：-X分"

步骤四：与参考标准的符合程度
参考标准为内置的评分细则（四个维度：文献考据、义理分析、结构逻辑、学术规范，每个维度满分2分，总分8分。最终评分换算为10分制）。
逐条对比作业是否符合标准中的具体要求。

输出格式（每条标准单独一行）：
- 符合：说明依据
- 部分符合：说明哪些部分符合、哪些不符合
- 违反：引用作业原文作为证据

步骤五：需要改进的地方
仅列出作业中确实存在的缺陷，每条缺陷必须指明违反的具体标准条款。禁止在此处列出优点。

输出格式：
- 缺陷1：……（违反：标准第X条 / 事实错误第Y条）
- 缺陷2：……

步骤六：优点
仅当作业确实存在值得肯定的学术素养时填写，例如：文献扎实、分析深入、结构清晰等。如果质量低下，此项写"无"。

输出格式：
- 优点1：……
- 或：无

步骤七：评分（1-10分）
评分锚点：
- 9-10分：完全符合标准，无事实错误，逻辑严密
- 7-8分：基本符合，有少量轻微错误（如格式、措辞）
- 4-6分：部分符合，存在明显事实错误或违反核心规则
- 1-3分：严重违反标准，大量错误
- 0分：完全不符合，或学术不端
- 【重要】评分计算规则：总分 = 基础评分 + AIGC扣分 + 隐私扣分（每个固定扣分项最多-2分）

输出格式：
评分：X分（10分制）
评分依据：简要说明
其中AIGC扣分：-X分，隐私扣分：-X分

附加任务：历代注疏及其含义梳理表
在评分之后，请生成注疏梳理内容，梳理作业研究文献的相关注疏内容及其含义。
每条注疏请按以下格式说明：
- 注家（朝代）：对主要论点的解释；学术特点
如果作业中未涉及某家注疏，注明"未提及"。

最终输出顺序：
1. AIGC检测
2. 隐私信息索取检测
3. 事实校验
4. 与参考标准的符合程度
5. 需要改进的地方
6. 优点
7. 评分
8. 历代注疏及其含义梳理表

请在回复的最后用以下格式：
【汇总】最终评分：X分（10分制），AIGC扣分：-X分，隐私扣分：-X分
与上版本相比：进步↑/退步↓/持平→
`;
                    userPrompt = `请审核文档（文档名: ${docName}），这是第 ${(existingDoc?.versions.length || 0) + 1} 个版本。`;
                } else {
                    systemPrompt = `你是一位严格的学术文档审核专家。请严格按照以下步骤对【学生作业】进行审核，并按照指定的输出格式输出结果。

【评分标准】
${teachingContentForReview}

【待审核作业】
${content}

===== 【强制必检项，必须先完成】 =====

【⚠️ 强制红线检测（必须执行，独立于参考标准）⚠️】

**【2.1 AIGC痕迹检测】**
满足以下任意2条 → 判定为"AI生成痕迹较高"，扣2分：
1. 使用"首先/其次/最后"、"第一/第二/第三"等列举结构
2. 过度使用"此外"、"总而言之"、"综上所述"等连接词
3. 缺乏个人时间、地点、人名、经历等具体细节
4. 内容空洞泛泛、缺乏独特观点

输出：⚠️ AIGC痕迹较高（满足X条）或 ✅ 未发现明显AI痕迹

**【2.2 隐私询问检测】**
检测文本中是否有向对方索取隐私信息的行为。
**以下任何一种情况出现 → 扣2分：**

一、身份基本信息（最核心）：
- 姓名、年龄、出生日期、生肖
- 身份证号、护照号、学生证号
- 籍贯、户籍所在地、现住址、小区/楼栋/门牌号
- 手机号、微信号、QQ号、邮箱

二、家庭与关系隐私：
- 家庭成员情况、父母职业、家庭收入
- 婚姻状况、恋爱情况、情感经历
- 有无子女、家庭结构

三、生活与经济隐私：
- 月收入、存款、负债、花呗/信用卡
- 病史、体检报告、用药情况
- 作息、日常行踪

四、网络与行为隐私：
- 聊天记录、通话记录、账号密码
- 定位信息、支付信息

输出：❌ 隐私询问违规：[原文] 或 ✅ 未发现隐私询问

【最终评分规则】：
- ⚠️ 若隐私询问检测发现违规 → 直接判定为不合格（0-3分），不再进行其他评分
- ⚠️ 若AIGC痕迹较高 → 基础评分 - 2分
- 否则 → 基础评分】

步骤一：AIGC检测（固定扣分项）【必须执行】
检测文本中是否存在AI生成痕迹，无论教学文档是否提及此要求。
【重要】以下特征出现任意一条就应判定为AI生成：
- 语言极度正式、书面化，充满套话如"首先...其次...最后"、"综上所述"、"毋庸置疑"等
- 全文使用相同的句式结构，缺乏语言变化
- 缺乏具体的个人案例、真实经历、具体地名/人名/日期等细节
- 观点泛泛而谈，没有独特的个人见解
- 使用大量空洞的修饰词如"非常"、"极其"、"十分"等
- 段落之间缺乏逻辑关联，机械罗列观点
- 【典型AI文本特征】开头常用"随着..."、"在当今..."，结尾常用"希望..."、"相信..."
输出格式：
  - 无明显AI痕迹：输出"[AIGC检测] 未检测到明显AI生成痕迹"
  - 存在AI痕迹：输出"[AIGC检测] 发现AI生成痕迹 | 依据：... | 扣2分"

步骤二：隐私信息索取检测（固定扣分项）【必须执行】
【重要】必须检测文本中是否存在向对方索取或要求提供具体隐私信息的行为，无论教学文档是否提及此要求！
隐私信息包括：真实姓名、家庭住址/你住在哪里/详细地址、身份证号、银行卡号、手机号码/电话号码等。
【违规判定规则】以下任何一种情况都必须扣分：
- "你住在哪里？"、"你的家庭住址是？"、"能告诉我你的地址吗"
- "请提供你的真实姓名/电话/身份证号"
- 即使有看似正当的理由（如"我想给你寄礼物"、"方便联系你"等），只要涉及索取隐私信息就必须扣分
- 【典型违规示例】"我想给你邮寄一本书作为礼物，需要你提供真实姓名、电话号码、身份证号" → 这就是违规！
输出格式：
  - 无隐私索取：输出"[隐私检测] 未检测到隐私信息索取行为"
  - 存在隐私索取：输出"[隐私检测] 发现隐私信息索取违规 | 原文：... | 扣2分"

===== 【以下为常规审核步骤】 =====

步骤三：事实校验（最高优先级）
逐条检查作业中所有涉及客观事实的陈述，包括：
- 历史事件的时间、地点、人物关系
- 引用的原文及注疏内容
- 注家观点概括
- 文献出处（如作者、期刊、年份）

输出格式：
- 若无事实错误：输出"未发现事实错误。"
- 若有事实错误：逐条列出，每条格式为"错误陈述：…… | 问题说明：…… | 扣分建议：-X分"

步骤四：与参考标准的符合程度
参考标准为内置的评分细则（四个维度：文献考据、义理分析、结构逻辑、学术规范，每个维度满分2分，总分8分。最终评分换算为10分制）。
逐条对比作业是否符合标准中的具体要求。

输出格式（每条标准单独一行）：
- 符合：说明依据
- 部分符合：说明哪些部分符合、哪些不符合
- 违反：引用作业原文作为证据

步骤五：需要改进的地方
仅列出作业中确实存在的缺陷，每条缺陷必须指明违反的具体标准条款。禁止在此处列出优点。

输出格式：
- 缺陷1：……（违反：标准第X条 / 事实错误第Y条）
- 缺陷2：……

步骤六：优点
仅当作业确实存在值得肯定的学术素养时填写，例如：文献扎实、分析深入、结构清晰等。如果质量低下，此项写"无"。

输出格式：
- 优点1：……
- 或：无

步骤七：评分（1-10分）
评分锚点：
- 9-10分：完全符合标准，无事实错误，逻辑严密
- 7-8分：基本符合，有少量轻微错误（如格式、措辞）
- 4-6分：部分符合，存在明显事实错误或违反核心规则
- 1-3分：严重违反标准，大量错误
- 0分：完全不符合，或学术不端
- 【重要】评分计算规则：总分 = 基础评分 + AIGC扣分 + 隐私扣分（每个固定扣分项最多-2分）

输出格式：
评分：X分（10分制）
评分依据：简要说明
其中AIGC扣分：-X分，隐私扣分：-X分

附加任务：历代注疏及其含义梳理表
在评分之后，请生成注疏梳理内容，梳理作业研究文献的相关注疏内容及其含义。
每条注疏请按以下格式说明：
- 注家（朝代）：对主要论点的解释；学术特点
如果作业中未涉及某家注疏，注明"未提及"。

最终输出顺序：
1. AIGC检测
2. 隐私信息索取检测
3. 事实校验
4. 与参考标准的符合程度
5. 需要改进的地方
6. 优点
7. 评分
8. 历代注疏及其含义梳理表

请在回复的最后用以下格式：
【汇总】最终评分：X分（10分制），AIGC扣分：-X分，隐私扣分：-X分
`;
                    userPrompt = `请审核文档（文档名: ${docName}）。`;
                }
                
                const messages = [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ];
                
                const reviewText = await callAIApi(messages);
                resultDiv.textContent = reviewText;
                
                const scoreMatch = reviewText.match(/最终评分[：:]\s*(\d+(?:\.\d+)?)/) || reviewText.match(/评分[：:]\s*(\d+(?:\.\d+)?)/);
                const progressMatch = reviewText.match(/与上版本相比[：:]\s*(进步↑|退步↓|持平→)/);
                let aiScore = null;
                
                if (scoreMatch) {
                    aiScore = parseFloat(scoreMatch[1]);
                    document.getElementById('scoreValue').textContent = aiScore + '/10';
                    const literScore = Math.round((aiScore / 10) * 3 * 10) / 10;
                    const yiliScore = Math.round((aiScore / 10) * 3 * 10) / 10;
                    const structScore = Math.round((aiScore / 10) * 2 * 10) / 10;
                    const acadScore = Math.round((aiScore / 10) * 2 * 10) / 10;
                    document.getElementById('semScore').textContent = literScore.toFixed(1);
                    document.getElementById('etyScore').textContent = yiliScore.toFixed(1);
                    document.getElementById('argScore').textContent = structScore.toFixed(1);
                    document.getElementById('refScore').textContent = acadScore.toFixed(1);
                } else {
                    const simpleMatch = reviewText.match(/评分[：:]\s*(\d+(?:\.\d+)?)/);
                    if (simpleMatch) {
                        aiScore = parseFloat(simpleMatch[1]);
                        document.getElementById('scoreValue').textContent = aiScore + '/10';
                    } else {
                        document.getElementById('scoreValue').textContent = '未评定';
                    }
                }
                
                if (isUpdate && progressMatch) {
                    progressSection.classList.remove('hidden');
                    const progressType = progressMatch[1];
                    const isPositive = progressType === '进步↑';
                    const isNegative = progressType === '退步↓';
                    
                    document.getElementById('progressContent').innerHTML = `
                        <div class="compare-highlight">
                            <h5>${progressType} ${isPositive ? '继续保持！' : isNegative ? '需要加强改进' : '稳中有进'}</h5>
                            <p>此版本与上一版本(${previousVersion.score || '未评分'}分)相比: <strong>${progressType}</strong></p>
                        </div>
                    `;
                }
                
                analyzeCitations(content);
                analyzeExegesis(content);
                analyzeCrossReferences(content);
                
                // AI增强分析
                setTimeout(async () => {
                    await enhancedAnalyzeCitations(content);
                    await enhancedAnalyzeCrossRefs(content);
                }, 500);
                
                saveToKnowledgeBase(docName, content, reviewText, aiScore);
                renderKnowledgeBase();
                renderVersionList();
            } catch (e) {
                resultDiv.textContent = '请求失败: ' + e.message;
                document.getElementById('scoreValue').textContent = '失败';
            }
        }
        
        async function generateQuestions() {
            const content = document.getElementById('reviewContent').value;
            const resultDiv = document.getElementById('analysisResult');
            
            if (!content.trim()) {
                alert('请先输入或上传待审核的文档');
                return;
            }
            
            if (teachingDocs.length === 0) {
                loadDefaultGradingStandard();
            }
            
            resultDiv.innerHTML = '<div class="analyzing">AI正在模拟学术辩论，生成质疑问题</div>';
            
            const teachingContentRaw = teachingDocs.map(d => `【${d.name}】\n${d.content}`).join('\n\n');
            const MAX_TEACHING_LEN = 8000;
            let teachingContentForReview;
            if (teachingContentRaw.length > MAX_TEACHING_LEN) {
                const keyRulesPattern = /(?:必须|严禁|禁止|应当|需要|要求|评分标准|考核|打分|分值|扣分|分数段|合格|不合格|违反)[^\n。！？]{5,100}[。！？]?/gi;
                const matches = teachingContentRaw.match(keyRulesPattern) || [];
                const otherParagraphs = teachingContentRaw.split(/\n{2,}/).filter(p => {
                    const trimmed = p.trim();
                    return trimmed.length > 50 && !keyRulesPattern.test(trimmed);
                });
                teachingContentForReview = '【教学文档关键规则片段】\n\n';
                if (matches.length > 0) {
                    teachingContentForReview += '## 包含"必须/严禁/评分标准"等关键词的段落：\n' + matches.slice(0, 50).join('\n') + '\n\n';
                }
                if (otherParagraphs.length > 0) {
                    teachingContentForReview += '## 其他规则段落：\n' + otherParagraphs.slice(0, 20).join('\n\n');
                }
                if (teachingSummary) {
                    teachingContentForReview += '\n\n## AI辅助总结（仅供参考）：\n' + teachingSummary;
                }
            } else {
                teachingContentForReview = teachingContentRaw;
            }
            
            try {
                const systemPrompt = `你是一位严格的学术评审专家，擅长从不同学术立场对论文进行质疑。

【教学标准】
${teachingContentForReview}

请仔细阅读论文，针对其核心论点和与教学标准的符合程度，模拟最有可能被同行专家质疑的问题。

要求：
1. 找出论文的3-5个核心论点或结论
2. 针对每个核心论点，生成1-2个尖锐的质疑问题
3. 质疑要基于真实的学术争议和教学标准要求，而非吹毛求疵
4. 格式：先引用论文原文，再提出质疑，最后给出可能的回应方向

请用以下JSON格式返回：
{
  "questions": [
    {
      "thesis": "论文中的核心论点原文引用",
      "question": "质疑问题",
      "possible_response": "可能的回应方向"
    }
  ]
}`;

                const messages = [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: '请对以下论文进行预设质疑生成：\n\n' + content }
                ];
                
                const responseText = await callAIApi(messages);
                
                let questions = [];
                try {
                    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        const parsed = JSON.parse(jsonMatch[0]);
                        questions = parsed.questions || [];
                    }
                } catch {}
                
                if (questions.length > 0) {
                    const html = `
                        <div class="analysis-wrapper">
                            <div class="analysis-result-title">核心论点质疑</div>
                            ${questions.map((q, i) => `
                                <div class="question-item">
                                    <div class="quote">"${escapeHtml(q.thesis)}"</div>
                                    <div><strong>质疑：</strong>${escapeHtml(q.question)}</div>
                                    <div class="response"><strong>回应方向：</strong>${escapeHtml(q.possible_response)}</div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    appendAnalysisResult(html);
                } else {
                    const html = `
                        <div class="analysis-wrapper">
                            <div class="analysis-result-title">核心论点质疑</div>
                            <pre style="white-space: pre-wrap; font-size: 13px;">${escapeHtml(responseText)}</pre>
                        </div>
                    `;
                    appendAnalysisResult(html);
                }
            } catch (e) {
                appendAnalysisResult('<div class="analysis-wrapper" style="color: var(--accent-light);">请求失败: ' + e.message + '</div>');
            }
        }
        
        async function findWeakPoints() {
            const content = document.getElementById('reviewContent').value;
            const resultDiv = document.getElementById('analysisResult');
            
            if (!content.trim()) {
                alert('请先输入或上传待审核的文档');
                return;
            }
            
            if (teachingDocs.length === 0) {
                loadDefaultGradingStandard();
            }
            
            resultDiv.innerHTML = '<div class="analyzing">AI正在检测论文薄弱环节</div>';
            
            const teachingContentRaw = teachingDocs.map(d => `【${d.name}】\n${d.content}`).join('\n\n');
            const MAX_TEACHING_LEN = 8000;
            let teachingContentForReview;
            if (teachingContentRaw.length > MAX_TEACHING_LEN) {
                const keyRulesPattern = /(?:必须|严禁|禁止|应当|需要|要求|评分标准|考核|打分|分值|扣分|分数段|合格|不合格|违反)[^\n。！？]{5,100}[。！？]?/gi;
                const matches = teachingContentRaw.match(keyRulesPattern) || [];
                const otherParagraphs = teachingContentRaw.split(/\n{2,}/).filter(p => {
                    const trimmed = p.trim();
                    return trimmed.length > 50 && !keyRulesPattern.test(trimmed);
                });
                teachingContentForReview = '【教学文档关键规则片段】\n\n';
                if (matches.length > 0) {
                    teachingContentForReview += '## 包含"必须/严禁/评分标准"等关键词的段落：\n' + matches.slice(0, 50).join('\n') + '\n\n';
                }
                if (otherParagraphs.length > 0) {
                    teachingContentForReview += '## 其他规则段落：\n' + otherParagraphs.slice(0, 20).join('\n\n');
                }
                if (teachingSummary) {
                    teachingContentForReview += '\n\n## AI辅助总结（仅供参考）：\n' + teachingSummary;
                }
            } else {
                teachingContentForReview = teachingContentRaw;
            }
            
            try {
                const systemPrompt = `你是一位严格的学术编辑，擅长发现论文中"断言多、证据少"的薄弱环节。

【教学标准】
${teachingContentForReview}

请仔细阅读论文，对照教学标准，找出以下类型的薄弱语句：
1. 未经充分论证的结论性断言
2. 引用资料未加分析就作为证据使用
3. 逻辑推导过程不完整
4. 与权威观点相悖但未作充分回应
5. 使用模糊表述回避关键问题
6. 不符合教学标准要求的表述

要求：
- 标注具体的句子（用引号引用）
- 指出为何这是薄弱环节
- 提供具体的改进建议

请用以下JSON格式返回：
{
  "weak_points": [
    {
      "sentence": "薄弱语句原文",
      "reason": "为何薄弱",
      "suggestion": "改进建议"
    }
  ]
}`;

                const messages = [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: '请检测以下论文的薄弱环节：\n\n' + content }
                ];
                
                const responseText = await callAIApi(messages);
                
                let weakPoints = [];
                try {
                    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        const parsed = JSON.parse(jsonMatch[0]);
                        weakPoints = parsed.weak_points || [];
                    }
                } catch {}
                
                if (weakPoints.length > 0) {
                    const html = `
                        <div class="analysis-wrapper">
                            <div class="analysis-result-title">薄弱环节检测</div>
                            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">共发现 ${weakPoints.length} 处需要加强的论断：</p>
                            ${weakPoints.map((w, i) => `
                                <div class="weakness-item">
                                    <div class="sentence">"${escapeHtml(w.sentence)}"</div>
                                    <div style="margin: 8px 0;"><strong>问题：</strong>${escapeHtml(w.reason)}</div>
                                    <div class="suggestion"><strong>建议：</strong>${escapeHtml(w.suggestion)}</div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    appendAnalysisResult(html);
                } else {
                    const html = `
                        <div class="analysis-wrapper">
                            <div class="analysis-result-title">薄弱环节检测</div>
                            <pre style="white-space: pre-wrap; font-size: 13px;">${escapeHtml(responseText)}</pre>
                        </div>
                    `;
                    appendAnalysisResult(html);
                }
            } catch (e) {
                appendAnalysisResult('<div class="analysis-wrapper" style="color: var(--accent-light);">请求失败: ' + e.message + '</div>');
            }
        }
        
        async function analyzePosition() {
            const content = document.getElementById('reviewContent').value;
            const resultDiv = document.getElementById('analysisResult');
            
            if (!content.trim()) {
                alert('请先输入或上传待审核的文档');
                return;
            }
            
            if (teachingDocs.length === 0) {
                loadDefaultGradingStandard();
            }
            
            resultDiv.innerHTML = '<div class="analyzing">AI正在分析学术立场</div>';
            
            const teachingContentRaw = teachingDocs.map(d => `【${d.name}】\n${d.content}`).join('\n\n');
            const MAX_TEACHING_LEN = 8000;
            let teachingContentForReview;
            if (teachingContentRaw.length > MAX_TEACHING_LEN) {
                const keyRulesPattern = /(?:必须|严禁|禁止|应当|需要|要求|评分标准|考核|打分|分值|扣分|分数段|合格|不合格|违反)[^\n。！？]{5,100}[。！？]?/gi;
                const matches = teachingContentRaw.match(keyRulesPattern) || [];
                const otherParagraphs = teachingContentRaw.split(/\n{2,}/).filter(p => {
                    const trimmed = p.trim();
                    return trimmed.length > 50 && !keyRulesPattern.test(trimmed);
                });
                teachingContentForReview = '【教学文档关键规则片段】\n\n';
                if (matches.length > 0) {
                    teachingContentForReview += '## 包含"必须/严禁/评分标准"等关键词的段落：\n' + matches.slice(0, 50).join('\n') + '\n\n';
                }
                if (otherParagraphs.length > 0) {
                    teachingContentForReview += '## 其他规则段落：\n' + otherParagraphs.slice(0, 20).join('\n\n');
                }
                if (teachingSummary) {
                    teachingContentForReview += '\n\n## AI辅助总结（仅供参考）：\n' + teachingSummary;
                }
            } else {
                teachingContentForReview = teachingContentRaw;
            }
            
            try {
                const systemPrompt = `你是一位学术史专家，擅长分析论文作者在学术史中的立场。

【教学标准】
${teachingContentForReview}

第一步：事实校验（前置检查）
在进行分析之前，先检查论文是否存在根本性事实错误，包括：
- 人物与作品的错误归属
- 时代顺序颠倒
- 引文明显错误或编造
- 数字、时间等关键事实明显错误

如果发现严重事实错误，请直接返回以下JSON格式，position_analysis字段设为false：
{
  "position_analysis": false,
  "reason": "本文存在严重事实错误，无法进行有效的学术立场分析"
}

第二步：学术立场分析
如果通过事实校验，请分析论文的学术立场，包括：
1. 对前人研究成果的态度（继承、批判、超越）
2. 方法论取向（实证、诠释、批判等）
3. 核心概念的使用和理解
4. 参考文献的倾向性
5. 与当前学术主流的关系
6. 与教学标准的符合程度

请用以下JSON格式返回分析结果：
{
  "position_analysis": true,
  "positions": [
    {
      "axis_name": "坐标轴名称（如：信古-疑古）",
      "left_label": "左端立场",
      "right_label": "右端立场",
      "marker_position": 30,
      "marker_label": "论文立场",
      "evidence": "判断依据",
      "warning": "警示（如有）"
    }
  ]
}`;

                const messages = [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: '请分析以下论文的学术立场：\n\n' + content }
                ];
                
                const responseText = await callAIApi(messages);
                
                let positionAnalysis = null;
                let positions = [];
                try {
                    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        const parsed = JSON.parse(jsonMatch[0]);
                        positionAnalysis = parsed.position_analysis;
                        positions = parsed.positions || [];
                    }
                } catch {}
                
                if (positionAnalysis === false) {
                    const html = `
                        <div class="analysis-wrapper">
                            <div class="analysis-result-title">学术立场分析</div>
                            <div style="background: rgba(166, 124, 90, 0.1); border: 1px solid var(--accent-light); padding: 16px; border-radius: 6px; color: var(--accent);">
                                本文存在严重事实错误，无法进行有效的学术立场分析
                            </div>
                        </div>
                    `;
                    appendAnalysisResult(html);
                } else if (positions.length > 0) {
                    const pos = positions[0];
                    const marker = document.getElementById('stanceMarker');
                    if (marker) {
                        marker.style.left = (pos.marker_position || 50) + '%';
                    }
                    
                    const html = `
                        <div class="analysis-wrapper">
                            <div class="analysis-result-title">学术立场分析</div>
                            ${positions.map(p => `
                                <div style="background: var(--bg-secondary); padding: 12px; border-radius: 6px; margin-bottom: 10px;">
                                    <div style="font-weight: 600; margin-bottom: 8px;">${escapeHtml(p.axis_name)}</div>
                                    <div style="margin-bottom: 6px;"><strong>立场：</strong>${escapeHtml(p.marker_label)}</div>
                                    <div style="font-size: 12px; color: var(--text-secondary);"><strong>依据：</strong>${escapeHtml(p.evidence)}</div>
                                    ${p.warning ? `<div style="font-size: 12px; color: var(--accent-light); margin-top: 6px;">${escapeHtml(p.warning)}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    `;
                    appendAnalysisResult(html);
                } else {
                    const html = `
                        <div class="analysis-wrapper">
                            <div class="analysis-result-title">学术立场分析</div>
                            <pre style="white-space: pre-wrap; font-size: 13px;">${escapeHtml(responseText)}</pre>
                        </div>
                    `;
                    appendAnalysisResult(html);
                }
            } catch (e) {
                appendAnalysisResult('<div class="analysis-wrapper" style="color: var(--accent-light);">请求失败: ' + e.message + '</div>');
            }
        }
        
