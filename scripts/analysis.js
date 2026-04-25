        function safeAnalysisHtml(value) {
            const text = value == null ? '' : String(value);
            if (typeof escapeHtml === 'function') {
                return escapeHtml(text);
            }
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function cleanCitationDisplayText(value) {
            return String(value || '')
                .trim()
                .replace(/^[“"'「『]+/, '')
                .replace(/[”"'」』]+$/, '');
        }

        function normalizeCitationLookupText(text) {
            return String(text || '')
                .toLowerCase()
                .replace(/[\s\u3000]/g, '')
                .replace(/[，。！？；：、,.!?:;"“”'‘’`~·•…（）()《》〈〉【】\[\]{}「」『』\-—_\/\\|]+/g, '');
        }

        function splitContentIntoCitationSegments(content) {
            const rawSegments = String(content || '')
                .split(/[，。！？；：、,.!?:;"“”'‘’`~·•…（）()《》〈〉【】\[\]{}「」『』\n\r\t]+/g)
                .map(segment => segment.trim())
                .filter(Boolean);

            const segments = [];
            const seen = new Set();

            rawSegments.forEach((segment, index) => {
                const normalized = normalizeCitationLookupText(segment);
                if (normalized.length < 3 || seen.has(normalized)) {
                    return;
                }

                seen.add(normalized);
                segments.push({
                    original: segment,
                    normalized,
                    index
                });
            });

            return segments;
        }

        function getCitationMatchScore(segmentNormalized, scriptureNormalized) {
            if (!segmentNormalized || !scriptureNormalized) {
                return 0;
            }

            if (segmentNormalized === scriptureNormalized) {
                return 100;
            }

            if (segmentNormalized.length <= 3 || scriptureNormalized.length <= 3) {
                return 0;
            }

            if (scriptureNormalized.includes(segmentNormalized)) {
                const coverage = segmentNormalized.length / scriptureNormalized.length;
                const isEdgeMatch = scriptureNormalized.startsWith(segmentNormalized) || scriptureNormalized.endsWith(segmentNormalized);
                if (!isEdgeMatch && coverage < 0.15) {
                    return 0;
                }

                return Math.round(82 + Math.min(16, coverage * 20));
            }

            if (segmentNormalized.includes(scriptureNormalized)) {
                const coverage = scriptureNormalized.length / segmentNormalized.length;
                return Math.round(72 + Math.min(16, coverage * 20));
            }

            return 0;
        }

        function buildScriptureReferenceMatches(content, refs) {
            const segments = splitContentIntoCitationSegments(content);
            const matches = [];
            const dedupe = new Set();

            const referenceCache = refs.map((citation, index) => ({
                citation,
                index,
                normalizedScripture: normalizeCitationLookupText(citation && citation.scripture_content)
            })).filter(item => item.normalizedScripture);

            segments.forEach(segment => {
                referenceCache.forEach(item => {
                    const score = getCitationMatchScore(segment.normalized, item.normalizedScripture);
                    if (!score) {
                        return;
                    }

                    const citation = item.citation;
                    const key = `${segment.normalized}||${item.index}`;

                    if (dedupe.has(key)) {
                        return;
                    }

                    dedupe.add(key);
                    matches.push({
                        segment,
                        citation,
                        referenceIndex: item.index,
                        score,
                        exact: segment.normalized === item.normalizedScripture
                    });
                });
            });

            matches.sort((left, right) => {
                if (left.segment.index !== right.segment.index) {
                    return left.segment.index - right.segment.index;
                }
                if (left.exact !== right.exact) {
                    return right.exact - left.exact;
                }
                if (left.score !== right.score) {
                    return right.score - left.score;
                }
                return (right.segment.normalized.length - left.segment.normalized.length);
            });

            return {
                segments,
                matches
            };
        }

        function getPreferredCitationMatches(matches) {
            const groupedBySegment = new Map();

            matches.forEach(match => {
                const key = match.segment.normalized;
                if (!groupedBySegment.has(key)) {
                    groupedBySegment.set(key, []);
                }
                groupedBySegment.get(key).push(match);
            });

            const preferred = [];
            Array.from(groupedBySegment.values())
                .sort((left, right) => left[0].segment.index - right[0].segment.index)
                .forEach(group => {
                    const exactMatches = group.filter(match => match.exact);
                    if (exactMatches.length > 0) {
                        preferred.push(...exactMatches);
                        return;
                    }

                    const topScore = Math.max(...group.map(match => match.score));
                    preferred.push(...group.filter(match => match.score >= topScore - 4));
                });

            return preferred;
        }

        function buildCitationDisplayGroups(matches) {
            const preferredMatches = getPreferredCitationMatches(matches);
            const groups = [];
            const groupMap = new Map();

            preferredMatches.forEach(match => {
                const citation = match.citation;
                const scriptureKey = normalizeCitationLookupText(citation.scripture_content);
                const key = [
                    citation.classic_title || '',
                    citation.chapter || '',
                    citation.verse || '',
                    scriptureKey
                ].join('||');

                if (!groupMap.has(key)) {
                    const group = {
                        key,
                        classicTitle: citation.classic_title || '经典',
                        chapter: citation.chapter || '',
                        verse: citation.verse || '',
                        scriptureContent: citation.scripture_content || match.segment.original,
                        segmentTexts: [],
                        items: [],
                        orderIndex: match.segment.index,
                        hasExactMatch: match.exact
                    };
                    groupMap.set(key, group);
                    groups.push(group);
                }

                const group = groupMap.get(key);
                group.orderIndex = Math.min(group.orderIndex, match.segment.index);
                group.hasExactMatch = group.hasExactMatch || match.exact;

                if (!group.segmentTexts.includes(match.segment.original)) {
                    group.segmentTexts.push(match.segment.original);
                }

                if (!group.items.some(item => item.referenceIndex === match.referenceIndex)) {
                    group.items.push(match);
                }
            });

            return groups.sort((left, right) => {
                if (left.orderIndex !== right.orderIndex) {
                    return left.orderIndex - right.orderIndex;
                }
                if (left.hasExactMatch !== right.hasExactMatch) {
                    return right.hasExactMatch - left.hasExactMatch;
                }
                return left.key.localeCompare(right.key, 'zh-Hans-CN');
            });
        }

        function getCitationGroupTitle(group) {
            const verseInfo = group.verse ? `·${safeAnalysisHtml(group.verse)}` : '';
            return `《${safeAnalysisHtml(group.classicTitle)}·${safeAnalysisHtml(group.chapter || '未分章')}${verseInfo}》`;
        }

        function getCitationGroupGloss(group) {
            const translations = group.items
                .map(item => cleanCitationDisplayText(item.citation.translation))
                .filter(Boolean);

            if (translations.length === 0) {
                return '';
            }

            const uniqueTranslations = Array.from(new Set(translations));
            uniqueTranslations.sort((left, right) => left.length - right.length);
            const bestTranslation = uniqueTranslations[0];

            return bestTranslation.length <= 40 ? bestTranslation : '';
        }

        function getCitationCommentaryItems(group) {
            const items = [];
            const seen = new Set();

            const pushItem = (commentator, mainText, extraText = '') => {
                const cleanedMainText = cleanCitationDisplayText(mainText);
                const cleanedExtraText = cleanCitationDisplayText(extraText);

                if (!cleanedMainText) {
                    return;
                }

                const key = `${commentator}||${cleanedMainText}||${cleanedExtraText}`;
                if (seen.has(key)) {
                    return;
                }

                seen.add(key);
                items.push({
                    commentator,
                    quote: group.scriptureContent,
                    mainText: cleanedMainText,
                    extraText: cleanedExtraText
                });
            };

            group.items.forEach(item => {
                const citation = item.citation;
                const dedicatedNotes = [
                    ['郑玄', citation.note_zheng],
                    ['孔颖达', citation.note_kong],
                    ['朱熹', citation.note_zhu],
                    ['贾公彦', citation.note_jia],
                    ['疏', citation.note_su],
                    ['陆德明', citation.note_lu]
                ].filter(([, value]) => value && String(value).trim());

                if (dedicatedNotes.length > 0) {
                    dedicatedNotes.forEach(([commentator, value]) => {
                        pushItem(commentator, value);
                    });
                    return;
                }

                const commentator = citation.commentator || '原文';
                const mainText = citation.translation || citation.note || '';
                const normalizedMain = normalizeCitationLookupText(mainText);
                const normalizedTranslation = normalizeCitationLookupText(citation.translation);
                const normalizedNote = normalizeCitationLookupText(citation.note);
                const extraText = citation.note && normalizedMain !== normalizedNote
                    ? citation.note
                    : '';

                pushItem(commentator, mainText, extraText);
            });

            return items;
        }

        function getCitationGroupAnalysis(group) {
            const preferredItem = group.items.find(item => item.citation.comparative_analysis)
                || group.items.find(item => item.citation.note_zheng || item.citation.note_kong || item.citation.note_zhu)
                || group.items[0];

            return preferredItem ? preferredItem.citation.comparative_analysis : null;
        }

        function renderCitationCommentaryItem(item) {
            const extraHtml = item.extraText
                ? `<div class="citation-commentary-extra">${safeAnalysisHtml(item.extraText)}</div>`
                : '';

            return `
                <div class="citation-commentary-item">
                    <div class="citation-commentary-head">
                        <strong>${safeAnalysisHtml(item.commentator)}</strong>："${safeAnalysisHtml(item.quote)}"
                    </div>
                    <div class="citation-commentary-body">→ ${safeAnalysisHtml(item.mainText)}</div>
                    ${extraHtml}
                </div>
            `;
        }

        function renderCitationAnalysisBlock(group) {
            const analysis = getCitationGroupAnalysis(group);
            if (!analysis || typeof analysis !== 'object') {
                return '';
            }

            const commentaryComparison = analysis.commentary_comparison ? String(analysis.commentary_comparison).trim() : '';
            const versionPosition = analysis.version_position_analysis ? String(analysis.version_position_analysis).trim() : '';
            const contextualSignificance = analysis.contextual_significance ? String(analysis.contextual_significance).trim() : '';

            if (!commentaryComparison && !versionPosition && !contextualSignificance) {
                return '';
            }

            return `
                <div class="citation-analysis-block">
                    <div class="citation-analysis-title">比对分析：</div>
                    ${commentaryComparison ? `<div class="citation-analysis-text">${safeAnalysisHtml(commentaryComparison)}</div>` : ''}
                    ${versionPosition ? `<div class="citation-analysis-meta"><strong>位置：</strong>${safeAnalysisHtml(versionPosition)}</div>` : ''}
                    ${contextualSignificance ? `<div class="citation-analysis-meta"><strong>意义：</strong>${safeAnalysisHtml(contextualSignificance)}</div>` : ''}
                </div>
            `;
        }

        function renderCitationGroupCard(group) {
            const commentaryItems = getCitationCommentaryItems(group);
            const commentators = Array.from(new Set(commentaryItems.map(item => item.commentator)));
            const commentatorLabel = commentators.length > 1 ? '多家注释' : '相关注释';
            const gloss = getCitationGroupGloss(group);

            return `
                <div class="citation-group-card">
                    <div class="citation-group-title">${getCitationGroupTitle(group)} 内证互参</div>
                    <div class="citation-group-meta">${commentatorLabel}：${safeAnalysisHtml(commentators.join('、') || '待补充')}</div>
                    ${gloss ? `<div class="citation-group-gloss">义解：${safeAnalysisHtml(gloss)}</div>` : ''}
                    <div class="citation-scripture-banner">
                        <span class="citation-scripture-label">[经文]</span>
                        <span>"${safeAnalysisHtml(group.scriptureContent)}"</span>
                    </div>
                    <div class="citation-commentary-list">
                        ${commentaryItems.map(renderCitationCommentaryItem).join('')}
                    </div>
                    ${renderCitationAnalysisBlock(group)}
                </div>
            `;
        }

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
            
            if (!refs || !Array.isArray(refs) || refs.length === 0) {
                document.getElementById('citationPanelRight').innerHTML = '<p style="font-size: 12px; color: var(--accent-light); text-align: center; padding: 20px;">⚠️ 引文数据未加载</p>';
                return;
            }

            const { segments, matches } = buildScriptureReferenceMatches(content, refs);
            let rightPanelHtml = '<div style="overflow-y: auto;">';
            
            if (matches.length === 0) {
                rightPanelHtml += `
                    <div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px;">
                        📋 未检测到任何经典引文<br>
                        <span style="font-size: 11px; display: block; margin-top: 8px;">已断句 ${segments.length} 段，并在 <code>scripture_content</code> 中逐句检索，但没有直接命中</span>
                    </div>
                `;
            } else {
                const displayGroups = buildCitationDisplayGroups(matches);
                const matchedClassicCount = new Set(displayGroups.map(group => group.classicTitle).filter(Boolean)).size;

                rightPanelHtml += `
                    <div class="citation-panel-summary">
                        已断句 ${segments.length} 段，整理出 ${displayGroups.length} 组内证互参，涉及 ${matchedClassicCount} 部经典
                    </div>
                `;

                displayGroups.forEach(group => {
                    rightPanelHtml += renderCitationGroupCard(group);
                });
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
        
