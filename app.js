// 文档审核助手 - 主应用逻辑
// 由于完整JS代码量较大，此文件作为模块化入口
// 完整逻辑请参考 origin-index.html 中的 script 部分

// ============ 配置使用 CONFIG =============
const KB_MAX_VERSIONS = CONFIG.STORAGE.MAX_VERSIONS;
const KB_MAX_DOCS = CONFIG.STORAGE.MAX_DOCS;
const KB_MAX_SIZE = CONFIG.STORAGE.MAX_SIZE;
const STORAGE_KEYS = CONFIG.STORAGE.KEYS;

// ============ 全局状态 =============
let teachingSummary = '';
let teachingDocs = [];
let currentCategoryFilter = 'all';
let isDragging = false;
let startX = 0;
let startWidth = 0;

// 自定义引用数据
let customReferences = {};
let customExegesis = {};
let customCrossRefs = {};

// ============ 初始化 =============
window.onload = function() {
    loadCustomReferences();
    loadTeachingDocs();
    loadKnowledgeBase();
    loadDefaultGradingStandard();
};

// 从 config.js 加载默认评分标准
function loadDefaultGradingStandard() {
    if (teachingDocs.length === 0) {
        teachingDocs = [{
            name: '内置评分标准',
            content: DEFAULT_GRADING_STANDARD,
            size: DEFAULT_GRADING_STANDARD.length,
            addedAt: new Date().toISOString(),
            isBuiltIn: true
        }];
        teachingSummary = '';
        saveTeachingDocs();
        renderTeachingDocsList();
    }
}

// ============ API 调用 =============
async function callAIApi(messages, customModel = null) {
    const apiKey = CONFIG.API.apiKey;
    if (!apiKey) {
        throw new Error('请在 config.js 中配置 API Key');
    }
    
    const model = customModel || CONFIG.API.model;
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
    };
    
    const requestBody = {
        model: model,
        messages: messages
    };
    
    const fetchOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    };
    
    const response = await fetch(CONFIG.API.endpoint, fetchOptions);
    const result = await response.json();
    
    if (result.error) {
        let errorMsg = result.error.message || JSON.stringify(result);
        if (errorMsg.includes('invalid_token') || errorMsg.includes('令牌已过期')) {
            errorMsg = 'API Key无效或已过期，请检查配置';
        }
        if (errorMsg.includes('Insufficient Balance')) {
            errorMsg = 'API余额不足';
        }
        throw new Error(errorMsg);
    }
    
    if (result.choices && result.choices[0]) {
        return result.choices[0].message.content;
    } else {
        throw new Error(JSON.stringify(result));
    }
}

// ============ 工具函数 =============
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
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

// ============ 存储相关 =============
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

// ============ 自定义引用 =============
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

// ============ 侧边栏调整 =============
function startResize(e) {
    isDragging = true;
    startX = e.clientX;
    const sidebar = document.getElementById('sidebarRight');
    startWidth = sidebar ? sidebar.offsetWidth : 260;
    const handle = document.getElementById('resizeHandle');
    if (handle) handle.classList.add('dragging');
    document.body.style.cursor = 'ew-resize';
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    return false;
}

window.onmousemove = function(e) {
    if (!isDragging) return;
    const sidebar = document.getElementById('sidebarRight');
    if (!sidebar) return;
    const delta = startX - e.clientX;
    const newWidth = startWidth + delta;
    const threeColumn = document.querySelector('.three-column-layout');
    const maxWidth = threeColumn ? Math.floor(threeColumn.offsetWidth * 0.6) : 400;
    const minWidth = 200;
    if (newWidth >= minWidth && newWidth <= maxWidth) {
        sidebar.style.width = newWidth + 'px';
    }
};

window.onmouseup = function() {
    if (isDragging) {
        isDragging = false;
        const handle = document.getElementById('resizeHandle');
        if (handle) handle.classList.remove('dragging');
        document.body.style.cursor = '';
    }
};

// ============ 标签切换 =============
function switchTab(tab) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.mobile-nav button').forEach(t => t.classList.remove('active'));
    
    const tabs = document.querySelectorAll('.nav-tab');
    if (tab === 'teaching') tabs[0].classList.add('active');
    else if (tab === 'review') tabs[1].classList.add('active');
    else if (tab === 'knowledge') {
        tabs[2].classList.add('active');
        renderKnowledgeBase();
    }
    else if (tab === 'community') {
        tabs[3].classList.add('active');
        loadCommunityDocs();
    }
    
    const mobileBtns = document.querySelectorAll('.mobile-nav button');
    mobileBtns.forEach(btn => {
        if (btn.dataset.tab === tab) btn.classList.add('active');
    });
    
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.getElementById(tab + '-panel').classList.add('active');
}

// ============ 知识库相关 =============
function renderKnowledgeBase() {
    const kb = getKnowledgeBase();
    const search = document.getElementById('kbSearch').value.toLowerCase();
    const list = document.getElementById('kbList');
    
    let totalVersions = 0;
    const filtered = kb.filter(doc => {
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
                        <div class="kb-meta">${doc.versions?.length || 1} 个版本 | 更新: ${formatDate(doc.updatedAt)}</div>
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

function loadKnowledgeBase() {
    renderKnowledgeBase();
}

function checkStorageWarning() {
    const kb = getKnowledgeBase();
    const size = new Blob([JSON.stringify(kb)]).size;
    document.getElementById('storageWarning').classList.toggle('hidden', size < KB_MAX_SIZE * 0.8);
}

// ============ 教学文档列表 =============
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

// ============ 文件处理 =============
// 注意：完整文件处理逻辑见 origin-index.html
// 此处仅包含基本框架

// ============ 社区功能 =============
// 注意：完整社区功能见 origin-index.html
// 此处仅包含基本框架
let communityClient = null;

function initCommunity() {
    // Supabase 初始化 - 需要在 config.js 中配置
    // communityClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function loadCommunityDocs() {
    // 社区文档加载逻辑见 origin-index.html
}

function filterCategory(category) {
    currentCategoryFilter = category;
    loadCommunityDocs();
}

// ============ 文件上传教学文档 =============
async function handleTeachingFiles(input) {
    // 完整实现见 origin-index.html
    alert('请参考 origin-index.html 中的完整实现');
}

function submitTeachingDoc() {
    // 完整实现见 origin-index.html
    alert('请参考 origin-index.html 中的完整实现');
}

function uploadTeachingToKnowledgeBase() {
    // 完整实现见 origin-index.html
    alert('请参考 origin-index.html 中的完整实现');
}

function uploadTeachingToCommunity() {
    // 完整实现见 origin-index.html
    alert('请参考 origin-index.html 中的完整实现');
}

// ============ 审核功能 =============
async function handleFileSelect(input, type) {
    // 完整实现见 origin-index.html
    alert('请参考 origin-index.html 中的完整实现');
}

function submitReviewDoc() {
    // 完整实现见 origin-index.html
    alert('请参考 origin-index.html 中的完整实现');
}

function uploadToCommunity() {
    // 完整实现见 origin-index.html
    alert('请参考 origin-index.html 中的完整实现');
}

function openCurrentDocFullscreen() {
    // 完整实现见 origin-index.html
    alert('请参考 origin-index.html 中的完整实现');
}

function toggleFullscreen() {
    const viewer = document.getElementById('fullscreenViewer');
    viewer.classList.toggle('hidden');
}

function adjustFontSize(delta) {
    // 完整实现见 origin-index.html
}

function addTextAnnotation() {
    // 完整实现见 origin-index.html
}

// ============ 分析功能 =============
function generateQuestions() {
    alert('请参考 origin-index.html 中的完整实现');
}

function findWeakPoints() {
    alert('请参考 origin-index.html 中的完整实现');
}

function analyzePosition() {
    alert('请参考 origin-index.html 中的完整实现');
}

function clearAnalysisResults() {
    document.getElementById('analysisResult').innerHTML = '';
    document.getElementById('clearAnalysisBtn').classList.add('hidden');
}

function runAutoAnalysis() {
    alert('请参考 origin-index.html 中的完整实现');
}

function analyzeCitations(content) {
    // 完整实现见 origin-index.html
}

function analyzeExegesis(content) {
    // 完整实现见 origin-index.html
}

function analyzeCrossReferences(content) {
    // 完整实现见 origin-index.html
}

// ============ 知识库操作 =============
function loadTeachingFromKb(docId) {
    alert('请参考 origin-index.html 中的完整实现');
}

function loadDocFromKb(docId) {
    alert('请参考 origin-index.html 中的完整实现');
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
    alert('请参考 origin-index.html 中的完整实现');
}

function renderVersionList() {
    // 完整实现见 origin-index.html
}

function saveToKnowledgeBase(docName, content, review, score) {
    // 完整实现见 origin-index.html
}

// ============ 全文批注功能 =============
function handleTextSelection() {
    // 完整实现见 origin-index.html
}

function submitDocComment() {
    alert('请参考 origin-index.html 中的完整实现');
}

// ============ 右则边栏分析 =============
function enhancedAnalyzeCitations(content) {
    // 完整实现见 origin-index.html
}

function enhancedAnalyzeCrossRefs(content) {
    // 完整实现见 origin-index.html
}

function appendAnalysisResult(html) {
    const resultDiv = document.getElementById('analysisResult');
    resultDiv.innerHTML += html;
    document.getElementById('clearAnalysisBtn').classList.remove('hidden');
}

// 注意：本文件仅包含基本框架函数
// 完整的应用逻辑请查看 origin-index.html