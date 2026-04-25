        function getKnowledgeBase() {
            try {
                const data = localStorage.getItem(STORAGE_KEYS.KNOWLEDGE_BASE);
                return data ? JSON.parse(data) : [];
            } catch {
                return [];
            }
        }
        
        function saveKnowledgeBase(kb) {
            const jsonStr = JSON.stringify(kb);
            if (jsonStr.length > KB_MAX_SIZE) {
                kb = pruneOldData(kb);
            }
            localStorage.setItem(STORAGE_KEYS.KNOWLEDGE_BASE, JSON.stringify(kb));
        }
        
        function pruneOldData(kb) {
            kb.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            while (kb.length > 1 && JSON.stringify(kb).length > KB_MAX_SIZE * 0.8) {
                const oldestDoc = kb[kb.length - 1];
                if (oldestDoc.versions.length > 1) {
                    oldestDoc.versions.shift();
                } else {
                    kb.pop();
                }
            }
            return kb;
        }
        
        function loadKnowledgeBase() {
            renderKnowledgeBase();
        }
        
        function checkStorageWarning() {
            const kb = getKnowledgeBase();
            const size = new Blob([JSON.stringify(kb)]).size;
            document.getElementById('storageWarning').classList.toggle('hidden', size < KB_MAX_SIZE * 0.8);
        }
        
        let customReferences = {};
        let customExegesis = {};
        let customCrossRefs = {};
        
        function loadCustomReferences() {
            const saved = localStorage.getItem('docReviewerCustomRefs');
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    customReferences = data.references || {};
                    customExegesis = data.exegesis || {};
                    customCrossRefs = data.crossRefs || {};
                } catch(e) {
                    customReferences = {};
                    customExegesis = {};
                    customCrossRefs = {};
                }
            }
        }
        
        function saveCustomReferences() {
            localStorage.setItem('docReviewerCustomRefs', JSON.stringify({
                references: customReferences,
                exegesis: customExegesis,
                crossRefs: customCrossRefs
            }));
        }
        
        function getMergedExegesis() {
            loadCustomReferences();
            const merged = {};
            for (const word in EXEGESIS_DATA) {
                merged[word] = { ...EXEGESIS_DATA[word] };
                if (customExegesis[word]) {
                    merged[word] = { ...merged[word], ...customExegesis[word] };
                }
            }
            for (const word in customExegesis) {
                if (!merged[word]) {
                    merged[word] = customExegesis[word];
                }
            }
            return merged;
        }
        
        function getMergedCrossRefs() {
            loadCustomReferences();
            const merged = [];
            
            // 首先添加内置的 CROSS_REFERENCES 数据
            if (typeof CROSS_REFERENCES !== 'undefined' && Array.isArray(CROSS_REFERENCES)) {
                merged.push(...CROSS_REFERENCES);
            }
            
            // 然后添加用户自定义的跨文献关联数据
            if (customCrossRefs && Array.isArray(customCrossRefs)) {
                merged.push(...customCrossRefs);
            } else if (customCrossRefs && typeof customCrossRefs === 'object') {
                for (const key in customCrossRefs) {
                    if (Array.isArray(customCrossRefs[key])) {
                        merged.push(...customCrossRefs[key]);
                    }
                }
            }
            
            return merged.length > 0 ? merged : [];
        }
        
        // 获取训诂释义数据
        function getExegesisData() {
            if (typeof EXEGESIS_DATA !== 'undefined') {
                return {...EXEGESIS_DATA};
            }
            return {};
        }
        
        function getMergedReferences() {
            loadCustomReferences();
            const merged = [...CLASSICS_REFERENCES];
            for (const book in customReferences) {
                if (Array.isArray(customReferences[book])) {
                    merged.push(...customReferences[book]);
                } else {
                    for (const topic in customReferences[book]) {
                        if (Array.isArray(customReferences[book][topic])) {
                            merged.push(...customReferences[book][topic]);
                        }
                    }
                }
            }
            return merged;
        }
        
        function renderKnowledgeBase() {
            const kb = getKnowledgeBase();
            const search = document.getElementById('kbSearch').value.toLowerCase();
            const list = document.getElementById('kbList');
            
            let teachingCount = 0;
            let totalVersions = 0;
            const filtered = kb.filter(doc => {
                if (doc.type === 'teaching') teachingCount++;
                totalVersions += doc.versions?.length || 1;
                return !search || doc.name.toLowerCase().includes(search);
            });
            
            const teachingDocs_filter = filtered.filter(d => d.type === 'teaching');
            const reviewDocs_filter = filtered.filter(d => d.type !== 'teaching');
            
            document.getElementById('kbDocCount').textContent = filtered.length;
            document.getElementById('kbVersionCount').textContent = totalVersions;
            document.getElementById('kbStorageUsed').textContent = formatSize(new Blob([JSON.stringify(kb)]).size);
            
            if (filtered.length === 0) {
                list.innerHTML = '<div class="kb-empty">暂无保存的文档<br><small>上传文档时会自动保存到知识库</small></div>';
                return;
            }
            
            let html = '';
            
            if (teachingDocs_filter.length > 0) {
                html += `<div class="kb-teaching-section">
                    <div class="kb-section-title">教学标准文档 (${teachingDocs_filter.length})</div>
                    ${teachingDocs_filter.map(doc => `
                        <div class="kb-item">
                            <div>
                                <div class="kb-name">${escapeHtml(doc.name)}</div>
                                <div class="kb-meta">${doc.versions?.length || 1} 个文件 | ${formatDate(doc.updatedAt)}</div>
                            </div>
                            <div class="kb-actions">
                                <button onclick="loadTeachingFromKb('${doc.id}')">使用</button>
                                <button class="btn-danger" onclick="deleteDocFromKb('${doc.id}')">删除</button>
                            </div>
                        </div>
                    `).join('')}
                </div>`;
            }
            
            if (reviewDocs_filter.length > 0) {
                html += `<div class="kb-review-section">
                    <div class="kb-section-title">学生作业文档 (${reviewDocs_filter.length})</div>
                    ${reviewDocs_filter.map(doc => `
                        <div class="kb-item">
                            <div>
                                <div class="kb-name">${escapeHtml(doc.name)}</div>
                                <div class="kb-meta">
                                    ${doc.versions?.length || 1} 个版本 | 更新: ${formatDate(doc.updatedAt)}
                                    ${doc.versions?.length > 1 ? ` | 最新: ${doc.versions[doc.versions.length-1].score || '未评分'}` : ''}
                                </div>
                            </div>
                            <div class="kb-actions">
                                <button onclick="loadDocFromKb('${doc.id}')">加载</button>
                                <button class="btn-danger" onclick="deleteDocFromKb('${doc.id}')">删除</button>
                            </div>
                        </div>
                    `).join('')}
                </div>`;
            }
            
            list.innerHTML = html;
        }
        
        function loadTeachingFromKb(docId) {
            const kb = getKnowledgeBase();
            const doc = kb.find(d => d.id === docId);
            if (!doc) return;
            
            teachingDocs = doc.versions || [];
            saveTeachingDocs();
            renderTeachingDocsList();
            
            if (doc.summary) {
                teachingSummary = doc.summary;
                const resultDiv = document.getElementById('teaching-result');
                resultDiv.classList.remove('hidden');
                resultDiv.textContent = '已从知识库加载教学标准:\n\n' + teachingSummary;
            }
            
            alert('已加载教学文档到当前会话');
            switchTab('teaching');
        }
        
        function formatSize(bytes) {
            if (bytes < 1024) return bytes + 'B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
            return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
        }
        
        function formatDate(dateStr) {
            const d = new Date(dateStr);
            return `${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`;
        }
        
        function escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }
        
        function loadDocFromKb(docId) {
            const kb = getKnowledgeBase();
            const doc = kb.find(d => d.id === docId);
            if (!doc) return;
            
            const versions = doc.versions;
            const latest = versions[versions.length - 1];
            
            document.getElementById('docName').value = doc.name;
            document.getElementById('reviewContent').value = latest.content;
            
            const preview = document.getElementById('reviewPreview');
            if (preview) {
                if (latest.formattedContent) {
                    preview.innerHTML = '<div class="format-toggle"><button class="active" onclick="togglePreview(this, \'review\', \'formatted\')">带格式预览</button><button onclick="togglePreview(this, \'review\', \'plain\')">纯文本预览</button></div><div id="reviewFormattedContent" class="formatted-preview" style="display:block;">' + latest.formattedContent + '</div><div id="reviewPlainContent" class="formatted-preview" style="display:none;">' + escapeHtml(latest.content) + '</div>';
                    
                    const formatInfo = extractFormatInfo(latest.formattedContent);
                    let formatBadge = '<span class="format-info-badge">';
                    if (formatInfo.hasColors) {
                        formatBadge += '<span class="dot color"></span>彩色文字';
                    }
                    if (formatInfo.hasFontSizes) {
                        if (formatInfo.hasColors) formatBadge += ' ';
                        formatBadge += '<span class="dot size"></span>不同字号';
                    }
                    formatBadge += '</span>';
                    preview.insertAdjacentHTML('beforeend', formatBadge);
                } else {
                    preview.innerHTML = '';
                    preview.style.display = 'none';
                }
            }
            
            switchTab('review');
            renderVersionList();
        }
        
        function deleteDocFromKb(docId) {
            if (!confirm('确定删除此文档及其所有版本?')) return;
            let kb = getKnowledgeBase();
            kb = kb.filter(d => d.id !== docId);
            saveKnowledgeBase(kb);
            renderKnowledgeBase();
        }
        
        function confirmClearKnowledgeBase() {
            if (!confirm('确定清空知识库?此操作不可恢复!')) return;
            if (!confirm('再次确认:将删除所有保存的文档数据!')) return;
            localStorage.removeItem(STORAGE_KEYS.KNOWLEDGE_BASE);
            localStorage.removeItem(STORAGE_KEYS.TEACHING_DOCS);
            teachingDocs = [];
            teachingSummary = '';
            renderKnowledgeBase();
            renderTeachingDocsList();
            document.getElementById('teaching-result').classList.add('hidden');
        }
        
        function exportKnowledgeBase() {
            const kb = getKnowledgeBase();
            if (kb.length === 0) {
                alert('知识库为空');
                return;
            }
            
            let exportText = '# 文档审核助手 - 知识库导出\n\n';
            kb.forEach(doc => {
                exportText += `## ${doc.name}\n`;
                exportText += `创建: ${doc.createdAt}\n\n`;
                doc.versions.forEach((v, i) => {
                    exportText += `### 版本 ${i + 1} (${v.timestamp})\n`;
                    if (v.review) exportText += `**评分: ${v.score || '未评分'}**\n\n`;
                    exportText += v.content + '\n\n---\n\n';
                });
            });
            
            const blob = new Blob([exportText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `知识库导出_${new Date().toISOString().slice(0,10)}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        }
        
        function renderVersionList() {
            const kb = getKnowledgeBase();
            const docName = document.getElementById('docName').value.trim();
            
            let sameDocs = kb.filter(d => d.name === docName);
            
            if (sameDocs.length === 0) {
                document.getElementById('versionList').innerHTML = '<p style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 10px;">暂无版本历史</p>';
                document.getElementById('versionListMain').innerHTML = '';
                return;
            }
            
            const html = sameDocs.map((doc, idx) => {
                const latest = doc.versions[doc.versions.length - 1];
                return `
                    <div class="version-item" onclick="loadDocFromKb('${doc.id}')">
                        <div class="version-number">第 ${doc.versions.length} 版 ${escapeHtml(doc.name)}</div>
                        <div class="version-date">${formatDate(doc.updatedAt)}</div>
                        <div class="version-score">评分: ${latest.score || '未评分'}</div>
                    </div>
                `;
            }).join('');
            
            document.getElementById('versionList').innerHTML = html;
            document.getElementById('versionListMain').innerHTML = html;
        }
        
        function saveToKnowledgeBase(docName, content, review, score) {
            let kb = getKnowledgeBase();
            
            const preview = document.getElementById('reviewPreview');
            let formattedContent = null;
            if (preview) {
                const formattedDiv = preview.querySelector('.formatted-preview:not([style*="display: none"])');
                if (formattedDiv && formattedDiv.innerHTML) {
                    formattedContent = formattedDiv.innerHTML;
                }
            }
            
            const existingIndex = kb.findIndex(d => d.name === docName);
            
            if (existingIndex >= 0) {
                const doc = kb[existingIndex];
                doc.versions.push({
                    content: content.substring(0, 50000),
                    formattedContent: formattedContent ? formattedContent.substring(0, 100000) : null,
                    review: review ? review.substring(0, 5000) : null,
                    score: score,
                    timestamp: new Date().toISOString()
                });
                
                if (doc.versions.length > KB_MAX_VERSIONS) {
                    doc.versions = doc.versions.slice(-KB_MAX_VERSIONS);
                }
                
                doc.updatedAt = new Date().toISOString();
                kb[existingIndex] = doc;
            } else {
                if (kb.length >= KB_MAX_DOCS) {
                    kb.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                    kb.pop();
                }
                
                kb.push({
                    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
                    name: docName,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    versions: [{
                        content: content.substring(0, 50000),
                        formattedContent: formattedContent ? formattedContent.substring(0, 100000) : null,
                        review: review ? review.substring(0, 5000) : null,
                        score: score,
                        timestamp: new Date().toISOString()
                    }]
                });
            }
            
            saveKnowledgeBase(kb);
        }
        
