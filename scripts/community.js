        let communityClient = null;
        
        function initCommunity() {
            try {
                if (typeof window.supabase === 'undefined') {
                    document.getElementById('communityStatus').innerHTML = '正在加载...';
                    setTimeout(initCommunity, 500);
                    return;
                }
                communityClient = window.supabase.createClient(DEFAULT_URL, DEFAULT_KEY);
                localStorage.setItem('sbUrl', DEFAULT_URL);
                localStorage.setItem('sbKey', DEFAULT_KEY);
                document.getElementById('communityStatus').innerHTML = '<span style="color: var(--accent);">已连接</span>';
                loadCommunityDocs();
            } catch (e) {
                document.getElementById('communityStatus').innerHTML = '<span style="color: var(--accent-light);">连接失败: ' + e.message + '</span><br><button onclick="initCommunity()" style="margin-top:10px;padding:6px 12px;background:var(--accent);color:white;border:none;border-radius:4px;cursor:pointer;">重试</button>';
            }
        }
        
        const DEFAULT_URL = 'https://jvpigxbiwmwvxiawcjml.supabase.co';
        const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2cGlneGJpd213dnhpYXdjam1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0OTg5MzksImV4cCI6MjA5MDA3NDkzOX0._HuO96XxWQAyyMlVDdwst-1bxYzWW0lT2827SvGn_8w';
        const COMMUNITY_STORAGE_KEYS = {
            OWNED_DOC_IDS: 'communityOwnedDocIds',
            LAST_AUTHOR: 'communityLastAuthor'
        };
        const COMMUNITY_DELETE_PASSWORD_HASH = '6f54f53188d3a33cb7ba279e668109925bb780886328b53c9f6c8dece6ab3899';
        
        function getOwnedCommunityDocIds() {
            try {
                const saved = JSON.parse(localStorage.getItem(COMMUNITY_STORAGE_KEYS.OWNED_DOC_IDS) || '[]');
                if (!Array.isArray(saved)) return [];
                return saved.map(id => String(id));
            } catch (e) {
                return [];
            }
        }
        
        function saveOwnedCommunityDocIds(ids) {
            const uniqueIds = [...new Set(ids.map(id => String(id)))];
            localStorage.setItem(COMMUNITY_STORAGE_KEYS.OWNED_DOC_IDS, JSON.stringify(uniqueIds));
        }
        
        function markCommunityDocAsOwned(id) {
            const ownedIds = getOwnedCommunityDocIds();
            ownedIds.push(String(id));
            saveOwnedCommunityDocIds(ownedIds);
        }
        
        function unmarkCommunityDocAsOwned(id) {
            const targetId = String(id);
            const ownedIds = getOwnedCommunityDocIds().filter(item => item !== targetId);
            saveOwnedCommunityDocIds(ownedIds);
        }
        
        function isOwnCommunityDoc(id) {
            return getOwnedCommunityDocIds().includes(String(id));
        }

        async function sha256Text(text) {
            if (!window.crypto || !window.crypto.subtle) {
                throw new Error('当前浏览器不支持密码校验');
            }
            const data = new TextEncoder().encode(text);
            const digest = await window.crypto.subtle.digest('SHA-256', data);
            return Array.from(new Uint8Array(digest))
                .map(byte => byte.toString(16).padStart(2, '0'))
                .join('');
        }

        async function verifyCommunityDeletePermission(id) {
            if (isOwnCommunityDoc(id)) {
                return { granted: true, isOwnDoc: true };
            }

            const passwordInput = prompt('这不是你上传的内容，请输入删除密码：');
            if (passwordInput === null) {
                return { granted: false, isOwnDoc: false };
            }

            const passwordHash = await sha256Text(passwordInput.trim());
            if (passwordHash !== COMMUNITY_DELETE_PASSWORD_HASH) {
                alert('密码错误，不能删除他人上传的内容');
                return { granted: false, isOwnDoc: false };
            }

            return { granted: true, isOwnDoc: false };
        }
        
        async function sha256Text(text) {
            if (!window.crypto || !window.crypto.subtle) {
                throw new Error('\u5f53\u524d\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u5bc6\u7801\u6821\u9a8c');
            }
            const data = new TextEncoder().encode(text);
            const digest = await window.crypto.subtle.digest('SHA-256', data);
            return Array.from(new Uint8Array(digest))
                .map(byte => byte.toString(16).padStart(2, '0'))
                .join('');
        }

        async function verifyCommunityDeletePermission(id) {
            if (isOwnCommunityDoc(id)) {
                return { granted: true, isOwnDoc: true };
            }

            const passwordInput = prompt('\u8fd9\u4e0d\u662f\u4f60\u4e0a\u4f20\u7684\u5185\u5bb9\uff0c\u8bf7\u8f93\u5165\u5220\u9664\u5bc6\u7801\uff1a');
            if (passwordInput === null) {
                return { granted: false, isOwnDoc: false };
            }

            const passwordHash = await sha256Text(passwordInput.trim());
            if (passwordHash !== COMMUNITY_DELETE_PASSWORD_HASH) {
                alert('\u5bc6\u7801\u9519\u8bef\uff0c\u4e0d\u80fd\u5220\u9664\u4ed6\u4eba\u4e0a\u4f20\u7684\u5185\u5bb9');
                return { granted: false, isOwnDoc: false };
            }

            return { granted: true, isOwnDoc: false };
        }

        function autoConnect() {
            initCommunity();
        }
        
        async function loadCommunityDocs() {
            if (!communityClient) {
                const savedUrl = localStorage.getItem('sbUrl');
                const savedKey = localStorage.getItem('sbKey');
                if (savedUrl && savedKey) {
                    try {
                        communityClient = window.supabase.createClient(savedUrl, savedKey);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
            
            if (!communityClient) {
                document.getElementById('communityDocs').innerHTML = '<div class="empty-community">正在连接...<br><button onclick="initCommunity()">点击重试</button></div>';
                return;
            }
            
            const container = document.getElementById('communityDocs');
            container.innerHTML = '<div class="empty-community">加载中...</div>';
            
            const { data, error } = await communityClient
                .from('community_docs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(30);
            
            if (error) {
                console.error(error);
                container.innerHTML = '<div class="empty-community">加载失败: ' + (error.message || '未知错误') + '</div>';
                return;
            }
            
            if (!data || data.length === 0) {
                container.innerHTML = '<div class="empty-community">暂无文档，成为第一个分享者</div>';
                return;
            }
            
            const filteredData = currentCategoryFilter === 'all' 
                ? data 
                : data.filter(doc => {
                    const isTeaching = doc.title && (doc.title.startsWith('[教学文档]') || doc.title.startsWith('[教学标准]'));
                    return currentCategoryFilter === 'teaching' ? isTeaching : !isTeaching;
                });
            
            if (filteredData.length === 0) {
                container.innerHTML = '<div class="empty-community">该分类下暂无文档</div>';
                return;
            }
            
            container.innerHTML = filteredData.map(doc => {
                const isTeaching = doc.title && (doc.title.startsWith('[教学文档]') || doc.title.startsWith('[教学标准]'));
                const categoryLabel = isTeaching ? '教学文档' : '审核文档';
                const titleEscaped = (doc.title || '').replace(/'/g, "\\'").replace(/`/g, "\\`");
                return `
                <div class="community-doc" style="${isTeaching ? 'border-left: 3px solid var(--accent);' : 'border-left: 3px solid var(--accent-light);'}">
                    <div class="community-doc-title">
                        <span style="background: ${isTeaching ? 'var(--accent)' : 'var(--accent-light)'}; color: white; font-size: 10px; padding: 2px 6px; border-radius: 3px; margin-right: 6px;">${categoryLabel}</span>
                        ${escapeHtml(doc.title)}
                    </div>
                    <div class="community-doc-meta">上传者: ${escapeHtml(doc.author || '匿名')} | ${formatDate(doc.created_at)}</div>
                    <div class="community-doc-content">${escapeHtml(doc.content?.substring(0, 150) || '')}${doc.content?.length > 150 ? '...' : ''}</div>
                    <div class="community-doc-actions">
                        <button onclick="openCommunityDocFullscreen('${doc.id}')">全屏阅读</button>
                        <button onclick="useCommunityDoc('${doc.id}')">用作教学标准</button>
                        <button onclick="viewCommunityDoc('${doc.id}')">查看详情</button>
                        <button onclick="deleteCommunityDoc(${doc.id})">删除</button>
                    </div>
                </div>
            `}).join('');
        }
        
        function filterCategory(category) {
            currentCategoryFilter = category;
            
            document.getElementById('filterAll').style.background = category === 'all' ? 'var(--accent)' : 'var(--white)';
            document.getElementById('filterAll').style.color = category === 'all' ? 'white' : 'var(--text-secondary)';
            document.getElementById('filterTeaching').style.background = category === 'teaching' ? 'var(--accent)' : 'var(--white)';
            document.getElementById('filterTeaching').style.color = category === 'teaching' ? 'white' : 'var(--text-secondary)';
            document.getElementById('filterReview').style.background = category === 'review' ? 'var(--accent)' : 'var(--white)';
            document.getElementById('filterReview').style.color = category === 'review' ? 'white' : 'var(--text-secondary)';
            
            loadCommunityDocs();
        }
        
        let currentDocId = null;
        
        function viewCommunityDoc(id) {
            if (!communityClient) return;
            currentDocId = id;
            communityClient.from('community_docs').select('*').eq('id', id).then(({ data }) => {
                if (data && data[0]) {
                    const doc = data[0];
                    document.getElementById('modalTitle').textContent = doc.title;
                    
                    const modalContent = document.getElementById('modalContent');
                    if (doc.formatted_content) {
                        modalContent.innerHTML = doc.formatted_content;
                    } else {
                        modalContent.textContent = doc.content || '无';
                    }
                    
                    document.getElementById('docModal').style.display = 'flex';
                    loadDocComments(id);
                }
            });
        }
        
        async function loadDocComments(docId) {
            if (!communityClient) return;
            
            const container = document.getElementById('docComments');
            
            try {
                const { data, error } = await communityClient
                    .from('doc_comments')
                    .select('*')
                    .eq('doc_id', docId)
                    .order('created_at', { ascending: false });
                
                if (error || !data || data.length === 0) {
                    container.innerHTML = '<p style="color: var(--text-muted); font-size: 12px;">暂无评论</p>';
                    return;
                }
                
                container.innerHTML = data.map(comment => `
                    <div style="background: var(--bg-secondary); padding: 10px; border-radius: 6px; margin-bottom: 8px; position: relative;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <div style="font-size: 11px; color: var(--accent); margin-bottom: 4px;">${escapeHtml(comment.author || '匿名')} | ${formatDate(comment.created_at)}</div>
                                <div style="font-size: 13px; color: var(--text-primary);">${escapeHtml(comment.content)}</div>
                            </div>
                            <button onclick="deleteComment(${comment.id})" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 12px; padding: 2px 6px;">删除</button>
                        </div>
                    </div>
                `).join('');
            } catch (e) {
                container.innerHTML = '<p style="color: var(--text-muted); font-size: 12px;">加载评论失败</p>';
            }
        }
        
        async function deleteComment(commentId) {
            if (!confirm('确定删除这条评论？')) return;
            
            try {
                const { error } = await communityClient
                    .from('doc_comments')
                    .delete()
                    .eq('id', commentId);
                
                if (error) {
                    alert('删除失败: ' + error.message);
                } else {
                    loadDocComments(currentDocId);
                }
            } catch (e) {
                alert('删除失败: ' + e.message);
            }
        }
        
        async function submitDocComment() {
            if (!communityClient || !currentDocId) return;
            
            const content = document.getElementById('docCommentInput').value.trim();
            const author = document.getElementById('docCommentAuthor').value.trim() || '匿名';
            
            if (!content) {
                alert('请输入评论内容');
                return;
            }
            
            try {
                const { error } = await communityClient.from('doc_comments').insert({
                    doc_id: currentDocId,
                    content: content,
                    author: author,
                    created_at: new Date().toISOString()
                });
                
                if (error) {
                    alert('评论失败: ' + error.message);
                } else {
                    document.getElementById('docCommentInput').value = '';
                    loadDocComments(currentDocId);
                }
            } catch (e) {
                alert('评论失败: ' + e.message);
            }
        }
        
        async function deleteCommunityDoc(id) {
            if (!confirm('确定删除这篇文档?')) return;
            
            try {
                const response = await fetch(`${DEFAULT_URL}/rest/v1/community_docs?id=eq.${id}`, {
                    method: 'DELETE',
                    headers: {
                        'apikey': DEFAULT_KEY,
                        'Authorization': 'Bearer ' + DEFAULT_KEY,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok || response.status === 204) {
                    alert('已删除');
                    loadCommunityDocs();
                } else {
                    const err = await response.text();
                    alert('删除失败: ' + err);
                }
            } catch (e) {
                alert('删除失败: ' + e.message);
            }
        }
        
        function uploadToCommunity() {
            initCommunity();
            setTimeout(() => {
                doUpload();
            }, 1000);
        }
        
        let currentFullscreenDoc = null;
        let textAnnotations = [];
        let currentFontSize = 16;
        let selectedTextInfo = null;
        
        async function loadAnnotationsFromSupabase(docId) {
            if (!communityClient) {
                const savedUrl = localStorage.getItem('sbUrl') || DEFAULT_URL;
                const savedKey = localStorage.getItem('sbKey') || DEFAULT_KEY;
                try {
                    communityClient = window.supabase.createClient(savedUrl, savedKey);
                } catch (e) {
                    console.error('连接失败');
                    textAnnotations = [];
                    return;
                }
            }
            
            try {
                const { data, error } = await communityClient
                    .from('doc_annotations')
                    .select('*')
                    .eq('doc_id', docId);
                
                if (error) {
                    console.error('加载批注失败:', error);
                    textAnnotations = [];
                    return;
                }
                
                if (data && data.length > 0) {
                    textAnnotations = data.map(item => {
                        let comments = item.comments;
                        if (typeof comments === 'string') {
                            try {
                                comments = JSON.parse(comments);
                            } catch (e) {
                                comments = [];
                            }
                        }
                        if (!Array.isArray(comments)) {
                            comments = [];
                        }
                        return {
                            text: item.marked_text,
                            comments: comments,
                            id: item.id
                        };
                    });
                    console.log('从Supabase加载的批注:', textAnnotations);
                } else {
                    textAnnotations = [];
                }
            } catch (e) {
                console.error('加载批注失败:', e);
                textAnnotations = [];
            }
        }
        
        async function saveAnnotationToSupabase(ann, docId) {
            if (!communityClient) return;
            
            try {
                const existing = await communityClient
                    .from('doc_annotations')
                    .select('id')
                    .eq('doc_id', docId)
                    .eq('marked_text', ann.text)
                    .single();
                
                if (existing.data) {
                    await communityClient
                        .from('doc_annotations')
                        .update({
                            comments: ann.comments,
                            updated_at: new Date().toISOString()
                        })
                        .eq('id', existing.data.id);
                } else {
                    await communityClient
                        .from('doc_annotations')
                        .insert({
                            doc_id: docId,
                            marked_text: ann.text,
                            comments: ann.comments
                        });
                }
            } catch (e) {
                console.error('保存批注失败:', e);
            }
        }
        
        async function deleteAnnotationFromSupabase(docId, text) {
            if (!communityClient) return;
            
            try {
                await communityClient
                    .from('doc_annotations')
                    .delete()
                    .eq('doc_id', docId)
                    .eq('marked_text', text);
            } catch (e) {
                console.error('删除批注失败:', e);
            }
        }
        
        function renderFullscreenContent() {
            if (!currentFullscreenDoc) return;
            
            const originalText = currentFullscreenDoc.content;
            const formattedContent = currentFullscreenDoc.formattedContent;
            
            if (textAnnotations.length === 0) {
                if (formattedContent) {
                    document.getElementById('fullscreenContent').innerHTML = formattedContent;
                } else {
                    document.getElementById('fullscreenContent').innerHTML = escapeHtml(originalText);
                }
                return;
            }
            
            console.log('开始渲染批注，批注列表:', textAnnotations);
            const allRanges = [];
            
            let markId = 1;
            textAnnotations.forEach((ann, annIndex) => {
                if (!ann.text) {
                    return;
                }
                
                let searchFrom = 0;
                while (true) {
                    const pos = originalText.indexOf(ann.text, searchFrom);
                    if (pos === -1) break;
                    
                    allRanges.push({
                        start: pos,
                        end: pos + ann.text.length,
                        annIndex: annIndex,
                        markId: markId++
                    });
                    searchFrom = pos + 1;
                }
            });
            
            console.log('找到的匹配数量:', allRanges.length);
            console.log('匹配详情:', allRanges);
            
            if (allRanges.length === 0) {
                console.warn('批注文本在文档中未找到匹配');
                if (formattedContent) {
                    document.getElementById('fullscreenContent').innerHTML = formattedContent;
                } else {
                    document.getElementById('fullscreenContent').innerHTML = escapeHtml(originalText);
                }
                return;
            }
            
            allRanges.sort((a, b) => a.start - b.start);
            
            if (formattedContent) {
                let html = formattedContent;
                
                allRanges.forEach((range, idx) => {
                    const ann = textAnnotations[range.annIndex];
                    const markId = range.markId;
                    
                    html = html.replace(
                        new RegExp(escapeRegExp(ann.text), 'g'),
                        `<span class="text-mark" data-mark-id="${markId}" data-ann-index="${range.annIndex}" onclick="showMarkPopup(${range.annIndex}, ${markId})">${ann.text}</span>`
                    );
                });
                
                const contentDiv = document.getElementById('fullscreenContent');
                contentDiv.innerHTML = html;
                contentDiv.style.fontSize = currentFontSize + 'px';
                
                const markCount = contentDiv.querySelectorAll('.text-mark').length;
                console.log('渲染完成，共生成', markCount, '个批注标记');
            } else {
                let parts = [];
                let processedEnd = 0;
                
                for (let i = 0; i < allRanges.length; i++) {
                    const range = allRanges[i];
                    const prevRange = allRanges[i - 1];
                    
                    if (prevRange && range.start === prevRange.start && range.end === prevRange.end) {
                        parts.push({ type: 'mark', content: textAnnotations[range.annIndex].text, annIndex: range.annIndex, markId: range.markId });
                        processedEnd = Math.max(processedEnd, range.end);
                        continue;
                    }
                    
                    if (range.start > processedEnd) {
                        parts.push({ type: 'text', content: originalText.slice(processedEnd, range.start) });
                    }
                    
                    parts.push({ type: 'mark', content: textAnnotations[range.annIndex].text, annIndex: range.annIndex, markId: range.markId });
                    processedEnd = range.end;
                }
                
                if (processedEnd < originalText.length) {
                    parts.push({ type: 'text', content: originalText.slice(processedEnd) });
                }
                
                let html = '';
                for (const part of parts) {
                    if (part.type === 'text') {
                        html += escapeHtml(part.content);
                    } else {
                        html += `<span class="text-mark" data-mark-id="${part.markId}" data-ann-index="${part.annIndex}" onclick="showMarkPopup(${part.annIndex}, ${part.markId})">${escapeHtml(part.content)}</span>`;
                    }
                }
                
                const contentDiv = document.getElementById('fullscreenContent');
                contentDiv.innerHTML = html;
                contentDiv.style.fontSize = currentFontSize + 'px';
                
                const markCount = contentDiv.querySelectorAll('.text-mark').length;
                console.log('渲染完成，共生成', markCount, '个批注标记');
            }
        }
        
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        
        function handleTextSelection() {
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();
            
            if (selectedText.length > 0 && selectedText.length < 500) {
                selectedTextInfo = {
                    text: selectedText,
                    range: selection.getRangeAt(0)
                };
            } else {
                selectedTextInfo = null;
            }
        }
        
        function addTextAnnotation() {
            if (!selectedTextInfo) {
                alert('请先选中要批注的文字');
                return;
            }
            
            const comment = prompt('为"' + selectedTextInfo.text.substring(0, 20) + '..."添加批注：', '');
            if (!comment) return;
            
            const newAnnotation = {
                text: selectedTextInfo.text,
                comments: [{
                    content: comment,
                    author: '读者',
                    time: new Date().toISOString()
                }]
            };
            
            textAnnotations.push(newAnnotation);
            
            saveAnnotations();
            renderFullscreenContent();
            renderAnnotations();
            
            if (currentDocId) {
                saveAnnotationToSupabase(newAnnotation, currentDocId);
            }
            
            window.getSelection().removeAllRanges();
            selectedTextInfo = null;
        }
        
        function showMarkPopup(index, markId) {
            const existing = document.querySelector('.mark-popup');
            if (existing) existing.remove();
            
            const ann = textAnnotations[index];
            if (!ann || !ann.comments || ann.comments.length === 0) {
                alert('批注内容为空');
                return;
            }
            
            const popup = document.createElement('div');
            popup.className = 'mark-popup';
            popup.innerHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                    <span style="font-size:10px;color:var(--text-muted);">批注</span>
                    <div>
                        <button onclick="deleteTextAnnotation(${index})" style="background:none;border:none;color:#c00;cursor:pointer;font-size:11px;margin-right:4px;">删除</button>
                        <button onclick="this.closest('.mark-popup').remove()" style="background:none;border:none;cursor:pointer;font-size:16px;color:var(--text-muted);">×</button>
                    </div>
                </div>
                <div class="comment-list">
                    ${ann.comments.map((c, i) => `
                        <div class="comment-item">
                            <div class="author">${escapeHtml(c.author || '未知')} · ${new Date(c.time).toLocaleDateString('zh-CN')}</div>
                            <div class="content">${escapeHtml(c.content || '')}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="comment-input">
                    <input type="text" placeholder="添加回复..." onkeypress="if(event.key==='Enter'){addReply(${index}, this.value);this.value='';}">
                    <button onclick="addReply(${index}, this.previousElementSibling.value);this.previousElementSibling.value='';">发送</button>
                </div>
            `;
            
            document.body.appendChild(popup);
            
            const mark = markId !== undefined ? document.querySelector(`.text-mark[data-mark-id="${markId}"]`) : document.querySelectorAll('.text-mark')[index];
            if (mark) {
                const rect = mark.getBoundingClientRect();
                let left = rect.right + 10;
                if (left + 280 > window.innerWidth) {
                    left = rect.left - 290;
                }
                popup.style.left = Math.max(10, left) + 'px';
                popup.style.top = Math.max(10, rect.top - 20) + 'px';
            } else {
                popup.style.left = '100px';
                popup.style.top = '100px';
            }
        }
        
        function deleteTextAnnotation(index) {
            if (!confirm('确定删除此批注？')) return;
            const deletedText = textAnnotations[index].text;
            textAnnotations.splice(index, 1);
            saveAnnotations();
            renderFullscreenContent();
            renderAnnotations();
            document.querySelectorAll('.mark-popup').forEach(p => p.remove());
            
            if (currentDocId) {
                deleteAnnotationFromSupabase(currentDocId, deletedText);
            }
        }
        
        function addReply(index, content) {
            if (!content.trim()) return;
            
            textAnnotations[index].comments.push({
                content: content,
                author: '读者',
                time: new Date().toISOString()
            });
            
            saveAnnotations();
            document.querySelectorAll('.mark-popup').forEach(p => p.remove());
            renderFullscreenContent();
            renderAnnotations();
            
            if (currentDocId) {
                saveAnnotationToSupabase(textAnnotations[index], currentDocId);
            }
        }
        
        function saveAnnotations() {
            if (currentFullscreenDoc) {
                const key = currentFullscreenDoc.id 
                    ? 'textAnnotations_' + currentFullscreenDoc.id 
                    : 'textAnnotations_' + currentFullscreenDoc.title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_');
                localStorage.setItem(key, JSON.stringify(textAnnotations));
            }
        }
        
        function renderAnnotations() {
            const list = document.getElementById('annotationList');
            if (textAnnotations.length === 0) {
                list.innerHTML = '<p style="color: var(--text-muted); font-size: 12px;">选中文字后点击"添加批注"按钮添加段评</p>';
                return;
            }
            
            list.innerHTML = textAnnotations.map((ann, i) => {
                const firstComment = ann.comments && ann.comments[0] ? ann.comments[0] : { author: '未知', time: new Date().toISOString() };
                return `
                <div class="annotation-item" onclick="jumpToAnnotation(${i})">
                    <div class="author">${escapeHtml(firstComment.author || '未知')} · ${new Date(firstComment.time).toLocaleString('zh-CN')}</div>
                    <div class="content">"${escapeHtml((ann.text || '').substring(0, 30))}${(ann.text || '').length > 30 ? '...' : ''}"</div>
                    <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">${(ann.comments || []).length}条回复</div>
                </div>
            `}).join('');
        }
        
        function jumpToAnnotation(index) {
            const marks = document.querySelectorAll(`.text-mark[data-ann-index="${index}"]`);
            if (marks.length > 0) {
                const firstMark = marks[0];
                firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstMark.classList.add('mark-highlight');
                setTimeout(() => firstMark.classList.remove('mark-highlight'), 1500);
                showMarkPopup(index, parseInt(firstMark.dataset.markId));
            } else {
                showMarkPopup(index);
            }
        }
        
        function toggleFullscreen() {
            document.getElementById('fullscreenViewer').classList.add('hidden');
            document.querySelectorAll('.mark-popup').forEach(p => p.remove());
        }
        
        function adjustFontSize(delta) {
            currentFontSize = Math.max(12, Math.min(36, currentFontSize + delta));
            document.getElementById('fullscreenContent').style.fontSize = currentFontSize + 'px';
            localStorage.setItem('readerFontSize', currentFontSize);
        }
        
        function openCurrentDocFullscreen() {
            const plainContent = document.getElementById('reviewContent').value;
            const title = document.getElementById('docName').value.trim() || '未命名文档';
            
            if (!plainContent.trim()) {
                alert('请先输入文档内容');
                return;
            }
            
            const preview = document.getElementById('reviewPreview');
            let formattedContent = null;
            
            if (preview) {
                const formattedDiv = preview.querySelector('.formatted-preview:not([style*="display: none"])');
                if (formattedDiv && formattedDiv.innerHTML) {
                    formattedContent = formattedDiv.innerHTML;
                }
            }
            
            openInFullscreen(title, plainContent, null, formattedContent);
        }
        
        async function openInFullscreen(title, content, docId = null, formattedContent = null) {
            currentFullscreenDoc = { title, content, id: docId, formattedContent };
            currentDocId = docId;
            currentFontSize = parseInt(localStorage.getItem('readerFontSize') || '18');
            
            if (docId) {
                await loadAnnotationsFromSupabase(docId);
            } else {
                textAnnotations = JSON.parse(localStorage.getItem('textAnnotations_' + title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')) || '[]');
            }
            
            document.getElementById('fullscreenTitle').textContent = title;
            document.getElementById('fullscreenViewer').classList.remove('hidden');
            
            const formatIndicator = document.getElementById('formatIndicator');
            if (formatIndicator) {
                if (formattedContent) {
                    formatIndicator.style.display = 'inline';
                } else {
                    formatIndicator.style.display = 'none';
                }
            }
            
            renderFullscreenContent();
            renderAnnotations();
        }
        
        function doUpload() {
            if (!communityClient) {
                alert('连接Supabase失败，请刷新重试');
                return;
            }
            let content = document.getElementById('reviewContent').value;
            let formattedContent = null;
            
            const preview = document.getElementById('reviewPreview');
            if (preview) {
                const formattedDiv = preview.querySelector('.formatted-preview:not([style*="display: none"])');
                if (formattedDiv && formattedDiv.innerHTML) {
                    formattedContent = formattedDiv.innerHTML;
                }
            }
            
            const title = document.getElementById('docName').value.trim() || '未命名';
            const author = prompt('你的名字:', '匿名') || '匿名';
            
            const categoryLabel = prompt('请输入文档分类（输入"教学"或"审核"）:', '审核');
            if (!categoryLabel) return;
            const category = categoryLabel.includes('教学') ? '教学文档' : '审核文档';
            
            if (!content.trim()) {
                alert('请先审核文档');
                return;
            }
            
            const gradingKeywords = ['评分标准', '文献考据', '义理分析', '结构逻辑', '学术规范', '3分标准', '2分标准', '1-0分标准', '扣2分', '扣4分', '总分10'];
            const hasGradingContent = gradingKeywords.some(keyword => content.includes(keyword));
            
            if (hasGradingContent) {
                const lines = content.split('\n');
                let cleanLines = [];
                let foundGradingSection = false;
                
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.includes('评分标准') && i < 5) {
                        foundGradingSection = true;
                        continue;
                    }
                    if (foundGradingSection && (line.includes('前言与适用范围') || line.includes('评分标准框架总述'))) {
                        continue;
                    }
                    if (line.includes('前言与适用范围') || line.includes('评分标准框架总述')) {
                        continue;
                    }
                    cleanLines.push(line);
                }
                
                content = cleanLines.join('\n').trim();
                
                if (!content) {
                    alert('无法提取审核文档内容，仅包含评分标准');
                    return;
                }
            }
            
            const insertData = {
                title: `[${category}] ` + title,
                content: content,
                review_result: '',
                author: author
            };
            
            if (formattedContent) {
                insertData.formatted_content = formattedContent;
            }
            
            communityClient.from('community_docs').insert(insertData).then(({ error }) => {
                if (error) {
                    alert('上传失败: ' + error.message);
                } else {
                    alert('上传成功!' + (formattedContent ? ' (格式信息已保留)' : ''));
                    loadCommunityDocs();
                }
            });
        }
        
        function useCommunityDoc(id) {
            if (!communityClient) return;
            communityClient.from('community_docs').select('*').eq('id', id).then(({ data }) => {
                if (data && data[0]) {
                    const doc = data[0];
                    const isTeaching = doc.title && (doc.title.startsWith('[教学文档]') || doc.title.startsWith('[教学标准]'));
                    
                    if (isTeaching) {
                        teachingSummary = doc.review_result || doc.content;
                        if (doc.content) {
                            const combinedContent = doc.content;
                            teachingDocs = [];
                            const nameMatch = combinedContent.match(/【([^】]+)】/g);
                            const parts = combinedContent.split(/【[^】]+】\n/);
                            if (nameMatch && nameMatch.length > 0) {
                                parts.slice(1).forEach((part, i) => {
                                    if (nameMatch[i]) {
                                        teachingDocs.push({
                                            name: nameMatch[i].replace(/【|】/g, ''),
                                            content: part,
                                            formattedContent: null,
                                            size: new Blob([part]).size,
                                            addedAt: new Date().toISOString()
                                        });
                                    }
                                });
                            }
                            if (teachingDocs.length === 0) {
                                const cleanTitle = doc.title.replace(/^\[教学文档\] /, '').replace(/^\[审核文档\] /, '').replace(/^\[教学标准\] /, '');
                                teachingDocs.push({
                                    name: cleanTitle,
                                    content: doc.content,
                                    formattedContent: doc.formatted_content || null,
                                    size: new Blob([doc.content]).size,
                                    addedAt: new Date().toISOString()
                                });
                            }
                            saveTeachingDocs();
                            renderTeachingDocsList();
                        }
                        document.getElementById('teaching-result').textContent = teachingSummary;
                        document.getElementById('teaching-result').classList.remove('hidden');
                        alert('已设为教学标准!' + (doc.formatted_content ? ' (格式信息已保留)' : ''));
                        switchTab('teaching');
                    } else {
                        document.getElementById('docName').value = doc.title.replace(/^\[审核文档\] /, '').replace(/^\[教学文档\] /, '').replace(/^\[教学标准\] /, '');
                        document.getElementById('reviewContent').value = doc.content || '';
                        
                        const preview = document.getElementById('reviewPreview');
                        if (preview && doc.formatted_content) {
                            preview.innerHTML = '<div class="format-toggle"><button class="active" onclick="togglePreview(this, \'review\', \'formatted\')">带格式预览</button><button onclick="togglePreview(this, \'review\', \'plain\')">纯文本预览</button></div><div id="reviewFormattedContent" class="formatted-preview" style="display:block;">' + doc.formatted_content + '</div><div id="reviewPlainContent" class="formatted-preview" style="display:none;">' + escapeHtml(doc.content) + '</div>';
                            
                            const formatInfo = extractFormatInfo(doc.formatted_content);
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
                        }
                        
                        alert('已加载到审核区域!' + (doc.formatted_content ? ' (格式信息已保留)' : ''));
                        switchTab('review');
                    }
                }
            });
        }
        
        async function openCommunityDocFullscreen(id) {
            if (!communityClient) {
                alert('正在连接社区，请稍后重试');
                return;
            }
            
            try {
                const { data, error } = await communityClient
                    .from('community_docs')
                    .select('*')
                    .eq('id', id);
                
                if (error) {
                    alert('加载文档失败: ' + error.message);
                    return;
                }
                
                if (!data || !data[0]) {
                    alert('文档不存在或已删除');
                    return;
                }
                
                const doc = data[0];
                const title = (doc.title || '未命名文档').replace(/^\[审核文档\] /, '').replace(/^\[教学文档\] /, '').replace(/^\[教学标准\] /, '');
                const content = doc.content || '';
                const formattedContent = doc.formatted_content || null;
                
                document.getElementById('fullscreenTitle').textContent = title;
                document.getElementById('fullscreenViewer').classList.remove('hidden');
                
                currentFullscreenDoc = { title, content, id: doc.id, formattedContent };
                currentDocId = doc.id;
                currentFontSize = parseInt(localStorage.getItem('readerFontSize') || '18');
                
                const localAnnotations = JSON.parse(localStorage.getItem('textAnnotations_' + doc.id) || '[]');
                textAnnotations = [];
                
                await loadAnnotationsFromSupabase(doc.id);
                
                console.log('批注加载完成，当前批注数:', textAnnotations.length);
                console.log('批注内容:', textAnnotations);
                
                const localMap = new Map();
                localAnnotations.forEach(a => localMap.set(a.text, a));
                
                textAnnotations.forEach(a => {
                    if (a.id) {
                        const localAnn = localMap.get(a.text);
                        if (localAnn && localAnn.comments) {
                            const existingIds = new Set((a.comments || []).map(c => c.id));
                            (localAnn.comments || []).forEach(c => {
                                if (!c.id || !existingIds.has(c.id)) {
                                    if (!a.comments) a.comments = [];
                                    a.comments.push(c);
                                }
                            });
                            localMap.delete(a.text);
                        }
                    }
                });
                
                localMap.forEach(a => textAnnotations.push(a));
                
                console.log('批注合并完成，最终批注数:', textAnnotations.length);
                console.log('最终批注列表:', textAnnotations);
                
                renderFullscreenContent();
                renderAnnotations();
            } catch (e) {
                console.error('加载文档失败:', e);
                alert('加载文档失败: ' + e.message);
            }
        }
        
        function loadCommunityDocs() {
            if (!communityClient) {
                const savedUrl = localStorage.getItem('sbUrl');
                const savedKey = localStorage.getItem('sbKey');
                if (savedUrl && savedKey) {
                    try {
                        communityClient = window.supabase.createClient(savedUrl, savedKey);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
            
            const container = document.getElementById('communityDocs');
            if (!container) return;
            
            if (!communityClient) {
                container.innerHTML = '<div class="empty-community">正在连接...<br><button onclick="initCommunity()">点击重试</button></div>';
                return;
            }
            
            container.innerHTML = '<div class="empty-community">加载中...</div>';
            
            communityClient
                .from('community_docs')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(30)
                .then(({ data, error }) => {
                    if (error) {
                        console.error(error);
                        container.innerHTML = '<div class="empty-community">加载失败: ' + (error.message || '未知错误') + '</div>';
                        return;
                    }
                    
                    if (!data || data.length === 0) {
                        container.innerHTML = '<div class="empty-community">暂无文档，成为第一个分享者</div>';
                        return;
                    }
                    
                    const filteredData = currentCategoryFilter === 'all'
                        ? data
                        : data.filter(doc => {
                            const isTeaching = doc.title && (doc.title.startsWith('[教学文档]') || doc.title.startsWith('[教学标准]'));
                            return currentCategoryFilter === 'teaching' ? isTeaching : !isTeaching;
                        });
                    
                    if (filteredData.length === 0) {
                        container.innerHTML = '<div class="empty-community">该分类下暂无文档</div>';
                        return;
                    }
                    
                    container.innerHTML = filteredData.map(doc => {
                        const isTeaching = doc.title && (doc.title.startsWith('[教学文档]') || doc.title.startsWith('[教学标准]'));
                        const categoryLabel = isTeaching ? '教学文档' : '审核文档';
                        const deleteAction = isOwnCommunityDoc(doc.id)
                            ? `<button onclick="deleteCommunityDoc('${doc.id}')">删除</button>`
                            : '<button disabled style="opacity: 0.55; cursor: not-allowed;" title="只能删除自己上传的文档">仅上传者可删</button>';
                        
                        return `
                <div class="community-doc" style="${isTeaching ? 'border-left: 3px solid var(--accent);' : 'border-left: 3px solid var(--accent-light);'}">
                    <div class="community-doc-title">
                        <span style="background: ${isTeaching ? 'var(--accent)' : 'var(--accent-light)'}; color: white; font-size: 10px; padding: 2px 6px; border-radius: 3px; margin-right: 6px;">${categoryLabel}</span>
                        ${escapeHtml(doc.title || '')}
                    </div>
                    <div class="community-doc-meta">上传者: ${escapeHtml(doc.author || '匿名')} | ${formatDate(doc.created_at)}</div>
                    <div class="community-doc-content">${escapeHtml(doc.content?.substring(0, 150) || '')}${doc.content?.length > 150 ? '...' : ''}</div>
                    <div class="community-doc-actions">
                        <button onclick="openCommunityDocFullscreen('${doc.id}')">全屏阅读</button>
                        <button onclick="useCommunityDoc('${doc.id}')">用作教学标准</button>
                        <button onclick="viewCommunityDoc('${doc.id}')">查看详情</button>
                        ${isOwnCommunityDoc(doc.id)
                            ? `<button onclick="deleteCommunityDoc('${doc.id}')" title="可直接删除自己上传的内容">删除</button>`
                            : `<button onclick="deleteCommunityDoc('${doc.id}')" title="删除他人上传的内容需要密码验证">验证删除</button>`}
                    </div>
                </div>
            `;
                    }).join('');
                });
        }
        
        async function deleteCommunityDoc(id) {
            const permission = await verifyCommunityDeletePermission(id);
            if (!permission.granted) {
                return;
            }

            const confirmMessage = permission.isOwnDoc
                ? '\u786e\u5b9a\u5220\u9664\u8fd9\u7bc7\u6587\u6863\u5417\uff1f'
                : '\u8fd9\u7bc7\u6587\u6863\u4e0d\u662f\u4f60\u4e0a\u4f20\u7684\uff0c\u5df2\u901a\u8fc7\u5bc6\u7801\u9a8c\u8bc1\uff0c\u786e\u5b9a\u7ee7\u7eed\u5220\u9664\u5417\uff1f';
            if (!confirm(confirmMessage)) return;
            if (!communityClient) {
                initCommunity();
                alert('\u793e\u533a\u8fde\u63a5\u5c1a\u672a\u51c6\u5907\u597d\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5');
                return;
            }

            try {
                const { error } = await communityClient
                    .from('community_docs')
                    .delete()
                    .eq('id', id);

                if (error) {
                    alert('\u5220\u9664\u5931\u8d25: ' + error.message);
                    return;
                }

                if (permission.isOwnDoc) {
                    unmarkCommunityDocAsOwned(id);
                }

                alert(permission.isOwnDoc
                    ? '\u5df2\u5220\u9664'
                    : '\u5df2\u901a\u8fc7\u5bc6\u7801\u9a8c\u8bc1\u5e76\u5220\u9664');
                loadCommunityDocs();
                return;
            } catch (e) {
                alert('\u5220\u9664\u5931\u8d25: ' + e.message);
                return;
            }
            /*
            const permission = await verifyCommunityDeletePermission(id);
            if (!permission.granted) {
                return;
            }

            const confirmMessage = permission.isOwnDoc
                ? '确定删除这篇文档吗？'
                : '这篇文档不是你上传的，已通过密码验证，确定继续删除吗？';
            if (!confirm(confirmMessage)) return;
            if (!communityClient) {
                initCommunity();
                alert('社区连接尚未准备好，请稍后重试');
                return;
            }

            try {
                const { error } = await communityClient
                    .from('community_docs')
                    .delete()
                    .eq('id', id);

                if (error) {
                    alert('删除失败: ' + error.message);
                    return;
                }

                if (permission.isOwnDoc) {
                    unmarkCommunityDocAsOwned(id);
                }

                alert(permission.isOwnDoc ? '已删除' : '已通过密码验证并删除');
                loadCommunityDocs();
                return;
            } catch (e) {
                alert('删除失败: ' + e.message);
                return;
            }
            */
            if (!isOwnCommunityDoc(id)) {
                alert('只能删除自己上传的文档');
                return;
            }
            
            if (!confirm('确定删除这篇文档吗？')) return;
            if (!communityClient) {
                initCommunity();
                alert('社区连接尚未准备好，请稍后重试');
                return;
            }
            
            try {
                const { error } = await communityClient
                    .from('community_docs')
                    .delete()
                    .eq('id', id);
                
                if (error) {
                    alert('删除失败: ' + error.message);
                    return;
                }
                
                unmarkCommunityDocAsOwned(id);
                alert('已删除');
                loadCommunityDocs();
            } catch (e) {
                alert('删除失败: ' + e.message);
            }
        }
        
        function doUpload() {
            if (!communityClient) {
                alert('连接 Supabase 失败，请刷新重试');
                return;
            }
            
            let content = document.getElementById('reviewContent').value;
            let formattedContent = null;
            
            const preview = document.getElementById('reviewPreview');
            if (preview) {
                const formattedDiv = preview.querySelector('.formatted-preview:not([style*="display: none"])');
                if (formattedDiv && formattedDiv.innerHTML) {
                    formattedContent = formattedDiv.innerHTML;
                }
            }
            
            const title = document.getElementById('docName').value.trim() || '未命名文档';
            const lastAuthor = localStorage.getItem(COMMUNITY_STORAGE_KEYS.LAST_AUTHOR) || '匿名';
            const authorInput = prompt('你的名字:', lastAuthor);
            if (authorInput === null) return;
            const author = authorInput.trim() || lastAuthor;
            localStorage.setItem(COMMUNITY_STORAGE_KEYS.LAST_AUTHOR, author);
            
            const categoryLabel = prompt('请输入文档分类（输入“教学”或“审核”）:', '审核');
            if (categoryLabel === null) return;
            const category = categoryLabel.includes('教学') ? '教学文档' : '审核文档';
            
            if (!content.trim()) {
                alert('请先准备要上传的文档内容');
                return;
            }
            
            const gradingKeywords = ['评分标准', '文献考据', '义理分析', '结构逻辑', '学术规范', '3分标准', '2分标准', '1-0分标准', '总分10'];
            const hasGradingContent = gradingKeywords.some(keyword => content.includes(keyword));
            
            if (hasGradingContent) {
                const lines = content.split('\n');
                const cleanLines = [];
                let foundGradingSection = false;
                
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    if (line.includes('评分标准') && i < 5) {
                        foundGradingSection = true;
                        continue;
                    }
                    if (foundGradingSection && (line.includes('前言与适用范围') || line.includes('评分标准框架总述'))) {
                        continue;
                    }
                    if (line.includes('前言与适用范围') || line.includes('评分标准框架总述')) {
                        continue;
                    }
                    cleanLines.push(line);
                }
                
                content = cleanLines.join('\n').trim();
                if (!content) {
                    alert('无法提取可上传的文档内容，当前内容看起来只有评分标准');
                    return;
                }
            }
            
            const insertData = {
                title: `[${category}] ${title}`,
                content: content,
                review_result: '',
                author: author
            };
            
            if (formattedContent) {
                insertData.formatted_content = formattedContent;
            }
            
            communityClient
                .from('community_docs')
                .insert(insertData)
                .select('id')
                .single()
                .then(({ data, error }) => {
                    if (error) {
                        alert('上传失败: ' + error.message);
                        return;
                    }
                    
                    if (data && data.id !== undefined && data.id !== null) {
                        markCommunityDocAsOwned(data.id);
                    }
                    
                    alert('上传成功' + (formattedContent ? '（已保留格式信息）' : ''));
                    loadCommunityDocs();
                });
        }
        
        window.addEventListener('load', function() {
            autoConnect();
        });
        
        document.getElementById('docName').addEventListener('input', function() {
            renderVersionList();
        });

        // ========== 参考文献自动识别系统 ==========
        
        // 中文经典名称列表（更全面）
