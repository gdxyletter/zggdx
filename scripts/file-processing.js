        async function handleFileSelect(input, type) {
            const file = input.files[0];
            if (!file) return;
            
            const btn = input.closest('.file-upload-area').querySelector('p');
            
            const fileExt = file.name.split('.').pop().toLowerCase();
            const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
            
            if (fileExt === 'txt' || fileExt === 'md') {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById(type + 'Content').value = e.target.result;
                    const preview = document.getElementById(type + 'Preview');
                    if (preview) preview.innerHTML = '';
                    if (type === 'review') {
                        const nameInput = document.getElementById('docName');
                        if (!nameInput.value) {
                            nameInput.value = file.name.replace(/\.[^.]+$/, '');
                        }
                    }
                    btn.textContent = `已加载: ${file.name}`;
                };
                reader.readAsText(file);
            } else if (fileExt === 'docx') {
                btn.textContent = '正在解析Word文档（含格式）...';
                try {
                    const result = await parseDocx(file);
                    const hasFormat = result.includes('style="');
                    
                    document.getElementById(type + 'Content').value = hasFormat ? convertToPlainText(result) : result;
                    
                    const preview = document.getElementById(type + 'Preview');
                    if (preview) {
                        if (hasFormat) {
                            preview.innerHTML = '<div class="format-toggle"><button class="active" onclick="togglePreview(this, \'' + type + '\', \'formatted\')">带格式预览</button><button onclick="togglePreview(this, \'' + type + '\', \'plain\')">纯文本预览</button></div><div id="' + type + 'FormattedContent" class="formatted-preview" style="display:block;">' + result + '</div><div id="' + type + 'PlainContent" class="formatted-preview" style="display:none;">' + escapeHtml(convertToPlainText(result)) + '</div>';
                            
                            const formatInfo = extractFormatInfo(result);
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
                        }
                    }
                    
                    if (type === 'review') {
                        const nameInput = document.getElementById('docName');
                        if (!nameInput.value) {
                            nameInput.value = file.name.replace(/\.[^.]+$/, '');
                        }
                    }
                    btn.textContent = `已加载: ${file.name}${hasFormat ? ' (含格式)' : ''}`;
                } catch(e) {
                    btn.textContent = '点击上传审核文档';
                    alert('Word文档解析失败: ' + e.message + '\n请复制粘贴文档内容到下方文本框');
                }
            } else if (imageExts.includes(fileExt)) {
                btn.textContent = '正在进行OCR识别...';
                try {
                    const result = await performOCR(file);
                    document.getElementById(type + 'Content').value = result;
                    const preview = document.getElementById(type + 'Preview');
                    if (preview) preview.innerHTML = '';
                    if (type === 'review') {
                        const nameInput = document.getElementById('docName');
                        if (!nameInput.value) {
                            nameInput.value = file.name.replace(/\.[^.]+$/, '');
                        }
                    }
                    btn.textContent = `OCR识别完成: ${file.name}`;
                } catch(e) {
                    btn.textContent = '点击上传审核文档';
                    alert('OCR识别失败: ' + e.message);
                }
            } else if (fileExt === 'pdf') {
                btn.textContent = '正在解析PDF文档...';
                try {
                    const result = await parsePdf(file);
                    document.getElementById(type + 'Content').value = result;
                    const preview = document.getElementById(type + 'Preview');
                    if (preview) preview.innerHTML = '';
                    if (type === 'review') {
                        const nameInput = document.getElementById('docName');
                        if (!nameInput.value) {
                            nameInput.value = file.name.replace(/\.[^.]+$/, '');
                        }
                    }
                    btn.textContent = `已加载: ${file.name}`;
                } catch(e) {
                    btn.textContent = '点击上传审核文档';
                    alert('PDF解析失败: ' + e.message);
                }
            } else {
                alert('不支持的格式: ' + fileExt + '\n文件: ' + file.name + '\n\n支持: TXT、MD、Word(.docx)、PDF、图片');
            }
        }
        
        function togglePreview(btn, type, mode) {
            const parent = btn.parentElement;
            parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const formattedDiv = document.getElementById(type + 'FormattedContent');
            const plainDiv = document.getElementById(type + 'PlainContent');
            
            if (mode === 'formatted') {
                if (formattedDiv) formattedDiv.style.display = 'block';
                if (plainDiv) plainDiv.style.display = 'none';
            } else {
                if (formattedDiv) formattedDiv.style.display = 'none';
                if (plainDiv) plainDiv.style.display = 'block';
            }
        }

        async function performOCR(file) {
            const worker = await Tesseract.createWorker('eng+chi_sim', 1, {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        console.log('OCR进度: ' + Math.round(m.progress * 100) + '%');
                    }
                }
            });
            
            const { data: { text } } = await worker.recognize(file);
            await worker.terminate();
            
            if (!text || text.trim().length === 0) {
                throw new Error('未能识别出文字，请尝试更换图片或调整图片质量');
            }
            
            return text;
        }

        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }

        async function parsePdf(file) {
            if (typeof pdfjsLib === 'undefined') {
                throw new Error('PDF.js 库未加载，请刷新页面');
            }
            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;
            let fullText = '';
            
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n\n';
            }
            
            if (!fullText.trim()) {
                return await parseScannedPdf(file, pdf);
            }
            
            return fullText;
        }

        async function parseScannedPdf(file, pdfDoc) {
            if (typeof Tesseract === 'undefined') {
                throw new Error('这是扫描件 PDF，无可提取文字，请将 PDF 页面截图后用图片 OCR 识别');
            }
            
            let fullText = '';
            const numPages = pdfDoc ? pdfDoc.numPages : 1;
            
            for (let i = 1; i <= numPages; i++) {
                let page;
                if (pdfDoc) {
                    page = await pdfDoc.getPage(i);
                } else {
                    const loadingTask = pdfjsLib.getDocument({ data: await file.arrayBuffer() });
                    const pdf = await loadingTask.promise;
                    page = await pdf.getPage(i);
                }
                
                const scale = 2.0;
                const viewport = page.getViewport({ scale: scale });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                await page.render({ canvasContext: context, viewport: viewport }).promise;
                
                const imageData = canvas.toDataURL('image/png');
                const worker = await Tesseract.createWorker('eng+chi_sim');
                const { data: { text } } = await worker.recognize(imageData);
                await worker.terminate();
                
                fullText += text + '\n\n';
            }
            
            if (!fullText.trim()) {
                throw new Error('OCR 未能识别出文字，请尝试提高图片清晰度');
            }
            
            return fullText;
        }
        
        async function parseDocx(file) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const zip = await JSZip.loadAsync(arrayBuffer);
                
                const documentXml = await zip.file("word/document.xml")?.async("string");
                if (!documentXml) {
                    throw new Error('无效的Word文档');
                }
                
                const stylesXml = await zip.file("word/styles.xml")?.async("string");
                
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(documentXml, "text/xml");
                const stylesDoc = stylesXml ? parser.parseFromString(stylesXml, "text/xml") : null;
                
                const namespaces = {
                    w: 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
                };
                
                const paragraphs = xmlDoc.getElementsByTagNameNS(namespaces.w, 'p');
                
                const textParts = [];
                for (let p of paragraphs) {
                    const runs = p.getElementsByTagNameNS(namespaces.w, 'r');
                    let paragraphHtml = '';
                    
                    for (let run of runs) {
                        const texts = run.getElementsByTagNameNS(namespaces.w, 't');
                        let text = '';
                        for (let t of texts) {
                            text += t.textContent || '';
                        }
                        
                        if (!text) continue;
                        
                        let style = '';
                        const rPr = run.getElementsByTagNameNS(namespaces.w, 'rPr')[0];
                        
                        if (rPr) {
                            const colorEl = rPr.getElementsByTagNameNS(namespaces.w, 'color')[0];
                            const szEl = rPr.getElementsByTagNameNS(namespaces.w, 'sz')[0];
                            const szCsEl = rPr.getElementsByTagNameNS(namespaces.w, 'szCs')[0];
                            const bEl = rPr.getElementsByTagNameNS(namespaces.w, 'b')[0];
                            const iEl = rPr.getElementsByTagNameNS(namespaces.w, 'i')[0];
                            const uEl = rPr.getElementsByTagNameNS(namespaces.w, 'u')[0];
                            
                            if (colorEl && colorEl.getAttribute('w:val')) {
                                const color = '#' + colorEl.getAttribute('w:val').slice(-6);
                                style += `color:${color};`;
                            }
                            
                            if ((szEl && szEl.getAttribute('w:val')) || (szCsEl && szCsEl.getAttribute('w:val'))) {
                                const halfPt = parseInt(szCsEl?.getAttribute('w:val') || szEl?.getAttribute('w:val') || '21');
                                const pt = halfPt / 2;
                                style += `font-size:${pt}pt;`;
                            }
                            
                            if (bEl) style += 'font-weight:bold;';
                            if (iEl) style += 'font-style:italic;';
                            if (uEl) {
                                const uVal = uEl.getAttribute('w:val');
                                if (uVal && uVal !== 'none') style += 'text-decoration:underline;';
                            }
                        }
                        
                        const pPr = p.getElementsByTagNameNS(namespaces.w, 'pPr')[0];
                        if (pPr) {
                            const pStyleEl = pPr.getElementsByTagNameNS(namespaces.w, 'pStyle')[0];
                            if (pStyleEl) {
                                const styleId = pStyleEl.getAttribute('w:val');
                                if (stylesDoc) {
                                    const styleEls = stylesDoc.getElementsByTagNameNS(namespaces.w, 'style');
                                    for (let s of styleEls) {
                                        if (s.getAttribute('w:styleId') === styleId) {
                                            const rPrInStyle = s.getElementsByTagNameNS(namespaces.w, 'rPr')[0];
                                            if (rPrInStyle) {
                                                const colorEl = rPrInStyle.getElementsByTagNameNS(namespaces.w, 'color')[0];
                                                const szEl = rPrInStyle.getElementsByTagNameNS(namespaces.w, 'sz')[0];
                                                if (colorEl && colorEl.getAttribute('w:val')) {
                                                    const color = '#' + colorEl.getAttribute('w:val').slice(-6);
                                                    style += `color:${color};`;
                                                }
                                                if (szEl && szEl.getAttribute('w:val')) {
                                                    const halfPt = parseInt(szEl.getAttribute('w:val'));
                                                    const pt = halfPt / 2;
                                                    style += `font-size:${pt}pt;`;
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        
                        if (style) {
                            paragraphHtml += `<span style="${style}">${escapeHtml(text)}</span>`;
                        } else {
                            paragraphHtml += escapeHtml(text);
                        }
                    }
                    
                    if (paragraphHtml.trim()) {
                        textParts.push(paragraphHtml);
                    }
                }
                
                return textParts.join('\n');
            } catch (e) {
                throw new Error('解析失败: ' + e.message);
            }
        }
        
        function convertToPlainText(htmlContent) {
            const div = document.createElement('div');
            div.innerHTML = htmlContent;
            return div.textContent || div.innerText || '';
        }
        
        function extractFormatInfo(htmlContent) {
            const div = document.createElement('div');
            div.innerHTML = htmlContent;
            
            const formatInfo = {
                hasColors: false,
                hasFontSizes: false,
                colors: new Set(),
                fontSizes: new Set()
            };
            
            const spans = div.querySelectorAll('span');
            spans.forEach(span => {
                const style = span.getAttribute('style') || '';
                if (style.includes('color:')) {
                    formatInfo.hasColors = true;
                    const match = style.match(/color:\s*([^;]+)/);
                    if (match) formatInfo.colors.add(match[1]);
                }
                if (style.includes('font-size:')) {
                    formatInfo.hasFontSizes = true;
                    const match = style.match(/font-size:\s*([^;]+)/);
                    if (match) formatInfo.fontSizes.add(match[1]);
                }
            });
            
            return {
                hasColors: formatInfo.hasColors,
                hasFontSizes: formatInfo.hasFontSizes,
                colors: Array.from(formatInfo.colors),
                fontSizes: Array.from(formatInfo.fontSizes)
            };
        }
        
