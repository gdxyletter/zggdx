        const KNOWN_CLASSICS = [
            // 四书五经
            '论语', '孟子', '大学', '中庸', '诗经', '尚书', '礼记', '周易', '春秋', '左传', '公羊传', '谷梁传',
            // 其他儒学经典
            '孝经', '尔雅', '论语正义', '孟子正义', '礼记正义',
            // 史书
            '史记', '汉书', '后汉书', '三国志', '资治通鉴', '纲鉴易知录', '史记索隐', '汉书注',
            // 道家
            '老子', '庄子', '列子', '道德经', '南华经',
            // 诸子百家
            '墨子', '荀子', '韩非子', '管子', '商君书', '吕氏春秋', '淮南子', '尸子',
            // 宋明理学
            '朱子语类', '四书集注', '二程遗书', '陆九渊集', '王阳明全集', '传习录', '朱子全书',
            '四书章句', '论语集注', '孟子集注', '大学章句', '中庸章句',
            // 其他
            '春秋繁露', '白虎通义', '盐铁论', '论衡', '潜夫论', '申鉴', '中论'
        ];

        // 更全面的正则表达式模式
        const CITATION_PATTERNS = [
            // 《论语·学而》 或 《论语·为政篇》
            /《([^》]+)[·\-]([^》]+)》/g,
            // 《论语》《孟子》
            /《([^》]+)》/g,
            // 《论语》卷一、卷三、第十二卷
            /《([^》+)》卷([一二三四五六七八九十\d]+|第?\d+)/g,
            // 《论语》第十六篇
            /《([^》+)》([一二三四五六七八九十\d]+)篇/g,
            // （《论语》）、【《论语》】
            /[（【]([^）】]+)[）】]/g,
            // 见于《xxx》
            /见于《([^》]+)》/g,
            // 参见《xxx》
            /参见《([^》]+)》/g,
            // 引用《xxx》
            /引用《([^》]+)》/g,
            // 据《xxx》
            /据《([^》]+)》/g,
            // 载于《xxx》
            /载于《([^》]+)》/g,
            // 出自《xxx》
            /出自《([^》]+)》/g,
            // 依据《xxx》
            /依据《([^》]+)》/g,
            // 《论语》云
            /《([^》]+)》云/g,
            // 《论语》曰
            /《([^》]+)》曰/g,
            // 孔子曰、孟子云
            /(论语|孟子|大学|中庸|老子|庄子|荀子|墨子)(?:曰|云|称|道|言)/g,
            // 学而篇、为政章
            /(?:学而|为政|八佾|里仁|公冶长|雍也|述而|泰伯|子罕|乡党|先进|颜渊|子路|宪问|卫灵公|季氏|阳货|微子|子张|尧曰)[篇章]/g,
            // 引用原文、注疏
            /(?:原文|注疏|注|疏|正义|注曰|疏曰)[：:]\s*['"「]([^"」']+)/g
        ];

        // 外部API数据缓存
        const externalAPICache = new Map();

        // 步骤1: 正则识别经典名称
        function detectCitationFormats(text) {
            const detected = [];
            const seen = new Set();

            for (const pattern of CITATION_PATTERNS) {
                let match;
                pattern.lastIndex = 0;
                while ((match = pattern.exec(text)) !== null) {
                    let classicName = match[1] || match[0];
                    let chapter = match[2] || null;
                    
                    // 清理名称
                    classicName = classicName.replace(/[《》『』]/g, '').trim();
                    
                    // 特殊处理：孔子曰、孟子云等
                    if (match[1] && /^(论语|孟子|大学|中庸|老子|庄子|荀子|墨子)$/.test(match[1])) {
                        classicName = match[1];
                        chapter = null;
                    }
                    
                    // 特殊处理：学而篇、为政章等
                    if (match[0] && /^(学而|为政|八佾|里仁)/.test(match[0])) {
                        chapter = match[0].replace(/[篇章]/, '');
                    }
                    
                    // 检查是否已知经典（更宽松的匹配）
                    const isKnownClassic = KNOWN_CLASSICS.some(c => 
                        classicName.includes(c) || c.includes(classicName) || 
                        classicName.startsWith(c) || c.startsWith(classicName)
                    );
                    
                    const key = classicName + (chapter || '');
                    if (!seen.has(key) && (isKnownClassic || classicName.length >= 2)) {
                        seen.add(key);
                        detected.push({
                            raw: match[0],
                            classicName: classicName,
                            chapter: chapter,
                            index: match.index
                        });
                    }
                }
            }
            
            return detected;
        }

        // 步骤2: 使用AI识别具体章节
        async function identifyCitationDetails(text, citations) {
            if (!citations || citations.length === 0) return citations;
            
            const apiKey = DEEPSEEK_CONFIG?.apiKey;
            if (!apiKey) {
                console.warn('未配置API Key，无法使用AI识别');
                return citations;
            }

            const citationList = citations.map((c, i) => `${i + 1}. ${c.classicName}`).join('\n');
            
            const prompt = `分析以下文本中出现的经典文献引用，识别具体章节或篇目：

文本：${text.substring(0, 2000)}

检测到的经典：${citationList}

请按以下JSON格式返回（每部经典只返回一个最可能的章节）：
[
  {"classicName": "论语", "chapter": "学而", "verse": "1", "reason": "因为..."},
  {"classicName": "孟子", "chapter": "公孙丑", "verse": "上", "reason": "因为..."}
]

如果无法确定章节，返回空数组。`;

            try {
                const result = await callAIApi([
                    { role: 'user', content: prompt }
                ]);
                
                // 解析JSON结果
                const jsonMatch = result.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                    const details = JSON.parse(jsonMatch[0]);
                    
                    // 合并识别结果
                    for (const detail of details) {
                        const matched = citations.find(c => 
                            c.classicName.includes(detail.classicName) || 
                            detail.classicName.includes(c.classicName)
                        );
                        if (matched) {
                            matched.aiChapter = detail.chapter;
                            matched.aiVerse = detail.verse;
                            matched.reason = detail.reason;
                        }
                    }
                }
            } catch (e) {
                console.error('AI识别失败:', e);
            }
            
            return citations;
        }

        // 步骤3: 查询本地references.js数据
        function queryLocalReferences(classicName, chapter, verse) {
            const refs = getMergedReferences?.() || [];
            
            return refs.filter(r => {
                if (!r.classic_title) return false;
                const matchClassic = r.classic_title.includes(classicName) || classicName.includes(r.classic_title);
                if (!matchClassic) return false;
                
                if (chapter) {
                    const matchChapter = r.chapter?.includes(chapter) || chapter.includes(r.chapter);
                    if (!matchChapter) return false;
                }
                
                if (verse) {
                    const verseStr = String(verse);
                    return r.verse?.toString().includes(verseStr) || verseStr.includes(r.verse?.toString());
                }
                
                return true;
            });
        }

        // 步骤4: 从外部API获取数据
        async function fetchExternalAPIData(classicName) {
            // 检查缓存
            if (externalAPICache.has(classicName)) {
                return externalAPICache.get(classicName);
            }

            // 中国哲学书电子化计划 API
            const ctextEndpoints = [
                `https://ctext.org/${encodeURIComponent(classicName)}/zh`,
                `https://ctext.org/${encodeURIComponent(classicName.replace(' ', '-'))}/zh`
            ];

            for (const url of ctextEndpoints) {
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        const html = await response.text();
                        // 解析HTML获取正文
                        const content = parseCTextHTML(html, classicName);
                        if (content) {
                            externalAPICache.set(classicName, content);
                            return content;
                        }
                    }
                } catch (e) {
                    console.log(`API请求失败: ${url}`);
                }
            }

            return null;
        }

        // 解析ctext.org返回的HTML
        function parseCTextHTML(html, classicName) {
            try {
                // 提取正文内容
                const contentMatch = html.match(/<div[^>]*class="(?:ctext|text)">([\s\S]*?)<\/div>/i);
                if (contentMatch) {
                    // 清理HTML标签
                    const text = contentMatch[1]
                        .replace(/<[^>]+>/g, '\n')
                        .replace(/&nbsp;/g, ' ')
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .trim();
                    
                    return {
                        source: 'ctext.org',
                        url: `https://ctext.org/${classicName}/zh`,
                        content: text.substring(0, 5000)
                    };
                }
            } catch (e) {
                console.error('解析失败:', e);
            }
            return null;
        }

        // 主函数: 自动识别参考文献
        async function autoDetectReferences(text) {
            if (!text || text.length < 10) return [];
            
            // 步骤1: 正则识别
            const citations = detectCitationFormats(text);
            console.log('正则识别结果:', citations);
            
            if (citations.length === 0) return [];
            
            // 步骤2: AI识别具体章节
            await identifyCitationDetails(text, citations);
            console.log('AI识别结果:', citations);
            
            // 步骤3: 查询本地数据 + 外部API
            const results = [];
            for (const citation of citations) {
                let data = {
                    raw: citation.raw,
                    classicName: citation.classicName,
                    source: 'unknown'
                };
                
                // 查询本地
                const localData = queryLocalReferences(
                    citation.classicName, 
                    citation.aiChapter || citation.chapter,
                    citation.aiVerse || citation.verse
                );
                
                if (localData && localData.length > 0) {
                    data.source = 'local';
                    data.localRefs = localData;
                } else {
                    // 尝试外部API
                    const externalData = await fetchExternalAPIData(citation.classicName);
                    if (externalData) {
                        data.source = 'external';
                        data.externalData = externalData;
                    }
                }
                
                results.push(data);
            }
            
            return results;
        }

        // 测试函数
        async function testAutoDetect() {
            const testText = `本文引用《论语·学而》载："子曰：学而时习之"。又见《孟子·公孙丑上》孟子曰："恻隐之心，人皆有之"。据《礼记·大学》`;
            
            console.log('测试文本:', testText);
            const result = await autoDetectReferences(testText);
            console.log('最终识别结果:', result);
            return result;
        }

        // ========== AI驱动的内证互参和跨文献关联 ==========

        // AI分析内证互参 - 找出语义相关的引用（改进版）
        async function analyzeInternalCrossRefsAI(content) {
            const refs = getMergedReferences?.() || [];
            if (!refs.length) return null;
            
            const apiKey = DEEPSEEK_CONFIG?.apiKey;
            if (!apiKey) return null;

            // 提取用户引用的经典
            const citedClassics = detectCitationFormats(content);
            if (citedClassics.length === 0) return null;

            const prompt = `分析以下学术文本，找出其中引用的经典之间的语义关联（内证互参）。

学术文本（请仔细分析）：
${content.substring(0, 3500)}

文本中出现的经典：${citedClassics.map(c => c.classicName).join('、')}
${citedClassics.filter(c => c.chapter).map(c => `${c.classicName}·${c.chapter}`).join('、')}

请分析并返回JSON：
{
  "theme": "用一句话概括文本的核心讨论主题（10字以内）",
  "connections": [
    {
      "classic1": "经典1名称（必须与文本中引用的一致）",
      "chapter1": "篇目（如学而、公孙丑等）", 
      "classic2": "经典2名称",
      "chapter2": "篇目",
      "relationship": "用15字以内说明两者的关系（如同题共论/相互印证/观点互补/传承发展）"
    }
  ]
}

要求：
1. connections最多返回5条最有价值的关联
2. 只分析文本中明确提到的经典和篇目，不要编造
3. 如果无法确定篇目，chapter可以为空字符串
4. 只返回JSON，不要其他文字`;

            try {
                const result = await callAIApi([{ role: 'user', content: prompt }]);
                const jsonMatch = result.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    return JSON.parse(jsonMatch[0]);
                }
            } catch (e) {
                console.error('AI内证互参分析失败:', e);
            }
            return null;
        }

        // AI分析跨文献关联 - 智能推断不同经典间的关联（改进版）
        async function analyzeCrossRefAI(content) {
            const apiKey = DEEPSEEK_CONFIG?.apiKey;
            if (!apiKey) return null;

            const citedClassics = detectCitationFormats(content);
            if (citedClassics.length < 2) return null;

            const prompt = `分析以下学术文本中不同经典之间的思想关联（跨文献关联）。

文本：
${content.substring(0, 3500)}

涉及经典：${citedClassics.map(c => c.classicName).join('、')}
${citedClassics.filter(c => c.chapter).map(c => `${c.classicName}·${c.chapter}`).join('、')}

请从以下角度分析关联：
1. 传承关系（后学继承前说）
2. 对立关系（观点相左）
3. 互补关系（不同角度论述）
4. 印证关系（可相互证明）

JSON返回格式：
{
  "analysis": "用30字以内总结这些经典的总体关联特征",
  "links": [
    {
      "from": {"classic": "论语", "chapter": "学而"},
      "to": {"classic": "孟子", "chapter": "公孙丑"},
      "type": "传承发展/观点对立/互为补充/相互印证",
      "description": "用20字以内描述具体关系"
    }
  ]
}

要求：
1. links最多返回6条最有价值的关联
2. type只从给定的4个选项中选择
3. 只返回JSON，不要其他文字`;

            try {
                const result = await callAIApi([{ role: 'user', content: prompt }]);
                const jsonMatch = result.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    return JSON.parse(jsonMatch[0]);
                }
            } catch (e) {
                console.error('AI跨文献分析失败:', e);
            }
            return null;
        }

        // AI推荐相似经文（改进版）
        async function recommendSimilarVerses(content) {
            const refs = getMergedReferences?.() || [];
            if (!refs.length) return [];
            
            const apiKey = DEEPSEEK_CONFIG?.apiKey;
            if (!apiKey) return [];

            const citedClassics = detectCitationFormats(content);
            if (citedClassics.length === 0) return [];

            const prompt = `基于以下学术文本，推荐可能相关的其他经典章句。推荐应与文本讨论主题相关。

学术文本：
${content.substring(0, 2000)}

已引用经典：${citedClassics.map(c => c.classicName).join('、')}
${citedClassics.filter(c => c.chapter).map(c => `${c.classicName}·${c.chapter}`).join('、')}

请推荐5-8条相关的经典章句（可以从论语、孟子、大学、中庸、老子、庄子、礼记、周易中选取）：

JSON格式：
[
  {
    "classic": "论语",
    "chapter": "为政", 
    "verse": "1（可省略）",
    "content": "经文原文（20字以内）",
    "reason": "10字以内说明推荐理由"
  }
]

要求：
1. 推荐应与文本主题高度相关
2. 可以推荐文本未引用但相关的经典
3. 经文内容要准确，不要编造
4. 只返回JSON数组，不要其他文字`;

            try {
                const result = await callAIApi([{ role: 'user', content: prompt }]);
                const jsonMatch = result.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                    return JSON.parse(jsonMatch[0]);
                }
            } catch (e) {
                console.error('AI推荐失败:', e);
            }
            return [];
        }

        // 增强版的内证互参分析（整合AI结果）
        async function enhancedAnalyzeCitations(content, showAI = true) {
            // 先执行原有分析
            analyzeCitations(content);
            
            if (!showAI) return;
            
            // 尝试AI增强
            const aiResult = await analyzeInternalCrossRefsAI(content);
            if (!aiResult) return;
            
            const panel = document.getElementById('citationPanelRight');
            if (!panel) return;
            
            // 添加AI分析结果
            let aiHtml = '';
            
            if (aiResult.connections && aiResult.connections.length > 0) {
                aiHtml += `
                    <div style="margin-top: 16px; padding: 12px; background: linear-gradient(135deg, rgba(122, 92, 68, 0.1), rgba(122, 92, 68, 0.05)); border-radius: 8px; border: 1px solid var(--accent-light);">
                        <div style="font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                            🤖 AI内证互参分析
                        </div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px; padding: 8px; background: rgba(255,255,255,0.5); border-radius: 4px;">
                            <strong>核心主题：</strong>${aiResult.theme || '待分析'}
                        </div>
                `;
                
                aiResult.connections.forEach(conn => {
                    aiHtml += `
                        <div style="background: white; padding: 10px; border-radius: 4px; margin-bottom: 8px; border-left: 3px solid #3498db;">
                            <div style="font-size: 11px; color: var(--text-primary); margin-bottom: 4px;">
                                📖 《${conn.classic1}·${conn.chapter1}》 ↔ 《${conn.classic2}·${conn.chapter2}》
                            </div>
                            <div style="font-size: 10px; color: var(--text-muted);">
                                ${conn.relationship || ''}
                            </div>
                        </div>
                    `;
                });
                
                aiHtml += '</div>';
            }
            
            // 推荐相似经文
            const similarVerses = await recommendSimilarVerses(content);
            if (similarVerses && similarVerses.length > 0) {
                aiHtml += `
                    <div style="margin-top: 16px; padding: 12px; background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(52, 152, 219, 0.05)); border-radius: 8px; border: 1px solid #3498db;">
                        <div style="font-size: 12px; font-weight: 600; color: #2980b9; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                            💡 AI推荐相关经文
                        </div>
                `;
                
                similarVerses.forEach(v => {
                    aiHtml += `
                        <div style="background: white; padding: 8px; border-radius: 4px; margin-bottom: 6px; font-size: 11px;">
                            <div style="color: var(--accent); font-weight: 500;">
                                《${v.classic}·${v.chapter}${v.verse ? '·' + v.verse : ''}》
                            </div>
                            <div style="color: var(--text-primary); margin: 4px 0;">
                                "${v.content?.substring(0, 50)}${v.content?.length > 50 ? '...' : ''}"
                            </div>
                            <div style="font-size: 10px; color: var(--text-muted);">
                                💡 ${v.reason}
                            </div>
                        </div>
                    `;
                });
                
                aiHtml += '</div>';
            }
            
            if (aiHtml) {
                panel.innerHTML += aiHtml;
            }
        }

        // 增强版的跨文献关联分析（整合AI结果）
        async function enhancedAnalyzeCrossRefs(content, showAI = true) {
            // 先执行原有分析
            analyzeCrossReferences(content);
            
            if (!showAI) return;
            
            const aiResult = await analyzeCrossRefAI(content);
            if (!aiResult) return;
            
            const panel = document.getElementById('crossRefPanel');
            if (!panel) return;
            
            let aiHtml = '';
            
            if (aiResult.links && aiResult.links.length > 0) {
                aiHtml += `
                    <div style="margin-top: 16px; padding: 12px; background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(46, 204, 113, 0.05)); border-radius: 8px; border: 1px solid #2ecc71;">
                        <div style="font-size: 12px; font-weight: 600; color: #27ae60; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                            🤖 AI跨文献智能关联
                        </div>
                        ${aiResult.analysis ? `<div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px; padding: 8px; background: rgba(255,255,255,0.5); border-radius: 4px;">${aiResult.analysis}</div>` : ''}
                `;
                
                aiResult.links.forEach(link => {
                    aiHtml += `
                        <div style="background: white; padding: 10px; border-radius: 4px; margin-bottom: 8px; border-left: 3px solid #2ecc71;">
                            <div style="font-size: 11px; color: var(--text-primary); margin-bottom: 6px;">
                                🔗 ${link.from?.classic || ''}·${link.from?.chapter || ''} → ${link.to?.classic || ''}·${link.to?.chapter || ''}
                            </div>
                            <div style="font-size: 10px; color: #27ae60; font-weight: 500; margin-bottom: 4px;">
                                ${link.type || '关联'}
                            </div>
                            <div style="font-size: 10px; color: var(--text-muted);">
                                ${link.description || ''}
                            </div>
                        </div>
                    `;
                });
                
                aiHtml += '</div>';
            }
            
            if (aiHtml) {
                panel.innerHTML += aiHtml;
            }
        }
        
        // 经典阅读相关功能
