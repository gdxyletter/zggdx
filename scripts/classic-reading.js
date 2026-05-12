        let currentClassicText = '';
        let selectedSentence = '';
        let currentReadingFontSize = 18;
        let classicClient = null;
        
        const CLASSIC_SUPABASE_URL = 'https://jvpigxbiwmwvxiawcjml.supabase.co';
        const CLASSIC_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2cGlneGJpd213dnhpYXdjam1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0OTg5MzksImV4cCI6MjA5MDA3NDkzOX0._HuO96XxWQAyyMlVDdwst-1bxYzWW0lT2827SvGn_8w';
        
        const CLASSIC_DELETE_PASSWORD_HASH = '6f54f53188d3a33cb7ba279e668109925bb780886328b53c9f6c8dece6ab3899';
        
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
        
        async function verifyClassicDeletePermission(id) {
            const passwordInput = prompt('请输入删除密码：');
            if (passwordInput === null) {
                return false;
            }
            
            const passwordHash = await sha256Text(passwordInput.trim());
            if (passwordHash !== CLASSIC_DELETE_PASSWORD_HASH) {
                alert('密码错误，不能删除笔记');
                return false;
            }
            
            return true;
        }
        
function openRichTextEditor() {
            const input = document.getElementById('annotationInput');
            const editor = document.getElementById('richTextEditor');
            const modal = document.getElementById('richTextModal');
            
            let plainText = input.value.replace(/<[^>]*>/g, '');
            editor.value = plainText;
            document.getElementById('fontSizeSelect').value = '';
            modal.style.display = 'flex';
        }
        
        function closeRichTextEditor() {
            document.getElementById('richTextModal').style.display = 'none';
        }
        
function toggleBold() {
            const editor = document.getElementById('richTextEditor');
            if (!editor.value) { alert('请先输入文字'); return; }
            editor.value = '<b>' + editor.value + '</b>';
        }
        
        function toggleItalic() {
            const editor = document.getElementById('richTextEditor');
            if (!editor.value) { alert('请先输入文字'); return; }
            editor.value = '<i>' + editor.value + '</i>';
        }
        
        function toggleUnderline() {
            const editor = document.getElementById('richTextEditor');
            if (!editor.value) { alert('请先输入文字'); return; }
            editor.value = '<u>' + editor.value + '</u>';
        }
        
        function toggleFontSize(value) {
            if (!value) return;
            const editor = document.getElementById('richTextEditor');
            if (!editor.value) { alert('请先输入文字'); return; }
            const sizes = { '1': '10px', '2': '12px', '3': '14px', '4': '16px', '5': '18px', '6': '20px', '7': '24px' };
            editor.value = '<span style="font-size:' + sizes[value] + '">' + editor.value + '</span>';
        }
        
        function applyRichText() {
            const editor = document.getElementById('richTextEditor');
            const input = document.getElementById('annotationInput');
            input.value = editor.value;
            closeRichTextEditor();
        }
        
        function closeRichTextEditor() {
            document.getElementById('richTextModal').style.display = 'none';
        }
        
        function getClassicClient() {
            if (!classicClient) {
                classicClient = window.supabase.createClient(CLASSIC_SUPABASE_URL, CLASSIC_SUPABASE_KEY);
            }
            return classicClient;
        }

        function updateSidebarForReview() {
            document.getElementById('annotationSection').style.display = 'none';
            document.getElementById('defaultAnnotationSection').style.display = 'none';
            document.getElementById('gradingSection').style.display = 'block';
            document.getElementById('versionSection').style.display = 'block';
        }
        
        function updateSidebarForClassic() {
            document.getElementById('annotationSection').style.display = 'block';
            document.getElementById('defaultAnnotationSection').style.display = 'block';
            document.getElementById('gradingSection').style.display = 'none';
            document.getElementById('versionSection').style.display = 'none';
        }
        
        function loadClassicText() {
            const selector = document.getElementById('classicSelector');
            const selectedValue = selector.value;
            
            if (!selectedValue) {
                document.getElementById('classicContent').style.display = 'none';
                return;
            }
            
            // 显示或隐藏自动检测选项
            const autoDetectOption = document.getElementById('classicAutoDetectOption');
            if (selectedValue.startsWith('daxue')) {
                autoDetectOption.style.display = 'block';
            } else {
                autoDetectOption.style.display = 'none';
            }
            
// 这里是书籍来源的占位符，用户稍后会上传具体内容
            // 暂时使用示例文本
            const classic = classicTexts[selectedValue];
            if (classic) {
                document.getElementById('classicTitle').textContent = classic.title;
                renderClassicText(classic.content);
                document.getElementById('classicContent').style.display = 'block';
            }
        }
        
        function renderClassicText(text) {
            currentClassicText = text;
            const container = document.getElementById('classicText');
            
            // 按换行分割成段落
            const paragraphs = text.split('\n');
            
            let html = '';
            
            for (let p = 0; p < paragraphs.length; p++) {
                const para = paragraphs[p];
                if (!para.trim()) continue;
                
                // 按逗号分割每段，按钮显示时保留标点
                const parts = para.split('，');
                
                for (let i = 0; i < parts.length; i++) {
                    let part = parts[i];
                    if (!part.trim()) continue;
                    
                    // 检查是否包含顿号，进一步分割
                    const dunhaoParts = part.split('、');
                    for (let j = 0; j < dunhaoParts.length; j++) {
                        let dp = dunhaoParts[j];
                        if (!dp.trim()) continue;
                        
                        if (j > 0) {
                            html += '、';
                        }
                        
                        // 为每个片段创建可点击span，移除末尾可能的句末标点用于匹配
                        const matchText = dp.replace(/[。？！；：]$/, '').trim();
                        if (matchText) {
                            html += `<span class="sentence-highlight" onclick="selectSentence('${matchText.replace(/'/g, "\\'")}')">${dp}</span>`;
                        } else if (dp) {
                            html += dp;
                        }
                    }
                    
                    // 在最后一个逗号段落后添加逗号
                    if (i < parts.length - 1) {
                        html += '，';
                    }
                }
                
                // 段落末尾添加换行
                if (p < paragraphs.length - 1) {
                    html += '<br><br>';
                }
            }
            
            container.innerHTML = html;
}
        
        function selectSentence(sentence) {
            selectedSentence = sentence;
            
            // 清除之前的选中状态
            document.querySelectorAll('.sentence-highlight').forEach(el => {
                el.classList.remove('sentence-selected');
            });
            
            // 设置当前选中状态 - 找到匹配的句子
            const allSentences = document.querySelectorAll('.sentence-highlight');
            allSentences.forEach((el) => {
                const elText = el.textContent.replace(/[。？！；：]$/, '').trim();
                if (elText === sentence) {
                    el.classList.add('sentence-selected');
                }
            });
            
            // 更新左边栏
            document.getElementById('selectedSentenceText').textContent = sentence;
            document.getElementById('annotationInput').value = '';
            document.getElementById('publishAnnotationCheckbox').checked = false;
            
            // 加载公共笔记和私人笔记
            loadPublicAnnotations(sentence);
            loadHistoricalAnnotations(sentence);
            
            // 检查是否启用自动检测
            const checkbox = document.getElementById('autoDetectCheckbox');
            if (checkbox && checkbox.checked) {
                runAutoAnalysisForSentence(sentence);
            }
        }

        function runAutoAnalysisForSentence(sentence) {
            // 将选中的句子设置为reviewContent，然后调用runAutoAnalysis
            document.getElementById('reviewContent').value = sentence;
            runAutoAnalysis();
        }

        async function loadPublicAnnotations(sentence) {
            const container = document.getElementById('publicAnnotations');
            container.innerHTML = '<p style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 10px;">加载中...</p>';
            
            try {
                const client = getClassicClient();
                const { data, error } = await client
                    .from('classic_annotations')
                    .select('*')
                    .eq('sentence', sentence)
                    .eq('is_public', true)
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                
                if (!data || data.length === 0) {
                    container.innerHTML = '<p style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 10px;">暂无公共笔记</p>';
                    return;
                }
                
                container.innerHTML = data.map(ann => `
                    <div class="annotation-item" style="position: relative;">
                        ${ann.content}
                        <div class="timestamp">${new Date(ann.created_at).toLocaleString()}</div>
                        <button class="delete-btn" onclick="deletePublicAnnotation(${ann.id})" title="删除笔记">✕</button>
                    </div>
                `).join('');
            } catch (e) {
                container.innerHTML = '<p style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 10px;">加载失败</p>';
                console.error('加载公共笔记失败:', e);
            }
        }
        
        async function deletePublicAnnotation(id) {
            if (!confirm('确定要删除这条公共笔记吗？')) return;
            
            const hasPermission = await verifyClassicDeletePermission(id);
            if (!hasPermission) return;
            
            try {
                const client = getClassicClient();
                const { error } = await client
                    .from('classic_annotations')
                    .delete()
                    .eq('id', id);
                
                if (error) throw error;
                
                // 刷新显示
                loadPublicAnnotations(selectedSentence);
            } catch (e) {
                alert('删除失败: ' + e.message);
                console.error('删除公共笔记失败:', e);
            }
        }

        async function saveAnnotation() {
            const annotation = document.getElementById('annotationInput').value.trim();
            if (!annotation || !selectedSentence) {
                alert('请先选择句子并输入笔记内容');
                return;
            }
            
            const isPublicCheckbox = document.getElementById('publishAnnotationCheckbox');
            const isPublic = isPublicCheckbox.checked;
            
            // 保存到 localStorage (私人笔记)
            const annotations = JSON.parse(localStorage.getItem('classicAnnotations') || '{}');
            if (!annotations[selectedSentence]) {
                annotations[selectedSentence] = [];
            }
            
            annotations[selectedSentence].push({
                content: annotation,
                timestamp: new Date().toISOString(),
                id: Date.now()
            });
            
            localStorage.setItem('classicAnnotations', JSON.stringify(annotations));
            
            // 如果选择了公开，则同时保存到 Supabase
            if (isPublic) {
                try {
                    const client = getClassicClient();
                    await client.from('classic_annotations').insert({
                        sentence: selectedSentence,
                        content: annotation,
                        is_public: true
                    });
                } catch (e) {
                    console.error('保存到公共笔记失败:', e);
                }
            }
            
            // 清空输入框
            document.getElementById('annotationInput').value = '';
            document.getElementById('publishAnnotationCheckbox').checked = false;
            
            // 重新加载私人笔记
            loadHistoricalAnnotations(selectedSentence);
            // 如果是公开的，也刷新公共笔记
            if (isPublic) {
                loadPublicAnnotations(selectedSentence);
            }
            
            alert(isPublic ? '笔记已保存并公开' : '私人笔记已保存');
        }
        
        function loadHistoricalAnnotations(sentence) {
            const annotations = JSON.parse(localStorage.getItem('classicAnnotations') || '{}');
            const sentenceAnnotations = annotations[sentence] || [];
            
            const container = document.getElementById('historicalAnnotations');
            
            if (sentenceAnnotations.length === 0) {
                container.innerHTML = '<p style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 10px;">暂无私人笔记</p>';
                return;
            }
            
            container.innerHTML = sentenceAnnotations.map((ann, idx) => `
                <div class="annotation-item" style="position: relative;">
                    <div class="annotation-content">${ann.content}</div>
                    <div class="timestamp">${new Date(ann.timestamp).toLocaleString()}</div>
                    <button class="delete-btn" onclick="deleteAnnotation('${sentence.replace(/'/g, "\\'")}', ${idx})" title="删除笔记">✕</button>
                </div>
            `).join('');
        }
        
        function deleteAnnotation(sentence, index) {
            if (!confirm('确定要删除这条笔记吗？')) return;
            
            const annotations = JSON.parse(localStorage.getItem('classicAnnotations') || '{}');
            if (annotations[sentence]) {
                annotations[sentence].splice(index, 1);
                if (annotations[sentence].length === 0) {
                    delete annotations[sentence];
                }
                localStorage.setItem('classicAnnotations', JSON.stringify(annotations));
                loadHistoricalAnnotations(selectedSentence);
            }
        }
        
        function toggleFullscreenReading() {
            const fullscreenEl = document.getElementById('fullscreenReading');
            const title = document.getElementById('classicTitle').textContent;
            
            document.getElementById('fullscreenReadingTitle').textContent = title;
            renderFullscreenReadingContent(currentClassicText);
            
            fullscreenEl.classList.remove('hidden');
        }
        
        function renderFullscreenReadingContent(text) {
            const container = document.getElementById('fullscreenReadingContent');
            
            // 按句子分割文本
            const sentences = text.split(/[。！？\n]+/).filter(s => s.trim());
            
            let html = '';
            sentences.forEach((sentence) => {
                const trimmedSentence = sentence.trim();
                if (trimmedSentence) {
                    html += `<span class="sentence-highlight" onclick="selectSentence('${trimmedSentence.replace(/'/g, "\\'")}')" style="font-size: ${currentReadingFontSize}px;">${trimmedSentence}。</span><br><br>`;
                }
            });
            
            container.innerHTML = html;
        }
        
        function adjustReadingFontSize(delta) {
            currentReadingFontSize = Math.max(14, Math.min(24, currentReadingFontSize + delta));
            renderFullscreenReadingContent(currentClassicText);
        }
        
        function exitFullscreenReading() {
            document.getElementById('fullscreenReading').classList.add('hidden');
        }
        
        // 初始化经典阅读
        function initClassicReading() {
            // 加载已保存的笔记数量统计
            const annotations = JSON.parse(localStorage.getItem('classicAnnotations') || '{}');
            const totalAnnotations = Object.keys(annotations).length;
            
            console.log(`经典阅读模块已初始化，已保存 ${totalAnnotations} 个句子的笔记`);
            
            // 初始化左边栏宽度调节
            initSidebarResize();
        }
        
        function initSidebarResize() {
            const sidebar = document.getElementById('sidebarLeft');
            const resizer = document.getElementById('sidebarResizer');
            if (!sidebar || !resizer) return;
            
            let isResizing = false;
            
            resizer.addEventListener('mousedown', (e) => {
                isResizing = true;
                resizer.classList.add('resizing');
                document.body.style.cursor = 'ew-resize';
                document.body.style.userSelect = 'none';
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isResizing) return;
                
                const newWidth = e.clientX - sidebar.getBoundingClientRect().left;
                const minWidth = 180;
                const maxWidth = 400;
                
                if (newWidth >= minWidth && newWidth <= maxWidth) {
                    sidebar.style.width = newWidth + 'px';
                    sidebar.style.minWidth = newWidth + 'px';
                    sidebar.style.maxWidth = newWidth + 'px';
                }
            });
            
            document.addEventListener('mouseup', () => {
                if (isResizing) {
                    isResizing = false;
                    resizer.classList.remove('resizing');
                    document.body.style.cursor = '';
                    document.body.style.userSelect = '';
                }
            });
        }
        
        // 页面加载时初始化
        document.addEventListener('DOMContentLoaded', function() {
            initClassicReading();
        });
