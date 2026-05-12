        function loadTeachingDocs() {
            try {
                const saved = localStorage.getItem(STORAGE_KEYS.TEACHING_DOCS);
                teachingDocs = saved ? JSON.parse(saved) : [];
                renderTeachingDocsList();
            } catch {
                teachingDocs = [];
            }
        }
        
        function saveTeachingDocs() {
            localStorage.setItem(STORAGE_KEYS.TEACHING_DOCS, JSON.stringify(teachingDocs));
        }

        function uploadTeachingToKnowledgeBase() {
            const userTeachingDocs = teachingDocs.filter(d => !d.isBuiltIn);
            
            if (userTeachingDocs.length === 0) {
                const manualContent = document.getElementById('teachingContent').value.trim();
                if (!manualContent) {
                    alert('请先上传教学文档或粘贴文档内容');
                    return;
                }
                const name = '粘贴内容_' + new Date().toLocaleDateString('zh-CN');
                teachingDocs.push({
                    name: name,
                    content: manualContent,
                    formattedContent: null,
                    size: new Blob([manualContent]).size,
                    addedAt: new Date().toISOString()
                });
                saveTeachingDocs();
                renderTeachingDocsList();
                document.getElementById('teachingContent').value = '';
            }

            const docName = prompt('请输入文档名称（用于知识库标识）:', 
                userTeachingDocs.length > 1 ? `${userTeachingDocs.length}个教学文档` : userTeachingDocs[0].name);
            
            if (!docName) return;

            let kb = getKnowledgeBase();
            const existingIndex = kb.findIndex(d => d.name === '[教学标准] ' + docName);
            
            const teachingKbItem = {
                id: 'teaching_' + Date.now().toString(36),
                name: '[教学标准] ' + docName,
                type: 'teaching',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                summary: teachingSummary || '',
                versions: userTeachingDocs.map(d => ({
                    name: d.name,
                    content: d.content,
                    formattedContent: d.formattedContent || null,
                    timestamp: d.addedAt
                }))
            };

            if (existingIndex >= 0) {
                kb[existingIndex] = teachingKbItem;
            } else {
                const teachingIndex = kb.findIndex(d => d.type === 'teaching');
                if (teachingIndex >= 0) {
                    kb[teachingIndex] = teachingKbItem;
                } else {
                    kb.unshift(teachingKbItem);
                }
            }

            saveKnowledgeBase(kb);
            
            const hasFormat = userTeachingDocs.some(d => d.formattedContent);
            alert('教学文档已上传到知识库！' + (hasFormat ? ' (格式信息已保留)' : ''));
            switchTab('knowledge');
            renderKnowledgeBase();
        }

        async function uploadTeachingToCommunity() {
            if (!communityClient) {
                initCommunity();
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            if (!communityClient) {
                alert('连接社区失败，请稍后重试');
                return;
            }

            if (teachingDocs.length === 0) {
                const manualContent = document.getElementById('teachingContent').value.trim();
                if (!manualContent) {
                    alert('请先上传教学文档或粘贴文档内容');
                    return;
                }
                const name = '粘贴内容_' + new Date().toLocaleDateString('zh-CN');
                teachingDocs.push({
                    name: name,
                    content: manualContent,
                    formattedContent: null,
                    size: new Blob([manualContent]).size,
                    addedAt: new Date().toISOString()
                });
                saveTeachingDocs();
                renderTeachingDocsList();
            }

            const categoryLabel = prompt('请输入文档分类（输入"教学"或"审核"）:', '教学');
            if (!categoryLabel) return;
            const category = categoryLabel.includes('审核') ? '审核文档' : '教学文档';
            
            const docName = prompt('请输入教学文档名称（用于社区分享）:', 
                teachingDocs.length > 1 ? `${teachingDocs.length}个教学文档` : teachingDocs[0].name);
            
            if (!docName) return;

            const lastAuthor = (typeof COMMUNITY_STORAGE_KEYS !== 'undefined' && COMMUNITY_STORAGE_KEYS.LAST_AUTHOR)
                ? (localStorage.getItem(COMMUNITY_STORAGE_KEYS.LAST_AUTHOR) || '匿名')
                : '匿名';
            const authorInput = prompt('请输入您的昵称:', lastAuthor);
            if (authorInput === null) return;
            const author = authorInput.trim() || lastAuthor;
            if (typeof COMMUNITY_STORAGE_KEYS !== 'undefined' && COMMUNITY_STORAGE_KEYS.LAST_AUTHOR) {
                localStorage.setItem(COMMUNITY_STORAGE_KEYS.LAST_AUTHOR, author);
            }

            const userTeachingDocs = teachingDocs.filter(d => !d.isBuiltIn);
            if (userTeachingDocs.length === 0) {
                alert('没有可上传的教学文档（内置标准不可上传到社区）');
                return;
            }
            
            const combinedContent = userTeachingDocs.map(d => `【${d.name}】\n${d.content}`).join('\n\n');
            
            let combinedFormattedContent = null;
            const formattedDocs = userTeachingDocs.filter(d => d.formattedContent);
            if (formattedDocs.length > 0) {
                combinedFormattedContent = formattedDocs.map(d => {
                    if (d.formattedContent) {
                        return `【${d.name}】\n${d.formattedContent}`;
                    }
                    return `【${d.name}】\n${escapeHtml(d.content)}`;
                }).join('\n\n');
            }

            const insertData = {
                title: `[${category}] ` + docName,
                content: combinedContent,
                review_result: teachingSummary || '',
                author: author
            };
            
            if (combinedFormattedContent) {
                insertData.formatted_content = combinedFormattedContent;
            }

            communityClient.from('community_docs').insert(insertData).select('id').single().then(({ data, error }) => {
                if (error) {
                    alert('上传失败: ' + error.message);
                } else {
                    alert('教学文档已上传到社区！' + (combinedFormattedContent ? ' (格式信息已保留)' : '') + '\n其他用户可以使用此教学标准。');
                    if (data && data.id !== undefined && data.id !== null && typeof markCommunityDocAsOwned === 'function') {
                        markCommunityDocAsOwned(data.id);
                    }
                    switchTab('community');
                    loadCommunityDocs();
                }
            });
        }
        
        function renderTeachingDocsList() {
            const list = document.getElementById('teachingDocsList');
            const summary = document.getElementById('teachingDocsSummary');
            const countEl = document.getElementById('teachingDocsCount');
            
            const visibleDocs = teachingDocs.filter(d => !d.isBuiltIn);
            const hasBuiltIn = teachingDocs.some(d => d.isBuiltIn);
            
            if (visibleDocs.length === 0) {
                list.innerHTML = hasBuiltIn ? '<p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 10px;">已加载内置评分标准</p>' : '';
                summary.classList.add('hidden');
                return;
            }
            
            countEl.textContent = visibleDocs.length;
            summary.classList.remove('hidden');
            
            list.innerHTML = visibleDocs.map((doc, index) => {
                const actualIndex = teachingDocs.indexOf(doc);
                return `
                    <div class="teaching-doc-item">
                        <span class="name">${escapeHtml(doc.name)}</span>
                        <button class="remove-btn" onclick="removeTeachingDoc(${actualIndex})" title="移除">移除</button>
                    </div>
                `;
            }).join('');
        }
        
        function removeTeachingDoc(index) {
            const doc = teachingDocs[index];
            if (doc && doc.isBuiltIn) {
                alert('内置评分标准不可移除');
                return;
            }
            teachingDocs.splice(index, 1);
            saveTeachingDocs();
            renderTeachingDocsList();
        }
        
        async function handleTeachingFiles(input) {
            const files = Array.from(input.files);
            if (files.length === 0) return;
            
            const btn = input.closest('.file-upload-area').querySelector('p');
            btn.textContent = '正在加载文件...';
            
            let loadedCount = 0;
            let hasAnyFormat = false;
            let latestFormattedContent = '';
            
            for (const file of files) {
                const fileExt = file.name.split('.').pop().toLowerCase();
                
                let content = '';
                let isFormatted = false;
                
                if (fileExt === 'txt' || fileExt === 'md') {
                    content = await file.text();
                } else if (fileExt === 'docx') {
                    try {
                        content = await parseDocx(file);
                        isFormatted = content.includes('style="');
                        if (isFormatted) {
                            hasAnyFormat = true;
                            latestFormattedContent = content;
                        }
                    } catch(e) {
                        alert(`文件 ${file.name} 解析失败: ${e.message}`);
                        continue;
                    }
                } else if (fileExt === 'pdf') {
                    try {
                        content = await parsePdf(file);
                    } catch(e) {
                        alert(`文件 ${file.name} 解析失败: ${e.message}`);
                        continue;
                    }
                } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExt)) {
                    try {
                        content = await performOCR(file);
                    } catch(e) {
                        alert(`文件 ${file.name} OCR识别失败: ${e.message}`);
                        continue;
                    }
                } else {
                    alert(`不支持的格式: ${file.name}`);
                    continue;
                }
                
                const plainContent = isFormatted ? convertToPlainText(content) : content;
                
                const existingIndex = teachingDocs.findIndex(d => d.name === file.name);
                if (existingIndex >= 0) {
                    teachingDocs[existingIndex] = {
                        name: file.name,
                        content: plainContent,
                        formattedContent: isFormatted ? content : null,
                        size: file.size,
                        addedAt: new Date().toISOString()
                    };
                } else {
                    teachingDocs.push({
                        name: file.name,
                        content: plainContent,
                        formattedContent: isFormatted ? content : null,
                        size: file.size,
                        addedAt: new Date().toISOString()
                    });
                }
                
                loadedCount++;
            }
            
            saveTeachingDocs();
            renderTeachingDocsList();
            
            const previewDiv = document.getElementById('teachingPreview');
            if (previewDiv) {
                if (hasAnyFormat) {
                    const formatInfo = extractFormatInfo(latestFormattedContent);
                    let formatBadge = '<div style="margin-bottom: 10px; font-size: 12px; color: var(--accent);">';
                    formatBadge += '<span style="font-weight: 600;">检测到格式信息:</span>';
                    if (formatInfo.hasColors) {
                        formatBadge += ' | <span style="color: #e74c3c;">●</span> 彩色文字';
                    }
                    if (formatInfo.hasFontSizes) {
                        formatBadge += ' | <span style="color: #3498db;">●</span> 不同字号';
                    }
                    formatBadge += '</div>';
                    
                    previewDiv.innerHTML = formatBadge + latestFormattedContent;
                    previewDiv.style.display = 'block';
                } else {
                    previewDiv.innerHTML = '';
                    previewDiv.style.display = 'none';
                }
            }
            
            btn.textContent = `已加载 ${loadedCount} 个文件${hasAnyFormat ? ' (部分含格式)' : ''}`;
            input.value = '';
        }
        

        async function submitTeachingDoc() {
            const manualContent = document.getElementById('teachingContent').value.trim();
            const resultDiv = document.getElementById('teaching-result');
            
            if (manualContent && teachingDocs.length > 0) {
                const name = '粘贴内容_' + new Date().toLocaleDateString('zh-CN');
                teachingDocs.push({
                    name: name,
                    content: manualContent,
                    formattedContent: null,
                    size: new Blob([manualContent]).size,
                    addedAt: new Date().toISOString()
                });
                saveTeachingDocs();
                renderTeachingDocsList();
                document.getElementById('teachingContent').value = '';
            }
            
            if (teachingDocs.length === 0) {
                if (!manualContent) {
                    alert('请上传教学文档或粘贴文档内容');
                    return;
                }
                teachingDocs.push({
                    name: '粘贴内容_' + new Date().toLocaleDateString('zh-CN'),
                    content: manualContent,
                    formattedContent: null,
                    size: new Blob([manualContent]).size,
                    addedAt: new Date().toISOString()
                });
                saveTeachingDocs();
                renderTeachingDocsList();
            }
            
            const combinedContent = teachingDocs.map(d => `【${d.name}】\n${d.content}`).join('\n\n');
            
            resultDiv.classList.remove('hidden');
            resultDiv.innerHTML = `<div class="loading">AI正在理解 ${teachingDocs.length} 个教学文档</div>`;
            
            try {
                const messages = [
                    { role: 'system', content: '你是一位教学文档分析专家。请仔细阅读用户提供的教学文档，提取其中的所有可量化、可判断的具体要求。\n\n请按以下格式输出：\n\n## 标准清单\n1. [标准名称]：具体要求描述\n2. ...\n\n## 评分锚点\n- X分要求：...\n- Y分要求：...\n\n## 注意事项\n- 事实错误类型：...\n- 禁止事项：...\n\n请确保总结清晰、完整、可操作性强，便于后续逐条对照审核。' },
                    { role: 'user', content: '请理解以下教学文档并总结核心要点：\n\n' + combinedContent }
                ];
                
                teachingSummary = await callAIApi(messages);
                resultDiv.textContent = teachingSummary;
                
                saveTeachingSummaryToKb();
            } catch (e) {
                resultDiv.textContent = '错误: ' + e.message;
            }
        }
        
        function saveTeachingSummaryToKb() {
            if (teachingDocs.length === 0) return;
            
            let kb = getKnowledgeBase();
            
            const teachingKbItem = {
                id: 'teaching_' + Date.now().toString(36),
                name: '[教学标准] ' + (teachingDocs.length > 1 ? `${teachingDocs.length}个教学文档` : teachingDocs[0].name),
                type: 'teaching',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                summary: teachingSummary,
                versions: teachingDocs.map(d => ({
                    name: d.name,
                    content: d.content,
                    timestamp: d.addedAt
                }))
            };
            
            const existingIndex = kb.findIndex(d => d.type === 'teaching');
            if (existingIndex >= 0) {
                kb[existingIndex] = teachingKbItem;
            } else {
                kb.unshift(teachingKbItem);
            }
            
            saveKnowledgeBase(kb);
        }
        
