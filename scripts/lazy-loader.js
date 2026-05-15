function loadScript(src) {
  return new Promise(function(resolve, reject) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = function() { resolve(); };
    script.onerror = function() { reject(new Error('Failed to load: ' + src)); };
    document.head.appendChild(script);
  });
}

async function ensureTesseract() {
  if (typeof Tesseract !== 'undefined') return;
  await loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js');
}

async function ensurePdfJs() {
  if (typeof pdfjsLib !== 'undefined') return;
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

async function ensureJSZip() {
  if (typeof JSZip !== 'undefined') return;
  await loadScript('https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js');
}

async function ensureECharts() {
  if (typeof echarts !== 'undefined') return;
  await loadScript('https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js');
  await loadScript('https://cdn.jsdelivr.net/npm/echarts-wordcloud@2.1.0/dist/echarts-wordcloud.min.js');
}
