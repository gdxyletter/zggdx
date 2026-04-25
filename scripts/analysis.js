        function runAutoAnalysis() {
            const content = document.getElementById('reviewContent').value;
            if (!content.trim()) {
                alert('请先输入或上传待审核的文档');
                return;
            }
            
            analyzeCitations(content);
            analyzeExegesis(content);
            analyzeCrossReferences(content);
            
            // AI增强分析
            setTimeout(async () => {
                await enhancedAnalyzeCitations(content);
                await enhancedAnalyzeCrossRefs(content);
            }, 500);
            
            alert('文本检测完成，请在右侧栏查看结果（AI增强分析稍后显示）');
        }
        
function analyzeCitations(content) {
            const refs = getMergedReferences();
            const matches = [];
            const contentLower = content.toLowerCase();
            
            if (!refs || !Array.isArray(refs) || refs.length === 0) {
                document.getElementById('citationPanelRight').innerHTML = '<p style="font-size: 12px; color: var(--accent-light); text-align: center; padding: 20px;">⚠️ 引文数据未加载</p>';
                return;
            }
            
            // Similarity function based on character overlap
            function getSimilarity(text1, text2) {
                if (!text1 || !text2) return 0;
                const s1 = text1.toLowerCase().replace(/\s+/g, '');
                const s2 = text2.toLowerCase().replace(/\s+/g, '');
                if (s1.length === 0 || s2.length === 0) return 0;
                
                // Character intersection
                const set1 = new Set(s1.split(''));
                const set2 = new Set(s2.split(''));
                let overlap = 0;
                for (const char of set1) {
                    if (set2.has(char)) overlap++;
                }
                
                // Jaccard-like similarity: overlap / max(len1, len2)
                const maxLen = Math.max(s1.length, s2.length);
                return (overlap / maxLen) * 100;
            }
            
            // Extract a sample from content (first 100 chars, skipping punctuation) for matching
            const contentSample = content.replace(/[，。、？！：；""''（）【】《》]/g, '').substring(0, 100);
            
            // Only match specific fields: scripture_content, translation, note
            const matchFields = ['scripture_content', 'translation', 'note'];
            
            for (let i = 0; i < refs.length; i++) {
                const citation = refs[i];
                if (!citation) continue;
                
                let maxSimilarity = 0;
                for (const field of matchFields) {
                    const fieldValue = citation[field];
                    if (!fieldValue) continue;
                    const similarity = getSimilarity(contentSample, fieldValue);
                    if (similarity > maxSimilarity) maxSimilarity = similarity;
                }
            
                if (maxSimilarity >= 40) {
                    matches.push({
                        citation: citation,
                        similarity: maxSimilarity
                    });
                }
            }
            
            // Sort by similarity descending
            matches.sort((a, b) => b.similarity - a.similarity);
    
            let rightPanelHtml = '<div style="overflow-y: auto;">';
            
            if (matches.length === 0) {
                rightPanelHtml += `
                    <div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px;">
                        📋 未检测到任何经典引文<br>
                        <span style="font-size: 11px; display: block; margin-top: 8px;">提示：文本中需要包含经典著作的名称、章节或内容</span>
                    </div>
                `;
            } else {
                // 按经文分组，用于显示内证互参
                const groupedByVerse = {};
                const groupedByClassic = {};
                
                for (const m of matches) {
                    const c = m.citation;
                    
                    // 改进的分组键生成：优先使用 verse，如果没有 verse 就使用 scripture_content
                    let verseKey;
                    if (c.verse) {
                        verseKey = `${c.classic_title}||${c.chapter}||verse:${c.verse}`;
                    } else if (c.scripture_content) {
                        // 对于没有 verse 的条目，用 scripture_content 的前20个字作为分组依据
                        // 这样同一章的多个注释者如果引用相同内容，就能聚合
                        verseKey = `${c.classic_title}||${c.chapter}||content:${c.scripture_content.substring(0, 20)}`;
                    } else {
                        continue;
                    }
                    
                    if (!groupedByVerse[verseKey]) groupedByVerse[verseKey] = [];
                    groupedByVerse[verseKey].push(c);
                    
                    const classicKey = c.classic_title;
                    if (!groupedByClassic[classicKey]) groupedByClassic[classicKey] = [];
                    groupedByClassic[classicKey].push(c);
                }
                
                // 首先显示多注释者互参
                let internalRefCount = 0;
                const versesWithMultiCommentators = [];
                
                // 辅助函数：检查条目是否有多个注释字段
                const getMultiNoteFields = (ref) => {
                    return ['note_zheng', 'note_kong', 'note_zhu', 'note_jia', 'note_su', 'note_lu'].filter(
                        field => ref[field] && String(ref[field]).trim()
                    );
                };
                
                const noteFieldToCommentator = {
                    'note_zheng': '郑玄',
                    'note_kong': '孔颖达',
                    'note_zhu': '朱熹',
                    'note_jia': '贾公彦',
                    'note_su': '疏',
                    'note_lu': '陆德明'
                };
                
                for (const key in groupedByVerse) {
                    const verseRefs = groupedByVerse[key];
                    
                    // 优先检查是否有包含多注释字段的条目（新格式）
                    let hasMultiNoteFormat = false;
                    let multiNoteRef = null;
                    
                    for (const ref of verseRefs) {
                        const multiNoteFields = getMultiNoteFields(ref);
                        if (multiNoteFields.length >= 2) {
                            hasMultiNoteFormat = true;
                            multiNoteRef = ref;
                            break;  // 找到第一个多注释条目就停止
                        }
                    }
                    
                    // 如果有包含多注释字段的条目，优先显示它
                    if (hasMultiNoteFormat && multiNoteRef) {
                        internalRefCount++;
                        const verseInfo = multiNoteRef.verse ? `·${multiNoteRef.verse}` : '';
                        const multiNoteFields = getMultiNoteFields(multiNoteRef);
                        const commentatorNames = multiNoteFields.map(f => noteFieldToCommentator[f]);
                        
                        rightPanelHtml += `
                            <div style="background: var(--white); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid var(--accent);">
                                <div style="font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 8px;">
                                    📖 《${multiNoteRef.classic_title}·${multiNoteRef.chapter}${verseInfo}》内证互参
                                </div>
                                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px;">
                                    多家注释：${commentatorNames.join('、')}
                                </div>
                        `;
                        
                        // 显示原经文
                        if (multiNoteRef.scripture_content) {
                            rightPanelHtml += `
                                <div style="font-size: 11px; color: var(--text-primary); margin-bottom: 8px; padding: 8px; background: var(--bg-secondary); border-radius: 3px; border-left: 2px solid var(--accent);">
                                    <strong>【经文】</strong>"${multiNoteRef.scripture_content}"
                                </div>
                            `;
                        }
                        
                        // 显示每个注释
                        multiNoteFields.forEach(field => {
                            const commentatorName = noteFieldToCommentator[field];
                            const noteText = multiNoteRef[field];
                            rightPanelHtml += `
                                <div style="font-size: 11px; color: var(--text-primary); line-height: 1.5; margin-bottom: 6px; padding-left: 8px; border-left: 2px solid var(--border-light);">
                                    <strong>${commentatorName}</strong>: "${noteText}"
                                </div>
                            `;
                        });
                        
                        // 显示比对分析（如果有）
                        if (multiNoteRef.comparative_analysis && multiNoteRef.comparative_analysis.commentary_comparison) {
                            const analysisText = multiNoteRef.comparative_analysis.commentary_comparison;
                            rightPanelHtml += `
                                <div style="font-size: 10px; color: var(--text-secondary); margin-top: 8px; padding: 8px; background: var(--bg-secondary); border-radius: 3px; line-height: 1.6;">
                                    <strong style="color: var(--accent);">📊 比对分析：</strong><br>
                                    ${analysisText}
                                </div>
                            `;
                        }
                        
                        rightPanelHtml += '</div>';
                        continue;  // 显示完此条目后继续处理其他分组
                    }
                    
                    // 处理传统格式：多个不同注释者的条目
                    if (verseRefs.length < 2) continue;
                    
                    const commentators = [...new Set(verseRefs.map(r => r.commentator).filter(Boolean))];
                    if (commentators.length < 2) continue;
                    
                    internalRefCount++;
                    const firstRef = verseRefs[0];
                    const verseInfo = firstRef.verse ? `·${firstRef.verse}` : '';
                    
                    rightPanelHtml += `
                        <div style="background: var(--white); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid var(--accent);">
                            <div style="font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 8px;">
                                📖 《${firstRef.classic_title}·${firstRef.chapter}${verseInfo}》内证互参
                            </div>
                            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px;">
                                多家注释：${commentators.join('、')}
                            </div>
                    `;
                    
                    verseRefs.forEach(c => {
                        rightPanelHtml += `
                            <div style="font-size: 11px; color: var(--text-primary); line-height: 1.5; margin-bottom: 6px; padding-left: 8px; border-left: 2px solid var(--border-light);">
                                <strong>${c.commentator || '原文'}</strong>: "${c.scripture_content}"
                                ${c.translation ? `<br><span style="color: var(--text-secondary); font-style: italic;">→ ${c.translation}</span>` : ''}
                            </div>
                        `;
                    });
                    
                    rightPanelHtml += '</div>';
                }
                
                // 如果没有找到多注释者互参，显示引用的经文
                if (internalRefCount === 0) {
                    rightPanelHtml += `
                        <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px; padding: 8px; background: var(--bg-secondary); border-radius: 4px; border-left: 2px solid var(--accent);">
                            📚 检测到 ${matches.length} 条引文，涉及 ${Object.keys(groupedByClassic).length} 部经典
                        </div>
                    `;
                    
                    // 显示引用的经文样本
                    const sampleMatches = matches.slice(0, 8);
                    sampleMatches.forEach(m => {
                        const c = m.citation;
                        const verseInfo = c.verse ? `·${c.verse}` : '';
                        rightPanelHtml += `
                            <div style="background: var(--white); padding: 10px; border-radius: 4px; margin-bottom: 8px; border-left: 3px solid var(--accent-light);">
                                <div style="font-size: 11px; font-weight: 600; color: var(--accent); margin-bottom: 4px;">
                                    《${c.classic_title}·${c.chapter}${verseInfo}》
                                </div>
                                <div style="font-size: 11px; color: var(--text-primary); line-height: 1.5;">
                                    "${c.scripture_content.substring(0, 80)}${c.scripture_content.length > 80 ? '...' : ''}"
                                </div>
                                ${c.translation ? `<div style="font-size: 10px; color: var(--text-secondary); font-style: italic; margin-top: 3px;">→ ${c.translation.substring(0, 80)}${c.translation.length > 80 ? '...' : ''}</div>` : ''}
                            </div>
                        `;
                    });
                    
                    if (matches.length > 8) {
                        const remainingMatches = matches.slice(8);
                        const expandBtnId = 'expandCitations' + Math.random().toString(36).substr(2, 9);
                        rightPanelHtml += `
                            <button onclick="expandCitations(this, ${JSON.stringify(remainingMatches).replace(/"/g, '&quot;')})" style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 8px; background: var(--bg-secondary); border: none; border-radius: 4px; cursor: pointer; width: 100%;">
                                ...还有 ${matches.length - 8} 条，展开查看
                            </button>
                        `;
                    }
                }
            }
            
            rightPanelHtml += '</div>';
            document.getElementById('citationPanelRight').innerHTML = rightPanelHtml;
        }

function expandCitations(btn, remainingMatches) {
    const container = btn.parentElement;
    let html = '';
    
    remainingMatches.forEach((m) => {
        const c = m.citation;
        const verseInfo = c.verse ? `·${c.verse}` : '';
        const commentatorInfo = c.commentator ? `（${c.commentator}《${c.commentary_title}》）` : '';
        
        html += `
            <div style="background: var(--white); padding: 10px; border-radius: 4px; margin-bottom: 8px; border-left: 3px solid var(--accent);">
                <div style="font-size: 11px; font-weight: 600; color: var(--accent); margin-bottom: 4px;">
                    《${c.classic_title}·${c.chapter}${verseInfo}》 ${commentatorInfo}
                </div>
                <div style="font-size: 12px; color: var(--text-primary); line-height: 1.6; margin-bottom: 4px;">
                    "${c.scripture_content}"
                </div>
                ${c.translation ? `<div style="font-size: 11px; color: var(--text-secondary); font-style: italic;">→ ${c.translation}</div>` : ''}
            </div>
        `;
    });
    
    btn.insertAdjacentHTML('beforebegin', html);
    btn.remove();
}
        
        function analyzeExegesis(content) {
            const foundWords = [];
            const exegesisData = getMergedExegesis();
            
            if (!exegesisData || Object.keys(exegesisData).length === 0) {
                document.getElementById('etymologyPanel').innerHTML = '<p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px;">⚠️ 训诂数据未加载</p>';
                return;
            }
            
            // 改进的字词匹配逻辑 - 支持更灵活的匹配
            for (const [word, data] of Object.entries(exegesisData)) {
                if (!word || !data) continue;
                const wordEscaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                // 更宽松的匹配：单独成字、在句子中、在文本任何位置
                const wordPattern = new RegExp(wordEscaped, 'g');
                if (wordPattern.test(content)) {
                    foundWords.push({ word, data });
                }
            }
            
            if (foundWords.length > 0) {
                let etymologyHtml = '<div style="max-height: 600px; overflow-y: auto;">';
                
                foundWords.forEach(item => {
                    etymologyHtml += `
                        <div style="margin-bottom: 16px; padding: 12px; background: var(--white); border-radius: 4px; border-left: 3px solid var(--accent);">
                            <div style="font-family: 'Crimson Pro', serif; font-size: 18px; font-weight: 600; color: var(--accent); margin-bottom: 8px;">"${item.word}"</div>
                            
                            ${item.data.benyi ? `
                                <div style="font-size: 12px; color: var(--text-primary); margin-bottom: 6px; line-height: 1.5;">
                                    <strong style="color: var(--accent); font-weight: 600;">【本义】</strong>
                                    <span>${item.data.benyi}</span>
                                </div>
                            ` : ''}
                            
                            ${item.data.duanzhu ? `
                                <div style="font-size: 12px; color: var(--text-primary); margin-bottom: 6px; line-height: 1.5;">
                                    <strong style="color: var(--accent); font-weight: 600;">【段注】</strong>
                                    <span>${item.data.duanzhu}</span>
                                </div>
                            ` : ''}
                            
                            ${item.data.shuowen ? `
                                <div style="font-size: 12px; color: var(--text-primary); margin-bottom: 6px; line-height: 1.5; padding: 6px; background: var(--bg-secondary); border-radius: 3px;">
                                    <strong style="color: var(--accent); font-weight: 600;">【说文解字】</strong>
                                    <span style="display: block; margin-top: 4px; font-style: italic; color: var(--text-secondary);">"${item.data.shuowen}"</span>
                                </div>
                            ` : ''}
                            
                            ${item.data.yinshenyi ? `
                                <div style="font-size: 12px; color: var(--text-primary); margin-bottom: 6px; line-height: 1.5;">
                                    <strong style="color: var(--accent); font-weight: 600;">【引申义】</strong>
                                    <span>${Array.isArray(item.data.yinshenyi) ? item.data.yinshenyi.map(y => `<span style="display: inline-block; margin-right: 8px; padding: 3px 6px; background: var(--bg-secondary); border-radius: 3px; font-size: 11px;">${y}</span>`).join('') : item.data.yinshenyi}</span>
                                </div>
                            ` : ''}
                            
                            ${item.data.qinmu ? `
                                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px; line-height: 1.5;">
                                    <strong style="color: var(--text-secondary); font-weight: 600;">【出处】</strong>
                                    <span>${item.data.qinmu}</span>
                                </div>
                            ` : ''}
                            
                            ${item.data.warning ? `
                                <div style="font-size: 11px; color: #d97706; margin-bottom: 0px; line-height: 1.5; padding: 6px; background: rgba(217, 119, 6, 0.1); border-radius: 3px; border-left: 2px solid #d97706;">
                                    <strong style="font-weight: 600;">⚠️ 重要注解：</strong>
                                    <span style="display: block; margin-top: 3px;">${item.data.warning}</span>
                                </div>
                            ` : ''}
                        </div>
                    `;
                });
                
                etymologyHtml += '</div>';
                document.getElementById('etymologyPanel').innerHTML = etymologyHtml;
            } else {
                document.getElementById('etymologyPanel').innerHTML = '<p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px;">未检测到需要训诂的字词</p>';
            }
        }
        
        function analyzeCrossReferences(content) {
            const crossRefs = getMergedCrossRefs();
            const contentLower = content.toLowerCase();
            
            if (!crossRefs || !Array.isArray(crossRefs)) {
                document.getElementById('crossRefPanel').innerHTML = '<p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px;">⚠️ 跨文献数据未加载</p>';
                return;
            }
            
            // 检查是否是专门的 CROSS_REFERENCES 格式（包含 source_classic 等字段）
            const isCrossRefFormat = crossRefs.length > 0 && crossRefs[0].source_classic;
            
            let crossRefHtml = '<div style="max-height: 600px; overflow-y: auto;">';
            
            if (isCrossRefFormat && crossRefs.length > 0) {
                // ===== 处理专门的跨文献关联数据 =====
                const foundLinks = [];
                
                for (let i = 0; i < crossRefs.length; i++) {
                    const link = crossRefs[i];
                    if (!link || !link.source_classic) continue;
                    
                    // 检查源文献和目标文献是否在内容中提及
                    const sourceKeywords = [
                        link.source_classic,
                        link.source_chapter,
                        link.source_verse ? String(link.source_verse) : ''
                    ].filter(Boolean);
                    
                    const targetKeywords = [
                        link.target_classic,
                        link.target_chapter,
                        link.target_verse ? String(link.target_verse) : ''
                    ].filter(Boolean);
                    
                    let sourceMatch = sourceKeywords.some(kw => 
                        new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi').test(contentLower)
                    );
                    let targetMatch = targetKeywords.some(kw => 
                        new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi').test(contentLower)
                    );
                    
                    if (sourceMatch || targetMatch) {
                        foundLinks.push(link);
                    }
                }
                
                if (foundLinks.length > 0) {
                    foundLinks.forEach(link => {
                        const sourceInfo = `《${link.source_classic}${link.source_chapter ? '·' + link.source_chapter : ''}${link.source_verse ? '·' + link.source_verse : ''}》`;
                        const targetInfo = `《${link.target_classic}${link.target_chapter ? '·' + link.target_chapter : ''}${link.target_verse ? '·' + link.target_verse : ''}》`;
                        
                        crossRefHtml += `
                            <div style="background: var(--white); padding: 12px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid var(--accent-light);">
                                <div style="font-size: 11px; font-weight: 600; color: var(--accent); margin-bottom: 8px;">
                                    🔗 跨文献关联
                                </div>
                                <div style="font-size: 11px; color: var(--text-primary); line-height: 1.6;">
                                    <div style="margin-bottom: 6px;">
                                        <strong>源文献：</strong> ${sourceInfo}
                                    </div>
                                    <div style="margin-bottom: 6px;">
                                        <strong>关联文献：</strong> ${targetInfo}
                                    </div>
                                    ${link.relationship ? `<div style="margin-bottom: 6px;"><strong>关系：</strong> ${link.relationship}</div>` : ''}
                                    ${link.commentary ? `<div style="margin-bottom: 6px; padding: 8px; background: var(--bg-secondary); border-radius: 3px; font-size: 10px;">${link.commentary}</div>` : ''}
                                    ${link.description ? `<div style="color: var(--text-secondary);">${link.description}</div>` : ''}
                                </div>
                            </div>
                        `;
                    });
                    
                    crossRefHtml += `
                        <div style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 8px; background: var(--bg-secondary); border-radius: 4px; margin-top: 10px;">
                            共检测到 ${foundLinks.length} 处跨文献关联
                        </div>
                    `;
                } else {
                    crossRefHtml += `
                        <div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px;">
                            未在文本中检测到相关的跨文献关联
                        </div>
                    `;
                }
            } else {
                // ===== 使用 CLASSICS_REFERENCES 数据展示多经典引用 =====
                const refs = getMergedReferences();
                const matches = [];
                
                for (let i = 0; i < refs.length; i++) {
                    const citation = refs[i];
                    if (!citation) continue;
                    
                    const keywords = [
                        citation.classic_title,
                        citation.chapter,
                        citation.verse ? String(citation.verse) : '',
                        citation.scripture_content,
                        citation.translation
                    ].filter(Boolean);
                    
                    let matchCount = 0;
                    for (let j = 0; j < keywords.length; j++) {
                        const keyword = keywords[j];
                        if (!keyword) continue;
                        try {
                            const pattern = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                            let match;
                            while ((match = pattern.exec(contentLower)) !== null) {
                                matchCount++;
                            }
                        } catch(e) {}
                    }
                    
                    if (matchCount > 0) {
                        matches.push({ citation, matchCount });
                    }
                }
                
                // 按经典分组
                const groupedByClassic = {};
                for (const m of matches) {
                    const classic = m.citation.classic_title;
                    if (!groupedByClassic[classic]) groupedByClassic[classic] = [];
                    groupedByClassic[classic].push(m.citation);
                }
                
                const classicNames = Object.keys(groupedByClassic);
                
                if (classicNames.length < 2) {
                    crossRefHtml += `
                        <div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px;">
                            未检测到多经典引用<br><span style="font-size: 11px; color: var(--text-muted); margin-top: 8px; display: block;">💡 若要显示跨文献关联，需要在文本中引用多部经典</span>
                        </div>
                    `;
                } else {
                    crossRefHtml += `
                        <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px; padding: 8px; background: var(--bg-secondary); border-radius: 4px; border-left: 2px solid var(--accent);">
                            📚 涉及 ${classicNames.length} 部经典：${classicNames.join('、')}
                        </div>
                    `;
                    
                    for (const classic of classicNames) {
                        const verseList = groupedByClassic[classic];
                        const sampleRefs = verseList.slice(0, 5);
                        
                        crossRefHtml += `
                            <div style="background: var(--white); padding: 10px; border-radius: 4px; margin-bottom: 10px; border-left: 3px solid var(--accent-light);">
                                <div style="font-size: 12px; font-weight: 600; color: var(--accent); margin-bottom: 6px;">
                                    📖 《${classic}》
                                </div>
                        `;
                        
                        sampleRefs.forEach(c => {
                            const verseInfo = c.verse ? `·${c.verse}` : '';
                            crossRefHtml += `
                                <div style="font-size: 11px; color: var(--text-primary); line-height: 1.4; margin-bottom: 4px; padding-left: 8px; border-left: 2px solid var(--border-light);">
                                    <strong>${c.chapter}${verseInfo}</strong>: "${c.scripture_content.substring(0, 60)}${c.scripture_content.length > 60 ? '...' : ''}"
                                </div>
                            `;
                        });
                        
                        if (verseList.length > 5) {
                            const remainingCount = verseList.length - 5;
                            const remaining = verseList.slice(5);
                            crossRefHtml += `<button onclick="this.style.display='none'; this.nextElementSibling.style.display='block';" style="font-size: 10px; color: var(--text-muted); padding: 4px 8px; background: var(--bg-secondary); border: none; border-radius: 4px; cursor: pointer; margin-left: 8px;">...还有 ${remainingCount} 条</button>`;
                            crossRefHtml += '<div style="display: none; padding-left: 8px;">';
                            remaining.forEach(r => {
                                const rv = r.verse ? `·${r.verse}` : '';
                                crossRefHtml += `
                                    <div style="font-size: 11px; color: var(--text-primary); line-height: 1.4; margin-bottom: 4px; border-left: 2px solid var(--border-light); padding-left: 8px;">
                                        <strong>${r.chapter}${rv}</strong>: "${r.scripture_content.substring(0, 60)}${r.scripture_content.length > 60 ? '...' : ''}"
                                    </div>
                                `;
                            });
                            crossRefHtml += '</div>';
                        }
                        
                        crossRefHtml += '</div>';
                    }
                }
            }
            
            crossRefHtml += '</div>';
            document.getElementById('crossRefPanel').innerHTML = crossRefHtml;
        }

function expandCrossRefs(btn, remainingMatches) {
    const container = btn.parentElement;
    let html = '';
    
    remainingMatches.forEach((m) => {
        const c = m.citation;
        const verseInfo = c.verse ? `·${c.verse}` : '';
        
        html += `
            <div style="background: var(--bg-secondary); padding: 8px; border-radius: 4px; margin-bottom: 6px; border-left: 2px solid var(--accent);">
                <div style="font-size: 11px; font-weight: 600; color: var(--accent); margin-bottom: 3px;">
                    《${c.classic_title}·${c.chapter}${verseInfo}》
                </div>
                <div style="font-size: 11px; color: var(--text-primary); line-height: 1.5;">
                    "${c.scripture_content}"
                </div>
                ${c.translation ? `<div style="font-size: 10px; color: var(--text-muted); margin-top: 3px;">→ ${c.translation}</div>` : ''}
            </div>
        `;
    });
    
    btn.insertAdjacentHTML('beforebegin', html);
    btn.remove();
}
        
        function appendAnalysisResult(resultHtml) {
            const container = document.getElementById('analysisResult');
            container.innerHTML += resultHtml;
            document.getElementById('clearAnalysisBtn').classList.remove('hidden');
        }
        
        function clearAnalysisResults() {
            document.getElementById('analysisResult').innerHTML = '';
            document.getElementById('clearAnalysisBtn').classList.add('hidden');
        }
        
