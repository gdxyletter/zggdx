/**
 * 历史地理 / 孔子周游列国 — 春秋列国地图组件 + 第一视角游历
 *
 * 功能：SVG 地图渲染、点位展示、悬停提示、点击选中、地点详情、事件详情、人物简情
 *       第一视角游历、路线推进、进度保存
 *
 * 视图层级：
 *   map（仅地图 + 空面板） → location（地点详情） → event（事件详情）
 *                                                      → character（人物简情）
 *   location → character
 */

var HM_PROGRESS_KEY = 'kongzi-history-map-progress-v1';

var _hmCurrentView = 'map';
var _hmSelectedLocation = null;
var _hmSelectedEvent = null;
var _hmSelectedCharacter = null;
var _hmJourneyMode = false;
var _hmCurrentStep = 1;
var _hmCurrentTab = 'map';
var _hmAtlasView = 'grid';
var _hmAtlasFilter = 'all';
var _hmAtlasUnlockFilter = 'all';
var _hmActiveLayers = { state: true, route: true, event: true, geo: false, city: false };

/**
 * 进度数据结构
 * { currentStepOrder: 1, journeyMode: false }
 */

function _hmLoadProgress() {
    try {
        var raw = localStorage.getItem(HM_PROGRESS_KEY);
        if (!raw) return null;
        var data = JSON.parse(raw);
        if (data && typeof data.currentStepOrder === 'number' && data.currentStepOrder >= 1) {
            return data;
        }
    } catch (e) {
        // ignore parse error
    }
    return null;
}

function _hmSaveProgress() {
    try {
        localStorage.setItem(HM_PROGRESS_KEY, JSON.stringify({
            currentStepOrder: _hmCurrentStep,
            journeyMode: _hmJourneyMode
        }));
    } catch (e) {
        // ignore storage error
    }
}

function _hmClearProgress() {
    try {
        localStorage.removeItem(HM_PROGRESS_KEY);
    } catch (e) {
        // ignore
    }
}

/**
 * 计算到指定步骤为止的所有解锁数据
 * @param {number} upToStep
 * @returns {{ locationIds: string[], characterIds: string[], eventIds: string[] }}
 */
function _hmComputeUnlocked(upToStep) {
    var locationIds = [];
    var characterIds = [];
    var eventIds = [];
    var locSeen = {};
    var chrSeen = {};
    var evtSeen = {};
    var steps = window.historyMapRouteSteps || [];

    for (var i = 0; i < steps.length; i++) {
        if (steps[i].order > upToStep) break;

        var locs = steps[i].unlockLocationIds || [];
        for (var j = 0; j < locs.length; j++) {
            if (!locSeen[locs[j]]) { locSeen[locs[j]] = true; locationIds.push(locs[j]); }
        }
        var chrs = steps[i].unlockCharacterIds || [];
        for (var j = 0; j < chrs.length; j++) {
            if (!chrSeen[chrs[j]]) { chrSeen[chrs[j]] = true; characterIds.push(chrs[j]); }
        }
        var evts = steps[i].unlockEventIds || [];
        for (var j = 0; j < evts.length; j++) {
            if (!evtSeen[evts[j]]) { evtSeen[evts[j]] = true; eventIds.push(evts[j]); }
        }
    }

    return { locationIds: locationIds, characterIds: characterIds, eventIds: eventIds };
}

function startHistoryMapJourney(mode) {
    var landing = document.getElementById('hmLanding');
    var workspace = document.getElementById('hmWorkspace');
    if (landing) landing.classList.add('hidden');
    if (workspace) workspace.classList.remove('hidden');

    if (mode === 'journey') {
        _hmJourneyMode = true;
        var saved = _hmLoadProgress();
        if (saved && saved.journeyMode) {
            _hmCurrentStep = saved.currentStepOrder;
            var total = getTotalSteps();
            if (_hmCurrentStep > total) _hmCurrentStep = 1;
        } else {
            _hmCurrentStep = 1;
        }
        _hmSaveProgress();
        hmSwitchTab('journey');
    } else if (mode === 'atlas') {
        _hmJourneyMode = false;
        _hmCurrentStep = 1;
        hmSwitchTab('atlas');
    } else if (mode === 'about') {
        _hmJourneyMode = false;
        _hmCurrentStep = 1;
        hmSwitchTab('about');
    } else {
        _hmJourneyMode = false;
        _hmCurrentStep = 1;
        hmSwitchTab('map');
    }
}

function hmSwitchTab(tabName) {
    _hmCurrentTab = tabName;

    var tabs = document.querySelectorAll('.hm-subnav-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
        if (tabs[i].getAttribute('data-hm-tab') === tabName) {
            tabs[i].classList.add('active');
        }
    }

    var contents = document.querySelectorAll('.hm-tab-overlay');
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }

    if (tabName === 'map') {
        _hmJourneyMode = false;
        document.getElementById('hmTabMap').classList.add('active');
        _hmRenderMap();
        _hmResetDetailPanel();
    } else if (tabName === 'journey') {
        _hmJourneyMode = true;
        document.getElementById('hmTabJourney').classList.add('active');
        var saved = _hmLoadProgress();
        if (saved && saved.journeyMode) {
            _hmCurrentStep = saved.currentStepOrder;
        } else {
            _hmCurrentStep = 1;
        }
        _hmRenderMap();
        _hmRenderJourneyBar();
        _hmAutoSelectCurrentLocation();
    } else if (tabName === 'atlas') {
        document.getElementById('hmTabAtlas').classList.add('active');
        _hmRenderAtlas();
    } else if (tabName === 'about') {
        document.getElementById('hmTabAbout').classList.add('active');
    }
}

function backToHistoryMapLanding() {
    var landing = document.getElementById('hmLanding');
    var workspace = document.getElementById('hmWorkspace');
    if (landing) landing.classList.remove('hidden');
    if (workspace) workspace.classList.add('hidden');
    _hmCurrentView = 'map';
    _hmSelectedLocation = null;
    _hmSelectedEvent = null;
    _hmSelectedCharacter = null;
}

function hmJourneyNext() {
    var total = getTotalSteps();
    if (_hmCurrentStep < total) {
        _hmCurrentStep++;
        _hmSaveProgress();
        _hmRenderMap();
        _hmRenderJourneyBar();
        _hmRenderDetailPanel();
        _hmAutoSelectCurrentLocation();
        _hmBriefHighlightCurrent();
    }
}

function hmJourneyPrev() {
    if (_hmCurrentStep > 1) {
        _hmCurrentStep--;
        _hmSaveProgress();
        _hmRenderMap();
        _hmRenderJourneyBar();
        _hmRenderDetailPanel();
        _hmAutoSelectCurrentLocation();
    }
}

function hmJourneyReset() {
    _hmCurrentStep = 1;
    _hmSaveProgress();
    _hmRenderMap();
    _hmRenderJourneyBar();
    _hmRenderDetailPanel();
    _hmAutoSelectCurrentLocation();
}

function _hmAutoSelectCurrentLocation() {
    var step = getRouteStepByOrder(_hmCurrentStep);
    if (step) {
        var loc = getLocationById(step.locationId);
        if (loc) {
            _hmSelectedLocation = loc;
            _hmUpdateDotHighlight();
            _hmNavigateTo('location');
        }
    }
    var currentLocId = null;
    if (_hmJourneyMode) {
        var step = getRouteStepByOrder(_hmCurrentStep);
        if (step) currentLocId = step.locationId;
    }
    if (!currentLocId) return;

    var allDots = document.querySelectorAll('.hm-location-dot[data-location-id="' + currentLocId + '"]');
    for (var i = 0; i < allDots.length; i++) {
        var dot = allDots[i];
        dot.style.transform = 'scale(1.4)';
        dot.style.transition = 'transform 0.3s ease';
        (function(d) {
            setTimeout(function() {
                d.style.transform = 'scale(1)';
            }, 600);
        })(dot);
    }
}

function _hmNavigateTo(view) {
    _hmCurrentView = view;
    _hmRenderDetailPanel();
}

function _hmOpenLocation(loc) {
    _hmSelectedLocation = loc;
    _hmSelectedEvent = null;
    _hmSelectedCharacter = null;
    _hmUpdateDotHighlight();
    _hmNavigateTo('location');
}

function _hmOpenEvent(evt) {
    _hmSelectedEvent = evt;
    _hmSelectedCharacter = null;
    _hmNavigateTo('event');
}

function _hmOpenCharacter(chr) {
    _hmSelectedCharacter = chr;
    _hmNavigateTo('character');
}

function _hmEscapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

function _hmEl(id) {
    return document.getElementById(id);
}

function _hmIsBilingual() {
    var btn = document.querySelector('[data-language-mode].active');
    return btn && btn.getAttribute('data-language-mode') === 'bilingual';
}

function _hmField(obj, cnField, enField) {
    if (!obj) return '';
    if (enField && _hmIsBilingual()) {
        var enVal = obj[enField];
        if (enVal) return enVal;
    }
    return obj[cnField] || '';
}

function _hmT(zh, en) {
    return _hmIsBilingual() && en ? en : zh;
}

var _hmIdentityLabels = {
    master: { zh: '先师', en: 'Master' },
    disciple: { zh: '弟子', en: 'Disciple' },
    ruler: { zh: '诸侯', en: 'Ruler' },
    minister: { zh: '大夫', en: 'Minister' }
};

function _hmGetIdentityLabel(identity) {
    var label = _hmIdentityLabels[identity];
    if (!label) return _hmT('其他', 'Other');
    return _hmT(label.zh, label.en);
}

var _hmTypeLabels = {
    state: { zh: '国家', en: 'State' },
    city: { zh: '城邑', en: 'City' },
    event_place: { zh: '事件地点', en: 'Event Site' },
    geo: { zh: '山河关隘', en: 'Landmark' }
};

function _hmGetTypeLabel(type) {
    var label = _hmTypeLabels[type];
    if (!label) return type;
    return _hmT(label.zh, label.en);
}

function hmToggleLayer(layerName) {
    if (_hmActiveLayers.hasOwnProperty(layerName)) {
        var toggles = document.querySelectorAll('.hm-layer-toggle[data-layer="' + layerName + '"] input[type="checkbox"]');
        var newState = toggles.length > 0 ? toggles[0].checked : !_hmActiveLayers[layerName];
        _hmActiveLayers[layerName] = newState;

        _hmRenderMap();

        for (var i = 0; i < toggles.length; i++) {
            toggles[i].checked = _hmActiveLayers[layerName];
        }
    }
}

function _hmRenderMap() {
    var svg = _hmEl('hmSvg');
    if (!svg) return;

    var locations = window.historyMapLocations || [];
    var routeSteps = window.historyMapRouteSteps || [];

    svg.innerHTML = '';

    var unlocked = null;
    if (_hmJourneyMode) {
        unlocked = _hmComputeUnlocked(_hmCurrentStep);
    }

    _hmBuildDefs(svg);
    _hmDrawBackground(svg);
    _hmDrawStateLabels(svg);

    if (_hmActiveLayers.geo) {
        _hmDrawGeoFeatures(svg, locations, unlocked);
    }

    if (_hmActiveLayers.route) {
        _hmDrawRouteLines(svg, routeSteps, unlocked);
    }

    _hmDrawLocationDots(svg, locations, unlocked);
}

// 向后兼容
var renderSpringAutumnMap = _hmRenderMap;
var renderSpringAutumnMapJourney = _hmRenderMap;

function _hmBuildDefs(svg) {
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    var glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    glowFilter.setAttribute('id', 'hm-dot-glow');
    glowFilter.innerHTML =
        '<feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />' +
        '<feMerge>' +
            '<feMergeNode in="blur" />' +
            '<feMergeNode in="SourceGraphic" />' +
        '</feMerge>';
    defs.appendChild(glowFilter);

    var dotGrad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    dotGrad.setAttribute('id', 'hm-dot-grad');
    dotGrad.setAttribute('cx', '35%');
    dotGrad.setAttribute('cy', '35%');
    dotGrad.setAttribute('r', '65%');
    dotGrad.innerHTML =
        '<stop offset="0%" stop-color="#c0392b" />' +
        '<stop offset="100%" stop-color="#8b0000" />';
    defs.appendChild(dotGrad);

    var dotGradUnlocked = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    dotGradUnlocked.setAttribute('id', 'hm-dot-grad-unlocked');
    dotGradUnlocked.setAttribute('cx', '35%');
    dotGradUnlocked.setAttribute('cy', '35%');
    dotGradUnlocked.setAttribute('r', '65%');
    dotGradUnlocked.innerHTML =
        '<stop offset="0%" stop-color="#b8860b" />' +
        '<stop offset="100%" stop-color="#8b6914" />';
    defs.appendChild(dotGradUnlocked);

    var dotGradLocked = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    dotGradLocked.setAttribute('id', 'hm-dot-grad-locked');
    dotGradLocked.setAttribute('cx', '35%');
    dotGradLocked.setAttribute('cy', '35%');
    dotGradLocked.setAttribute('r', '65%');
    dotGradLocked.innerHTML =
        '<stop offset="0%" stop-color="#c8c0b0" />' +
        '<stop offset="100%" stop-color="#a89880" />';
    defs.appendChild(dotGradLocked);

    var dotGradEvent = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    dotGradEvent.setAttribute('id', 'hm-dot-grad-event');
    dotGradEvent.setAttribute('cx', '35%');
    dotGradEvent.setAttribute('cy', '35%');
    dotGradEvent.setAttribute('r', '65%');
    dotGradEvent.innerHTML =
        '<stop offset="0%" stop-color="#d4a017" />' +
        '<stop offset="100%" stop-color="#b8860b" />';
    defs.appendChild(dotGradEvent);

    var dotGradCity = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    dotGradCity.setAttribute('id', 'hm-dot-grad-city');
    dotGradCity.setAttribute('cx', '35%');
    dotGradCity.setAttribute('cy', '35%');
    dotGradCity.setAttribute('r', '65%');
    dotGradCity.innerHTML =
        '<stop offset="0%" stop-color="#b8860b" />' +
        '<stop offset="100%" stop-color="#8b6914" />';
    defs.appendChild(dotGradCity);

    var dotGradGeo = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    dotGradGeo.setAttribute('id', 'hm-dot-grad-geo');
    dotGradGeo.setAttribute('cx', '35%');
    dotGradGeo.setAttribute('cy', '35%');
    dotGradGeo.setAttribute('r', '65%');
    dotGradGeo.innerHTML =
        '<stop offset="0%" stop-color="#8a7d6a" />' +
        '<stop offset="100%" stop-color="#6b5e4f" />';
    defs.appendChild(dotGradGeo);

    svg.appendChild(defs);
}

function _hmDrawBackground(svg) {
    var bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', '0');
    bg.setAttribute('y', '0');
    bg.setAttribute('width', '100');
    bg.setAttribute('height', '100');
    bg.setAttribute('fill', '#f5f0e1');
    svg.appendChild(bg);

    var border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    border.setAttribute('x', '0.5');
    border.setAttribute('y', '0.5');
    border.setAttribute('width', '99');
    border.setAttribute('height', '99');
    border.setAttribute('fill', 'none');
    border.setAttribute('stroke', '#d4c8a8');
    border.setAttribute('stroke-width', '0.3');
    border.setAttribute('rx', '1');
    svg.appendChild(border);

    var gridLines = [
        { x1: 25, y1: 0, x2: 25, y2: 100 },
        { x1: 50, y1: 0, x2: 50, y2: 100 },
        { x1: 75, y1: 0, x2: 75, y2: 100 },
        { x1: 0, y1: 25, x2: 100, y2: 25 },
        { x1: 0, y1: 50, x2: 100, y2: 50 },
        { x1: 0, y1: 75, x2: 100, y2: 75 }
    ];
    for (var i = 0; i < gridLines.length; i++) {
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', gridLines[i].x1);
        line.setAttribute('y1', gridLines[i].y1);
        line.setAttribute('x2', gridLines[i].x2);
        line.setAttribute('y2', gridLines[i].y2);
        line.setAttribute('stroke', '#e0d8c4');
        line.setAttribute('stroke-width', '0.1');
        line.setAttribute('stroke-dasharray', '0.5,0.5');
        svg.appendChild(line);
    }

    var compass = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    compass.innerHTML =
        '<line x1="5" y1="6" x2="5" y2="12" stroke="#8a7d6a" stroke-width="0.3" />' +
        '<polygon points="5,5 4.6,7 5.4,7" fill="#8a7d6a" />' +
        '<text x="5" y="4.5" text-anchor="middle" font-size="2" fill="#8a7d6a" font-family="serif"></text>';
    var compassText = compass.querySelector('text');
    if (compassText) compassText.textContent = _hmT('北', 'N');
    svg.appendChild(compass);
}

function _hmDrawStateLabels(svg) {
    var states = [
        { name: '晋', x: 32, y: 20 },
        { name: '卫', x: 58, y: 24 },
        { name: '鲁', x: 74, y: 40 },
        { name: '齐', x: 80, y: 22 },
        { name: '宋', x: 70, y: 50 },
        { name: '郑', x: 50, y: 46 },
        { name: '曹', x: 66, y: 44 },
        { name: '陈', x: 48, y: 60 },
        { name: '蔡', x: 40, y: 72 },
        { name: '楚', x: 30, y: 85 }
    ];

    for (var i = 0; i < states.length; i++) {
        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('opacity', '0.18');

        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', states[i].x);
        text.setAttribute('y', states[i].y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '8');
        text.setAttribute('fill', '#8a7d6a');
        text.setAttribute('font-family', 'Crimson Pro, serif');
        text.textContent = states[i].name;
        g.appendChild(text);

        svg.appendChild(g);
    }
}

function _hmDrawGeoFeatures(svg, locations, unlocked) {
    var unlockedSet = {};
    if (unlocked) {
        for (var i = 0; i < unlocked.locationIds.length; i++) {
            unlockedSet[unlocked.locationIds[i]] = true;
        }
    }

    for (var i = 0; i < locations.length; i++) {
        var loc = locations[i];
        if (loc.type !== 'geo') continue;
        var isUnlocked = _hmJourneyMode ? unlockedSet[loc.id] : true;
        if (!isUnlocked && _hmJourneyMode) continue;

        if (loc.geoShape === 'river' && loc.geoPoints) {
            _hmDrawRiver(svg, loc);
        } else if (loc.geoShape === 'mountain') {
            _hmDrawMountain(svg, loc);
        } else if (loc.geoShape === 'pass') {
            _hmDrawPass(svg, loc);
        } else {
            _hmDrawGeoDot(svg, loc);
        }
    }
}

function _hmDrawRiver(svg, loc) {
    var points = loc.geoPoints || [{x: loc.x - 10, y: loc.y}, {x: loc.x, y: loc.y}, {x: loc.x + 10, y: loc.y}];

    var pathD = 'M ' + points[0].x + ' ' + points[0].y;
    for (var i = 1; i < points.length; i++) {
        var cpx = (points[i - 1].x + points[i].x) / 2;
        var cpy = (points[i - 1].y + points[i].y) / 2 - 0.5;
        pathD += ' Q ' + cpx + ' ' + cpy + ' ' + points[i].x + ' ' + points[i].y;
    }

    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#a8c0d0');
    path.setAttribute('stroke-width', '0.5');
    path.setAttribute('stroke-dasharray', '2,1');
    path.setAttribute('opacity', '0.4');
    path.setAttribute('pointer-events', 'none');
    svg.appendChild(path);

    var midIdx = Math.floor(points.length / 2);
    var midPoint = points[midIdx];
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', midPoint.x);
    text.setAttribute('y', midPoint.y - 1.2);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '2');
    text.setAttribute('fill', '#a8c0d0');
    text.setAttribute('font-family', 'Crimson Pro, "Noto Serif SC", serif');
    text.setAttribute('opacity', '0.5');
    text.setAttribute('pointer-events', 'none');
    text.textContent = loc.name;
    svg.appendChild(text);
}

function _hmDrawMountain(svg, loc) {
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('pointer-events', 'none');
    g.setAttribute('opacity', '0.35');

    var triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    triangle.setAttribute('points', (loc.x - 1.5) + ',' + (loc.y + 1) + ' ' + loc.x + ',' + (loc.y - 1.5) + ' ' + (loc.x + 1.5) + ',' + (loc.y + 1));
    triangle.setAttribute('fill', '#8a7d6a');
    triangle.setAttribute('stroke', 'none');
    g.appendChild(triangle);

    var peak = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    peak.setAttribute('points', (loc.x - 0.5) + ',' + (loc.y + 0.3) + ' ' + loc.x + ',' + (loc.y - 1) + ' ' + (loc.x + 0.5) + ',' + (loc.y + 0.3));
    peak.setAttribute('fill', '#a89880');
    peak.setAttribute('stroke', 'none');
    g.appendChild(peak);

    svg.appendChild(g);

    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', loc.x);
    text.setAttribute('y', loc.y + 2.8);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '1.8');
    text.setAttribute('fill', '#8a7d6a');
    text.setAttribute('font-family', 'Crimson Pro, "Noto Serif SC", serif');
    text.setAttribute('opacity', '0.5');
    text.setAttribute('pointer-events', 'none');
    text.textContent = loc.name;
    svg.appendChild(text);
}

function _hmDrawPass(svg, loc) {
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('pointer-events', 'none');
    g.setAttribute('opacity', '0.4');

    var square = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    var s = 0.8;
    square.setAttribute('points',
        (loc.x - s) + ',' + (loc.y - s) + ' ' +
        (loc.x + s) + ',' + (loc.y - s) + ' ' +
        (loc.x + s) + ',' + (loc.y + s) + ' ' +
        (loc.x - s) + ',' + (loc.y + s)
    );
    square.setAttribute('fill', 'none');
    square.setAttribute('stroke', '#8a7d6a');
    square.setAttribute('stroke-width', '0.3');
    g.appendChild(square);

    var inner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    inner.setAttribute('cx', loc.x);
    inner.setAttribute('cy', loc.y);
    inner.setAttribute('r', '0.4');
    inner.setAttribute('fill', '#8a7d6a');
    g.appendChild(inner);

    svg.appendChild(g);

    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', loc.x);
    text.setAttribute('y', loc.y + 2.5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '1.8');
    text.setAttribute('fill', '#8a7d6a');
    text.setAttribute('font-family', 'Crimson Pro, "Noto Serif SC", serif');
    text.setAttribute('opacity', '0.5');
    text.setAttribute('pointer-events', 'none');
    text.textContent = loc.name;
    svg.appendChild(text);
}

function _hmDrawGeoDot(svg, loc) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', loc.x);
    circle.setAttribute('cy', loc.y);
    circle.setAttribute('r', '0.8');
    circle.setAttribute('fill', 'url(#hm-dot-grad-geo)');
    circle.setAttribute('opacity', '0.35');
    circle.setAttribute('pointer-events', 'none');
    svg.appendChild(circle);

    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', loc.x);
    text.setAttribute('y', loc.y - 1.5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '1.8');
    text.setAttribute('fill', '#8a7d6a');
    text.setAttribute('font-family', 'Crimson Pro, "Noto Serif SC", serif');
    text.setAttribute('opacity', '0.5');
    text.setAttribute('pointer-events', 'none');
    text.textContent = loc.name;
    svg.appendChild(text);
}

function _hmDrawRouteLines(svg, routeSteps, unlocked) {
    if (routeSteps.length < 2) return;

    var locations = window.historyMapLocations || [];
    var locMap = {};
    for (var i = 0; i < locations.length; i++) {
        locMap[locations[i].id] = locations[i];
    }

    var points = [];
    for (var s = 0; s < routeSteps.length; s++) {
        var loc = locMap[routeSteps[s].locationId];
        if (loc) {
            points.push({ x: loc.x, y: loc.y, stepOrder: routeSteps[s].order });
        }
    }

    if (points.length < 2) return;

    var highlightUpTo = _hmJourneyMode ? _hmCurrentStep : routeSteps.length;

    var prevPoint = points[0];
    for (var p = 1; p < points.length; p++) {
        var segOrder = points[p].stepOrder;
        var isHighlighted = _hmJourneyMode && segOrder <= highlightUpTo;

        var pathD = 'M ' + prevPoint.x + ' ' + prevPoint.y + ' L ' + points[p].x + ' ' + points[p].y;
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathD);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-width', isHighlighted ? '0.7' : '0.4');
        path.setAttribute('opacity', isHighlighted ? '1' : '0.6');

        if (isHighlighted) {
            path.setAttribute('stroke', '#d4a017');
            path.setAttribute('stroke-dasharray', 'none');
        } else {
            path.setAttribute('stroke', '#b8a080');
            path.setAttribute('stroke-dasharray', '1,0.8');
        }

        svg.appendChild(path);
        prevPoint = points[p];
    }
}

function _hmDrawLocationDots(svg, locations, unlocked) {
    var unlockedSet = {};
    if (unlocked) {
        for (var i = 0; i < unlocked.locationIds.length; i++) {
            unlockedSet[unlocked.locationIds[i]] = true;
        }
    }

    var currentLocId = null;
    if (_hmJourneyMode) {
        var step = getRouteStepByOrder(_hmCurrentStep);
        if (step) currentLocId = step.locationId;
    }

    var visibleTypes = {};
    if (_hmActiveLayers.state) { visibleTypes['state'] = true; }
    if (_hmActiveLayers.event) { visibleTypes['event_place'] = true; }
    if (_hmActiveLayers.city) { visibleTypes['city'] = true; }

    for (var i = 0; i < locations.length; i++) {
        var loc = locations[i];
        if (loc.type === 'geo') continue;
        if (!visibleTypes[loc.type]) continue;

        var isUnlocked = _hmJourneyMode ? unlockedSet[loc.id] : true;
        var isCurrent = loc.id === currentLocId;
        var radius = loc.isCore ? 1.5 : 1.2;
        var shortName = loc.name.replace(/[（(].*?[）)]/, '');

        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'hm-location-dot');
        g.setAttribute('data-location-id', loc.id);
        g.setAttribute('data-dot-state', isCurrent ? 'current' : (isUnlocked ? 'unlocked' : 'locked'));
        g.setAttribute('data-dot-type', loc.type);
        g.setAttribute('role', 'button');
        g.setAttribute('aria-label', shortName + (isCurrent ? _hmT('（当前位置）', ' (Current)') : (isUnlocked ? '' : _hmT('（未解锁）', ' (Locked)'))));
        g.setAttribute('tabindex', isUnlocked ? '0' : '-1');
        g.style.cursor = isUnlocked ? 'pointer' : 'default';

        var outerR = radius + 0.6;
        var outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        outerCircle.setAttribute('cx', loc.x);
        outerCircle.setAttribute('cy', loc.y);
        outerCircle.setAttribute('r', outerR);
        outerCircle.setAttribute('fill', 'none');
        g.appendChild(outerCircle);

        var hitArea = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        hitArea.setAttribute('cx', loc.x);
        hitArea.setAttribute('cy', loc.y);
        hitArea.setAttribute('r', outerR + 2.5);
        hitArea.setAttribute('fill', 'transparent');
        g.appendChild(hitArea);

        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', loc.x);
        circle.setAttribute('cy', loc.y);
        circle.setAttribute('r', radius);
        g.appendChild(circle);

        if (isCurrent) {
            circle.setAttribute('fill', '#d4a017');
            circle.setAttribute('filter', 'url(#hm-dot-glow)');
            circle.setAttribute('stroke', '#fff');
            circle.setAttribute('stroke-width', '0.4');
            outerCircle.setAttribute('stroke', '#d4a017');
            outerCircle.setAttribute('stroke-width', '0.3');
            outerCircle.setAttribute('r', radius + 1);
            outerCircle.setAttribute('opacity', '0.7');
            outerCircle.classList.add('hm-current-pulse');
        } else if (isUnlocked) {
            if (loc.type === 'event_place') {
                circle.setAttribute('fill', 'url(#hm-dot-grad-event)');
                circle.setAttribute('filter', 'url(#hm-dot-glow)');
                outerCircle.setAttribute('stroke', '#d4a017');
                outerCircle.setAttribute('stroke-width', '0.2');
                outerCircle.setAttribute('opacity', '0.3');
            } else if (loc.type === 'city') {
                circle.setAttribute('fill', 'url(#hm-dot-grad-city)');
                circle.setAttribute('filter', 'url(#hm-dot-glow)');
                outerCircle.setAttribute('stroke', '#b8860b');
                outerCircle.setAttribute('stroke-width', '0.2');
                outerCircle.setAttribute('opacity', '0.3');
            } else {
                circle.setAttribute('fill', 'url(#hm-dot-grad)');
                circle.setAttribute('filter', 'url(#hm-dot-glow)');
                outerCircle.setAttribute('stroke', '#8b0000');
                outerCircle.setAttribute('stroke-width', '0.2');
                outerCircle.setAttribute('opacity', '0.3');
            }
        } else {
            circle.setAttribute('fill', 'url(#hm-dot-grad-locked)');
            circle.setAttribute('opacity', '0.25');
            outerCircle.setAttribute('stroke', '#a89880');
            outerCircle.setAttribute('stroke-width', '0.15');
            outerCircle.setAttribute('opacity', '0.15');
        }

        if (isUnlocked) {
            g.addEventListener('mouseenter', function(e) { _hmHandleDotHover(e, true); });
            g.addEventListener('mouseleave', function(e) { _hmHandleDotHover(e, false); });
            g.addEventListener('click', function(e) { _hmHandleDotClick(e); });
            g.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); _hmHandleDotClick(e); } });
        }

        svg.appendChild(g);
    }

    _hmDrawDotLabels(svg, locations, unlocked, currentLocId);
}

function _hmDrawDotLabels(svg, locations, unlocked, currentLocId) {
    var unlockedSet = {};
    if (unlocked) {
        for (var i = 0; i < unlocked.locationIds.length; i++) {
            unlockedSet[unlocked.locationIds[i]] = true;
        }
    }

    var visibleTypes = {};
    if (_hmActiveLayers.state) { visibleTypes['state'] = true; }
    if (_hmActiveLayers.event) { visibleTypes['event_place'] = true; }
    if (_hmActiveLayers.city) { visibleTypes['city'] = true; }

    for (var i = 0; i < locations.length; i++) {
        var loc = locations[i];
        if (loc.type === 'geo') continue;
        if (!visibleTypes[loc.type]) continue;

        var isUnlocked = _hmJourneyMode ? unlockedSet[loc.id] : true;
        var isCurrent = loc.id === currentLocId;

        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'hm-location-label');
        g.setAttribute('data-location-id', loc.id);
        g.setAttribute('pointer-events', 'none');

        var shortName = loc.name.replace(/[（(].*?[）)]/, '');

        var labelOffset = loc.isCore ? 3 : 2.5;
        var labelFontSize = loc.isCore ? 2.2 : 1.8;

        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', loc.x);
        text.setAttribute('y', loc.y - labelOffset);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', labelFontSize);
        text.setAttribute('fill', isCurrent ? '#b8860b' : (isUnlocked ? '#3e2723' : '#c0b8a4'));
        text.setAttribute('font-family', 'Crimson Pro, "Noto Serif SC", serif');
        text.setAttribute('font-weight', (loc.isCore || isCurrent) ? '600' : '400');
        text.textContent = shortName;
        g.appendChild(text);

        svg.appendChild(g);
    }
}

function _hmHandleDotHover(e, isEnter) {
    var tooltip = _hmEl('hmTooltip');
    if (!tooltip) return;

    if (isEnter) {
        var locId = e.currentTarget.getAttribute('data-location-id');
        if (tooltip._hmLastLocId === locId) return;
        tooltip._hmLastLocId = locId;
        var loc = getLocationById(locId);
        if (loc) {
            tooltip.textContent = loc.shortTip;
            tooltip.classList.remove('hidden');

            var mapArea = e.currentTarget.closest('.hm-map-area');
            if (!mapArea) return;
            var mapRect = mapArea.getBoundingClientRect();
            var mapW = mapRect.width;
            var mapH = mapRect.height;

            var tipX = (loc.x / 100) * mapW + 12;
            var tipY = (loc.y / 100) * mapH - 8;

            var tooltipW = 180;
            if (tipX + tooltipW > mapW - 16) {
                tipX = (loc.x / 100) * mapW - tooltipW - 8;
            }
            if (tipX < 16) {
                tipX = 16;
            }
            if (tipY < 16) {
                tipY = (loc.y / 100) * mapH + 12;
            }

            tooltip.style.left = tipX + 'px';
            tooltip.style.top = tipY + 'px';
        }
    } else {
        tooltip._hmLastLocId = null;
        tooltip.classList.add('hidden');
    }
}

function _hmHandleDotClick(e) {
    var locId = e.currentTarget.getAttribute('data-location-id');
    var loc = getLocationById(locId);
    if (!loc) return;

    _hmOpenLocation(loc);
}

function _hmUpdateDotHighlight() {
    var allDots = document.querySelectorAll('.hm-location-dot');
    var currentId = _hmSelectedLocation ? _hmSelectedLocation.id : null;

    for (var i = 0; i < allDots.length; i++) {
        var dotId = allDots[i].getAttribute('data-location-id');
        var state = allDots[i].getAttribute('data-dot-state');
        var loc = getLocationById(dotId);
        if (!loc) continue;

        var circle = allDots[i].querySelector('circle:nth-child(2)');
        var outer = allDots[i].querySelector('circle');
        if (!circle) continue;

        if (dotId === currentId) {
            circle.setAttribute('r', '2.2');
            circle.setAttribute('fill', '#d4a017');
            circle.setAttribute('stroke', '#fff');
            circle.setAttribute('stroke-width', '0.4');
            circle.setAttribute('filter', 'url(#hm-dot-glow)');
            circle.removeAttribute('opacity');
            if (outer) {
                outer.setAttribute('r', '3.2');
                outer.setAttribute('stroke', '#d4a017');
                outer.setAttribute('stroke-width', '0.3');
                outer.setAttribute('opacity', '0.7');
            }
        }
    }
}

function _hmBriefHighlightCurrent() {
    var currentLocId = null;
    if (_hmJourneyMode) {
        var step = getRouteStepByOrder(_hmCurrentStep);
        if (step) currentLocId = step.locationId;
    }
    if (!currentLocId) return;

    var allDots = document.querySelectorAll('.hm-location-dot[data-location-id="' + currentLocId + '"]');
    for (var i = 0; i < allDots.length; i++) {
        var dot = allDots[i];
        dot.style.transform = 'scale(1.4)';
        dot.style.transition = 'transform 0.3s ease';
        (function(d) {
            setTimeout(function() {
                d.style.transform = 'scale(1)';
            }, 600);
        })(dot);
    }
}

function _hmRenderJourneyBar() {
    var cardEl = _hmEl('hmJourneyCard');
    if (!cardEl) return;

    if (!_hmJourneyMode) {
        cardEl.classList.add('hidden');
        return;
    }

    var total = getTotalSteps();
    var step = getRouteStepByOrder(_hmCurrentStep);
    if (!step) return;

    cardEl.classList.remove('hidden');

    _hmEl('hmJourneyStepLabel').textContent = _hmT('第 ' + _hmCurrentStep + ' 站 / 共 ' + total + ' 站', 'Stop ' + _hmCurrentStep + ' of ' + total);
    _hmEl('hmJourneyTitle').textContent = _hmField(step, 'title', 'titleEn');
    _hmEl('hmJourneyPrompt').textContent = _hmField(step, 'prompt', 'promptEn');

    var btnPrev = _hmEl('hmBtnPrev');
    var btnNext = _hmEl('hmBtnNext');
    btnPrev.disabled = _hmCurrentStep <= 1;
    btnNext.disabled = _hmCurrentStep >= total;
    btnPrev.style.opacity = _hmCurrentStep <= 1 ? '0.4' : '1';
    btnNext.style.opacity = _hmCurrentStep >= total ? '0.4' : '1';

    if (_hmCurrentStep >= total) {
        btnNext.textContent = _hmT('旅程结束', 'Journey Complete');
    } else {
        btnNext.textContent = _hmT('继续前进', 'Continue');
    }

    var newContentEl = _hmEl('hmJourneyNewContent');
    var newHtml = '';

    var chrHandler = _hmCurrentTab === 'journey'
        ? function(chrId) { return 'hmSwitchTab(\'atlas\'); _hmAtlasView=\'detail\'; _hmSelectedCharacter=getCharacterById(\'' + chrId + '\'); _hmRenderAtlasDetail();'
            + '; return false;'; }
        : function(chrId) { return '_hmOpenCharacter(getCharacterById(\'' + chrId + '\'))'; };

    var evtHandler = _hmCurrentTab === 'journey'
        ? function(evtId) { return '_hmOpenEventFromJourney(getEventById(\'' + evtId + '\'))'; }
        : function(evtId) { return '_hmOpenEvent(getEventById(\'' + evtId + '\'))'; };

    if (step.unlockLocationIds && step.unlockLocationIds.length > 0) {
        newHtml += '<div class="hm-new-section">';
        newHtml += '<span class="hm-new-section-label">' + _hmT('解锁地点', 'New Places') + '</span>';
        for (var i = 0; i < step.unlockLocationIds.length; i++) {
            var loc = getLocationById(step.unlockLocationIds[i]);
            if (loc) {
                newHtml += '<span class="hm-new-item hm-new-location">' + _hmEscapeHtml(_hmField(loc, 'name', 'nameEn')) + '</span>';
            }
        }
        newHtml += '</div>';
    }

    if (step.unlockCharacterIds && step.unlockCharacterIds.length > 0) {
        newHtml += '<div class="hm-new-section">';
        newHtml += '<span class="hm-new-section-label">' + _hmT('遇见人物', 'People Met') + '</span>';
        for (var i = 0; i < step.unlockCharacterIds.length; i++) {
            var chr = getCharacterById(step.unlockCharacterIds[i]);
            if (chr) {
                newHtml += '<button class="hm-new-item hm-new-character" onclick="' + chrHandler(chr.id) + '">' + _hmEscapeHtml(_hmField(chr, 'name', 'nameEn')) + '</button>';
            }
        }
        newHtml += '</div>';
    }

    if (step.unlockEventIds && step.unlockEventIds.length > 0) {
        newHtml += '<div class="hm-new-section">';
        newHtml += '<span class="hm-new-section-label">' + _hmT('解锁事件', 'New Events') + '</span>';
        for (var i = 0; i < step.unlockEventIds.length; i++) {
            var evt = getEventById(step.unlockEventIds[i]);
            if (evt) {
                newHtml += '<button class="hm-new-item hm-new-event" onclick="' + evtHandler(evt.id) + '">' + _hmEscapeHtml(_hmField(evt, 'name', 'nameEn')) + '</button>';
            }
        }
        newHtml += '</div>';
    }

    newContentEl.innerHTML = newHtml;

    _hmRenderRouteOverview();
}

function _hmRenderRouteOverview() {
    var container = document.getElementById('hmRouteOverview');
    if (!container) return;
    var steps = window.historyMapRouteSteps || [];
    if (steps.length === 0) return;

    var locations = window.historyMapLocations || [];
    var locMap = {};
    for (var i = 0; i < locations.length; i++) {
        locMap[locations[i].id] = locations[i];
    }

    var html = '<div class="hm-route-overview-inner">';
    for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        var loc = locMap[step.locationId];
        var name = loc ? _hmField(loc, 'name', 'nameEn').replace(/[（(].*?[）)]/g, '') : step.locationId;
        var status = step.order < _hmCurrentStep ? 'done' : (step.order === _hmCurrentStep ? 'current' : 'locked');
        var label = status === 'done' ? '✓' : (status === 'current' ? '●' : '');

        html += '<div class="hm-route-step" data-status="' + status + '" onclick="hmJourneyGoToStep(' + step.order + ')">';
        html += '<div class="hm-route-dot"><span class="hm-route-dot-icon">' + label + '</span></div>';
        html += '<div class="hm-route-label">' + _hmEscapeHtml(name) + '</div>';
        if (i < steps.length - 1) {
            html += '<div class="hm-route-line" data-status="' + (step.order <= _hmCurrentStep ? 'done' : 'locked') + '"></div>';
        }
        html += '</div>';
    }
    html += '</div>';
    container.innerHTML = html;
}

function hmJourneyGoToStep(order) {
    var total = getTotalSteps();
    if (order < 1 || order > total) return;
    if (order > _hmCurrentStep) return;
    _hmCurrentStep = order;
    _hmSaveProgress();
    _hmRenderMap();
    _hmRenderJourneyBar();
    _hmRenderDetailPanel();
    _hmAutoSelectCurrentLocation();
}

function _hmRenderDetailPanel() {
    var container = _hmEl('hmDetailContent');
    if (!container) return;
    if (_hmCurrentView === 'map' || !_hmCurrentView) {
        container.innerHTML = '<p class="hm-detail-hint">' + _hmT('点击地图上的点位，查看地点详情', 'Click a location on the map to view details') + '</p>';
    } else if (_hmCurrentView === 'location' && _hmSelectedLocation) {
        _hmRenderLocationDetail(container);
    } else if (_hmCurrentView === 'event' && _hmSelectedEvent) {
        _hmRenderEventDetail(container);
    } else if (_hmCurrentView === 'character' && _hmSelectedCharacter) {
        _hmRenderCharacterDetail(container);
    }
}

function _hmBackToLocation() {
    if (_hmSelectedLocation) {
        _hmCurrentView = 'location';
        _hmSelectedEvent = null;
        _hmSelectedCharacter = null;
        var container = _hmEl('hmDetailContent');
        if (container) _hmRenderLocationDetail(container);
    }
}

function _hmBackToEvent() {
    if (_hmSelectedEvent) {
        _hmCurrentView = 'event';
        _hmSelectedCharacter = null;
        var container = _hmEl('hmDetailContent');
        if (container) _hmRenderEventDetail(container);
    }
}

function _hmRenderBreadcrumb(container) {
    var parts = [];

    parts.push('<button class="hm-breadcrumb-link" onclick="backToHistoryMapLanding()">' + _hmT('首页', 'Home') + '</button>');

    if (_hmSelectedLocation) {
        if (_hmCurrentView === 'location') {
            parts.push('<span class="hm-breadcrumb-sep">/</span>');
            parts.push('<span class="hm-breadcrumb-current">' + _hmEscapeHtml(_hmField(_hmSelectedLocation, 'name', 'nameEn')) + '</span>');
        } else {
            parts.push('<span class="hm-breadcrumb-sep">/</span>');
            parts.push('<button class="hm-breadcrumb-link" onclick="_hmOpenLocation(getLocationById(\'' + _hmSelectedLocation.id + '\'))">' + _hmEscapeHtml(_hmField(_hmSelectedLocation, 'name', 'nameEn')) + '</button>');
        }
    }

    if (_hmSelectedEvent && _hmCurrentView === 'event') {
        parts.push('<span class="hm-breadcrumb-sep">/</span>');
        parts.push('<span class="hm-breadcrumb-current">' + _hmEscapeHtml(_hmField(_hmSelectedEvent, 'name', 'nameEn')) + '</span>');
    }

    if (_hmSelectedCharacter && _hmCurrentView === 'character') {
        if (_hmSelectedEvent) {
            parts.push('<span class="hm-breadcrumb-sep">/</span>');
            parts.push('<button class="hm-breadcrumb-link" onclick="_hmOpenEvent(getEventById(\'' + _hmSelectedEvent.id + '\'))">' + _hmEscapeHtml(_hmField(_hmSelectedEvent, 'name', 'nameEn')) + '</button>');
        } else if (_hmSelectedLocation) {
            parts.push('<span class="hm-breadcrumb-sep">/</span>');
            parts.push('<span class="hm-breadcrumb-sep">/</span>');
            parts.push('<span class="hm-breadcrumb-current">' + _hmEscapeHtml(_hmField(_hmSelectedCharacter, 'name', 'nameEn')) + '</span>');
        }
    }

    container.innerHTML = '<div class="hm-breadcrumb">' + parts.join('') + '</div>';
}

function _hmRenderLocationDetail(container) {
    var loc = _hmSelectedLocation;
    if (!loc) return;

    var events = getEventsAtLocation(loc.id);

    var html = '';

    html += '<div class="hm-detail-header">';
    html += '<h3 class="hm-detail-title">' + _hmEscapeHtml(_hmField(loc, 'name', 'nameEn')) + '</h3>';
    html += '<span class="hm-detail-type">' + _hmGetTypeLabel(loc.type) + '</span>';
    html += '</div>';

    html += '<p class="hm-detail-short-tip">' + _hmEscapeHtml(_hmField(loc, 'shortTip', 'shortTipEn')) + '</p>';

    if (events.length > 0) {
        html += '<div class="hm-detail-section">';
        html += '<h4 class="hm-detail-section-title">' + _hmT('相关事件', 'Related Events') + '</h4>';
        html += '<div class="hm-event-list">';
        for (var i = 0; i < events.length; i++) {
            var evt = events[i];
            html += '<div class="hm-event-item hm-event-item-clickable" onclick="_hmOpenEvent(getEventById(\'' + evt.id + '\'))">';
            html += '<span class="hm-event-name">' + _hmEscapeHtml(_hmField(evt, 'name', 'nameEn')) + '</span>';
            html += '<span class="hm-event-summary">' + _hmEscapeHtml(_hmField(evt, 'summary', 'summaryEn')) + '</span>';
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';
    } else {
        html += '<p class="hm-detail-no-data">' + _hmT('该地点暂无相关事件', 'No related events for this location') + '</p>';
    }

    html += '<button class="hm-back-btn hm-detail-toggle-btn" onclick="_hmShowLocationDescription()">' + _hmT('查看详情 ∨', 'View Details ∨') + '</button>';

    container.innerHTML = html;
}

function _hmShowLocationDescription() {
    var loc = _hmSelectedLocation;
    if (!loc) return;
    var container = _hmEl('hmDetailContent');
    if (!container) return;

    var html = '';
    html += '<button class="hm-back-btn" onclick="_hmGoBackToEvents()">← ' + _hmT('收起', 'Close') + '</button>';
    html += '<div class="hm-detail-header">';
    html += '<h3 class="hm-detail-title">' + _hmEscapeHtml(_hmField(loc, 'name', 'nameEn')) + '</h3>';
    html += '<span class="hm-detail-type">' + _hmGetTypeLabel(loc.type) + '</span>';
    html += '</div>';
    html += '<p class="hm-detail-short-tip">' + _hmEscapeHtml(_hmField(loc, 'shortTip', 'shortTipEn')) + '</p>';
    html += '<p class="hm-detail-desc">' + _hmEscapeHtml(_hmField(loc, 'description', 'descriptionEn')) + '</p>';

    if (loc.analectsPassages && loc.analectsPassages.length > 0) {
        html += '<div class="hm-detail-section">';
        html += '<h4 class="hm-detail-section-title">' + _hmT('相关《论语》章句', 'Related Analects Passages') + '</h4>';
        html += '<div class="hm-analects-list">';
        for (var api = 0; api < loc.analectsPassages.length; api++) {
            var ap = loc.analectsPassages[api];
            html += '<div class="hm-analects-item">';
            html += '<p class="hm-analects-text">' + _hmEscapeHtml(ap.text) + '</p>';
            html += '<span class="hm-analects-source">' + _hmEscapeHtml(ap.source) + '</span>';
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';
    }

    if (loc.whyItMatters) {
        html += '<div class="hm-detail-section">';
        html += '<h4 class="hm-detail-section-title">' + _hmT('为什么重要', 'Why It Matters') + '</h4>';
        html += '<p class="hm-detail-desc" style="font-style:italic;">' + _hmEscapeHtml(loc.whyItMatters) + '</p>';
        html += '</div>';
    }

    container.innerHTML = html;
}

function _hmGoBackToEvents() {
    var container = _hmEl('hmDetailContent');
    if (container) _hmRenderLocationDetail(container);
}

function _hmRenderEventDetail(container) {
    var evt = _hmSelectedEvent;
    if (!evt) return;

    var evtLoc = getLocationById(evt.locationId);
    var characters = getCharactersInEvent(evt.id);

    var html = '';
    if (evtLoc) {
        html += '<button class="hm-back-btn" onclick="_hmBackToLocation()">← ' + _hmT('返回', 'Back') + '</button>';
    }

    html += '<div class="hm-detail-header">';
    html += '<h3 class="hm-detail-title">' + _hmEscapeHtml(_hmField(evt, 'name', 'nameEn')) + '</h3>';
    if (evtLoc) {
        html += '<span class="hm-detail-type">' + _hmEscapeHtml(_hmField(evtLoc, 'name', 'nameEn')) + '</span>';
    }
    html += '</div>';

    html += '<p class="hm-detail-short-tip">' + _hmEscapeHtml(_hmField(evt, 'summary', 'summaryEn')) + '</p>';

    html += '<p class="hm-detail-desc">' + _hmEscapeHtml(_hmField(evt, 'detail', 'detailEn')) + '</p>';

    if (evt.source) {
        html += '<div class="hm-detail-section">';
        html += '<h4 class="hm-detail-section-title">' + _hmT('史料来源', 'Historical Source') + '</h4>';
        html += '<p class="hm-source-text">' + _hmEscapeHtml(evt.source) + '</p>';
        html += '</div>';
    }

    if (characters.length > 0) {
        html += '<div class="hm-detail-section">';
        html += '<h4 class="hm-detail-section-title">' + _hmT('涉及人物', 'Figures Involved') + '</h4>';
        html += '<div class="hm-character-list">';
        for (var i = 0; i < characters.length; i++) {
            var chr = characters[i];
            html += '<div class="hm-character-chip hm-character-chip-clickable" onclick="_hmOpenCharacter(getCharacterById(\'' + chr.id + '\'))">';
            html += '<span class="hm-character-chip-name">' + _hmEscapeHtml(_hmField(chr, 'name', 'nameEn')) + '</span>';
            html += '<span class="hm-character-chip-identity">' + _hmEscapeHtml(_hmGetIdentityLabel(chr.identity)) + '</span>';
            if (chr.title || chr.titleEn) {
                html += '<span class="hm-character-chip-alias">' + _hmEscapeHtml(_hmField(chr, 'title', 'titleEn')) + '</span>';
            }
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';
    }

    container.innerHTML = html;
}

function _hmRenderCharacterDetail(container) {
    var chr = _hmSelectedCharacter;
    if (!chr) return;

    var html = '';
    html += '<button class="hm-back-btn" onclick="_hmBackToEvent()">← ' + _hmT('返回事件', 'Back to Event') + '</button>';

    html += '<div class="hm-detail-header">';
    html += '<h3 class="hm-detail-title">' + _hmEscapeHtml(_hmField(chr, 'name', 'nameEn')) + '</h3>';
    html += '<span class="hm-detail-type">' + _hmEscapeHtml(_hmGetIdentityLabel(chr.identity)) + '</span>';
    if (chr.title || chr.titleEn) {
        html += '<span class="hm-character-detail-title">' + _hmEscapeHtml(_hmField(chr, 'title', 'titleEn')) + '</span>';
    }
    html += '</div>';

    if (chr.alias) {
        html += '<p class="hm-character-detail-alias">' + _hmEscapeHtml(_hmField(chr, 'alias', 'aliasEn')) + '</p>';
    }

    html += '<p class="hm-detail-desc">' + _hmEscapeHtml(_hmField(chr, 'description', 'descriptionEn')) + '</p>';
    container.innerHTML = html;
}

function _hmOpenEventFromJourney(evt) {
    _hmSelectedEvent = evt;
    _hmCurrentView = 'event';
    var container = _hmEl('hmDetailContent');
    if (!container) return;

    var evtLoc = getLocationById(evt.locationId);
    var characters = getCharactersInEvent(evt.id);

    var html = '';

    html += '<div class="hm-detail-header">';
    html += '<h3 class="hm-detail-title">' + _hmEscapeHtml(_hmField(evt, 'name', 'nameEn')) + '</h3>';
    if (evtLoc) {
        html += '<span class="hm-detail-type">' + _hmEscapeHtml(_hmField(evtLoc, 'name', 'nameEn')) + '</span>';
    }
    html += '</div>';

    html += '<p class="hm-detail-short-tip">' + _hmEscapeHtml(_hmField(evt, 'summary', 'summaryEn')) + '</p>';
    html += '<p class="hm-detail-desc">' + _hmEscapeHtml(_hmField(evt, 'detail', 'detailEn')) + '</p>';

    if (evt.source) {
        html += '<div class="hm-detail-section">';
        html += '<h4 class="hm-detail-section-title">' + _hmT('史料来源', 'Historical Source') + '</h4>';
        html += '<p class="hm-source-text">' + _hmEscapeHtml(evt.source) + '</p>';
        html += '</div>';
    }

    if (characters.length > 0) {
        html += '<div class="hm-detail-section">';
        html += '<h4 class="hm-detail-section-title">' + _hmT('涉及人物', 'Figures Involved') + '</h4>';
        html += '<div class="hm-character-list">';
        for (var i = 0; i < characters.length; i++) {
            var chr = characters[i];
            html += '<div class="hm-character-chip hm-character-chip-clickable" onclick="hmSwitchTab(\'atlas\'); _hmAtlasView=\'detail\'; _hmSelectedCharacter=getCharacterById(\'' + chr.id + '\'); _hmRenderAtlasDetail();">';
            html += '<span class="hm-character-chip-name">' + _hmEscapeHtml(_hmField(chr, 'name', 'nameEn')) + '</span>';
            html += '<span class="hm-character-chip-identity">' + _hmEscapeHtml(_hmGetIdentityLabel(chr.identity)) + '</span>';
            if (chr.title || chr.titleEn) {
                html += '<span class="hm-character-chip-alias">' + _hmEscapeHtml(_hmField(chr, 'title', 'titleEn')) + '</span>';
            }
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';
    }

    container.innerHTML = html;
}

function _hmRenderJourneyLocationDetail(container) {
    var step = getRouteStepByOrder(_hmCurrentStep);
    if (!step) return;
    var loc = getLocationById(step.locationId);
    if (!loc) return;

    _hmSelectedLocation = loc;
    var characters = getCharactersAtLocation(loc.id);
    var events = getEventsAtLocation(loc.id);

    var html = '';

    html += '<div class="hm-detail-header">';
    html += '<h3 class="hm-detail-title">' + _hmEscapeHtml(_hmField(loc, 'name', 'nameEn')) + '</h3>';
    html += '<span class="hm-detail-type">' + _hmGetTypeLabel(loc.type) + '</span>';
    if (loc.isCore) {
        html += '<span class="hm-core-badge">' + _hmT('核心路线', 'Core Route') + '</span>';
    }
    html += '</div>';

    html += '<p class="hm-detail-short-tip">' + _hmEscapeHtml(_hmField(loc, 'shortTip', 'shortTipEn')) + '</p>';
    html += '<p class="hm-detail-desc">' + _hmEscapeHtml(_hmField(loc, 'description', 'descriptionEn')) + '</p>';

    if (events.length > 0) {
        html += '<div class="hm-detail-section">';
        html += '<h4 class="hm-detail-section-title">' + _hmT('相关事件', 'Related Events') + '</h4>';
        html += '<div class="hm-event-list">';
        for (var i = 0; i < events.length; i++) {
            var evt = events[i];
            html += '<div class="hm-event-item hm-event-item-clickable" onclick="_hmOpenEventFromJourney(getEventById(\'' + evt.id + '\'))">';
            html += '<span class="hm-event-name">' + _hmEscapeHtml(_hmField(evt, 'name', 'nameEn')) + '</span>';
            html += '<span class="hm-event-summary">' + _hmEscapeHtml(_hmField(evt, 'summary', 'summaryEn')) + '</span>';
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';
    }

    if (characters.length > 0) {
        html += '<div class="hm-detail-section">';
        html += '<h4 class="hm-detail-section-title">' + _hmT('相关人物', 'Related Figures') + '</h4>';
        html += '<div class="hm-character-list">';
        for (var i = 0; i < characters.length; i++) {
            var chr = characters[i];
            html += '<div class="hm-character-chip hm-character-chip-clickable" onclick="hmSwitchTab(\'atlas\'); _hmAtlasView=\'detail\'; _hmSelectedCharacter=getCharacterById(\'' + chr.id + '\'); _hmRenderAtlasDetail();">';
            html += '<span class="hm-character-chip-name">' + _hmEscapeHtml(_hmField(chr, 'name', 'nameEn')) + '</span>';
            html += '<span class="hm-character-chip-identity">' + _hmEscapeHtml(_hmGetIdentityLabel(chr.identity)) + '</span>';
            if (chr.title || chr.titleEn) {
                html += '<span class="hm-character-chip-alias">' + _hmEscapeHtml(_hmField(chr, 'title', 'titleEn')) + '</span>';
            }
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';
    }

    html += '<button class="hm-back-btn hm-detail-toggle-btn" onclick="_hmShowLocationDescription()">' + _hmT('查看详情 ∨', 'View Details ∨') + '</button>';

    container.innerHTML = html;
}

function _hmResetDetailPanel() {
    _hmCurrentView = 'map';
    _hmSelectedLocation = null;
    _hmSelectedEvent = null;
    _hmSelectedCharacter = null;
    var container = _hmEl('hmDetailContent');
    if (container) {
        container.innerHTML = '<p class="hm-detail-hint">' + _hmT('点击地图上的点位，查看地点详情', 'Click a location on the map to view details') + '</p>';
    }
}

function _hmRenderAtlas() {
    if (_hmAtlasView === 'detail') {
        _hmRenderAtlasDetail();
        return;
    }

    var characters = window.historyMapCharacters || [];
    var atlasStep = _hmJourneyMode ? _hmCurrentStep : getTotalSteps();
    var unlocked = _hmComputeUnlocked(atlasStep);
    var unlockedSet = {};
    for (var i = 0; i < unlocked.characterIds.length; i++) {
        unlockedSet[unlocked.characterIds[i]] = true;
    }

    // 构建筛选按钮
    var filterEl = document.getElementById('hmAtlasFilters');
    if (filterEl) {
        var filterDefs = [
            { key: 'all', label: _hmT('全部', 'All') },
            { key: 'disciple', label: _hmT('弟子', 'Disciple') },
            { key: 'ruler', label: _hmT('诸侯', 'Ruler') },
            { key: 'minister', label: _hmT('大夫', 'Minister') },
            { key: 'other', label: _hmT('其他', 'Other') }
        ];
        var html = '<div class="hm-atlas-filter-group">';
        for (var i = 0; i < filterDefs.length; i++) {
            var d = filterDefs[i];
            var active = _hmAtlasFilter === d.key ? ' active' : '';
            html += '<button class="hm-atlas-filter-btn' + active + '" onclick="_hmAtlasFilter=\'' + d.key + '\'; _hmRenderAtlas();">' + d.label + '</button>';
        }
        html += '</div>';
        html += '<div class="hm-atlas-filter-group">';
        var unlockDefs = [
            { key: 'all', label: _hmT('全部', 'All') },
            { key: 'unlocked', label: _hmT('已解锁', 'Unlocked') },
            { key: 'locked', label: _hmT('未解锁', 'Locked') }
        ];
        for (var i = 0; i < unlockDefs.length; i++) {
            var d = unlockDefs[i];
            var active = _hmAtlasUnlockFilter === d.key ? ' active' : '';
            html += '<button class="hm-atlas-filter-btn' + active + '" onclick="_hmAtlasUnlockFilter=\'' + d.key + '\'; _hmRenderAtlas();">' + d.label + '</button>';
        }
        html += '</div>';
        filterEl.innerHTML = html;
    }

    // 搜索关键词
    var searchEl = document.getElementById('hmAtlasSearch');
    var searchTerm = searchEl ? searchEl.value.trim().toLowerCase() : '';

    // 筛选 & 搜索
    var filtered = [];
    for (var i = 0; i < characters.length; i++) {
        var chr = characters[i];
        var isUnlocked = unlockedSet[chr.id];

        if (_hmAtlasFilter !== 'all' && chr.identity !== _hmAtlasFilter) continue;
        if (_hmAtlasUnlockFilter === 'unlocked' && !isUnlocked) continue;
        if (_hmAtlasUnlockFilter === 'locked' && isUnlocked) continue;

        if (searchTerm) {
            var match = chr.name.toLowerCase().indexOf(searchTerm) !== -1 ||
                (chr.nameEn && chr.nameEn.toLowerCase().indexOf(searchTerm) !== -1) ||
                (chr.alias && chr.alias.toLowerCase().indexOf(searchTerm) !== -1) ||
                (chr.title && chr.title.toLowerCase().indexOf(searchTerm) !== -1) ||
                (chr.titleEn && chr.titleEn.toLowerCase().indexOf(searchTerm) !== -1);
            if (!match) continue;
        }

        filtered.push(chr);
    }

    var gridEl = document.getElementById('hmAtlasGrid');
    if (!gridEl) return;

    var html = '';

    for (var i = 0; i < filtered.length; i++) {
        var chr = filtered[i];
        var isUnlocked = unlockedSet[chr.id];

        html += '<div class="hm-atlas-card ' + (isUnlocked ? 'unlocked' : 'locked') + '" ' + (isUnlocked ? 'onclick="_hmOpenAtlasCharacter(\'' + chr.id + '\')"' : '') + '>';
        html += '<div class="hm-atlas-card-header">';
        html += '<div class="hm-atlas-avatar">' + _hmEscapeHtml(chr.name.charAt(0)) + '</div>';
        html += '<div class="hm-atlas-card-info">';
        html += '<div class="hm-atlas-card-name">' + (isUnlocked ? _hmEscapeHtml(_hmField(chr, 'name', 'nameEn')) : _hmT('未解锁人物', 'Locked Character')) + '</div>';
        if (chr.alias && isUnlocked) {
            html += '<div class="hm-atlas-card-alias">' + _hmEscapeHtml(_hmField(chr, 'alias', 'aliasEn')) + '</div>';
        }
        if ((chr.title || chr.titleEn) && isUnlocked) {
            html += '<div class="hm-atlas-card-title">' + _hmEscapeHtml(_hmField(chr, 'title', 'titleEn')) + '</div>';
        }
        html += '</div>';
        html += '</div>';

        if (isUnlocked) {
            html += '<div class="hm-atlas-card-identity">' + _hmEscapeHtml(_hmGetIdentityLabel(chr.identity)) + '</div>';
        } else {
            html += '<div class="hm-atlas-card-locked-hint">' + _hmT('继续游历后解锁', 'Unlock by continuing your journey') + '</div>';
        }

        html += '</div>';
    }

    gridEl.innerHTML = html;

    _hmUpdateAtlasProgress();
}

function _hmUpdateAtlasProgress() {
    var characters = window.historyMapCharacters || [];
    var atlasStep = _hmJourneyMode ? _hmCurrentStep : getTotalSteps();
    var unlocked = _hmComputeUnlocked(atlasStep);
    var count = unlocked.characterIds.length;
    var total = characters.length;

    var countEl = document.getElementById('hmAtlasProgressCount');
    var fillEl = document.getElementById('hmAtlasProgressFill');

    if (countEl) {
        countEl.textContent = count + ' / ' + total;
    }
    if (fillEl) {
        var pct = total > 0 ? (count / total * 100) : 0;
        fillEl.style.width = pct + '%';
    }
}

function _hmOpenAtlasCharacter(chrId) {
    var chr = getCharacterById(chrId);
    if (!chr) return;

    _hmSelectedCharacter = chr;
    _hmAtlasView = 'detail';
    _hmRenderAtlasDetail();
}

function _hmRenderAtlasDetail() {
    var chr = _hmSelectedCharacter;
    if (!chr) return;

    var gridEl = document.getElementById('hmAtlasGrid');
    if (!gridEl) return;

    var html = '';

    html += '<button class="hm-atlas-back-btn" onclick="_hmAtlasView=\'grid\'; _hmRenderAtlas();">' + _hmT('返回图鉴列表', 'Back to Atlas') + '</button>';

    html += '<div class="hm-atlas-detail-header">';
    html += '<div class="hm-atlas-detail-avatar">' + _hmEscapeHtml(chr.name.charAt(0)) + '</div>';
    html += '<div class="hm-atlas-detail-info">';
    html += '<h3>' + _hmEscapeHtml(_hmField(chr, 'name', 'nameEn')) + '</h3>';
    if (chr.alias) {
        html += '<p class="hm-atlas-detail-alias">' + _hmEscapeHtml(_hmField(chr, 'alias', 'aliasEn')) + '</p>';
    }
    if (chr.title || chr.titleEn) {
        html += '<span class="hm-atlas-detail-title">' + _hmEscapeHtml(_hmField(chr, 'title', 'titleEn')) + '</span>';
    }
    html += '</div>';
    html += '</div>';

    html += '<div class="hm-atlas-detail-desc">' + _hmEscapeHtml(_hmField(chr, 'description', 'descriptionEn')) + '</div>';

    if (chr.relatedLocationIds && chr.relatedLocationIds.length > 0) {
        html += '<div class="hm-atlas-detail-section">';
        html += '<h4 class="hm-atlas-detail-section-title">' + _hmT('相关地点', 'Related Places') + '</h4>';
        html += '<div class="hm-atlas-detail-links">';
        for (var i = 0; i < chr.relatedLocationIds.length; i++) {
            var loc = getLocationById(chr.relatedLocationIds[i]);
            if (loc) {
                html += '<button class="hm-atlas-detail-link hm-link-location" onclick="_hmOpenLocationFromAtlas(\'' + loc.id + '\')">' + _hmEscapeHtml(_hmField(loc, 'name', 'nameEn')) + '</button>';
            }
        }
        html += '</div>';
        html += '</div>';
    }

    if (chr.relatedEventIds && chr.relatedEventIds.length > 0) {
        html += '<div class="hm-atlas-detail-section">';
        html += '<h4 class="hm-atlas-detail-section-title">' + _hmT('相关事件', 'Related Events') + '</h4>';
        html += '<div class="hm-atlas-detail-links">';
        for (var i = 0; i < chr.relatedEventIds.length; i++) {
            var evt = getEventById(chr.relatedEventIds[i]);
            if (evt) {
                html += '<button class="hm-atlas-detail-link hm-link-event" onclick="_hmOpenEventFromAtlas(\'' + evt.id + '\')">' + _hmEscapeHtml(_hmField(evt, 'name', 'nameEn')) + '</button>';
            }
        }
        html += '</div>';
        html += '</div>';
    }

    html += '<div class="hm-atlas-unlock-step">' + _hmT('首次解锁站点：第 ', 'First unlocked at stop ') + chr.unlockStep + _hmT(' 站', '') + '</div>';

    gridEl.innerHTML = html;
}

function _hmOpenLocationFromAtlas(locId) {
    var loc = getLocationById(locId);
    if (!loc) return;

    hmSwitchTab('map');
    _hmSelectedLocation = loc;
    _hmCurrentView = 'location';
    _hmUpdateDotHighlight();
    _hmRenderDetailPanel();
}

function _hmOpenEventFromAtlas(evtId) {
    var evt = getEventById(evtId);
    if (!evt) return;

    hmSwitchTab('map');
    _hmSelectedEvent = evt;
    var loc = getLocationById(evt.locationId);
    if (loc) {
        _hmSelectedLocation = loc;
    }
    _hmCurrentView = 'event';
    _hmRenderDetailPanel();
}

/**
 * ============================================================
 * 公共渲染 API — 可供外部调用，支持指定任意容器 ID
 * ============================================================
 */

/**
 * 渲染图层开关到指定容器
 * @param {string|HTMLElement} container - 容器 ID 或 DOM 元素
 * @param {Object} [activeLayers] - 图层初始状态
 */
function renderLayerControls(container, activeLayers) {
    var el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    var layers = activeLayers || _hmActiveLayers;
    var html = '';
    var defs = [
        { key: 'state', label: _hmT('国家', 'States') },
        { key: 'route', label: _hmT('路线', 'Route') },
        { key: 'event', label: _hmT('事件', 'Events') },
        { key: 'geo', label: _hmT('山河关隘', 'Landmarks') },
        { key: 'city', label: _hmT('城邑', 'Cities') }
    ];
    for (var i = 0; i < defs.length; i++) {
        var d = defs[i];
        var checked = layers[d.key] ? 'checked' : '';
        html += '<label class="hm-layer-toggle" data-layer="' + d.key + '">';
        html += '<input type="checkbox" ' + checked + ' onchange="hmToggleLayer(\'' + d.key + '\')">';
        html += '<span>' + d.label + '</span>';
        html += '</label>';
    }
    el.innerHTML = html;
}

/**
 * 渲染图例到指定容器
 * @param {string|HTMLElement} container - 容器 ID 或 DOM 元素
 */
function renderLegend(container) {
    var el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    var html = '';
    html += '<div class="hm-legend-title">' + _hmT('图例', 'Legend') + '</div>';
    html += '<div class="hm-legend-item"><span class="hm-legend-dot hm-legend-dot-state"></span><span>' + _hmT('国家', 'States') + '</span></div>';
    html += '<div class="hm-legend-item"><span class="hm-legend-dot hm-legend-dot-city"></span><span>' + _hmT('城邑', 'Cities') + '</span></div>';
    html += '<div class="hm-legend-item"><span class="hm-legend-dot hm-legend-dot-event"></span><span>' + _hmT('事件', 'Events') + '</span></div>';
    html += '<div class="hm-legend-item"><span class="hm-legend-dot hm-legend-dot-geo"></span><span>' + _hmT('山河关隘', 'Landmarks') + '</span></div>';
    html += '<div class="hm-legend-item hm-legend-line"><span class="hm-legend-line-seg"></span><span>' + _hmT('孔子路线', "Confucius' Route") + '</span></div>';
    el.innerHTML = html;
}

/**
 * 渲染免责声明到指定容器
 * @param {string|HTMLElement} container - 容器 ID 或 DOM 元素
 */
function renderDisclaimer(container) {
    var el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    el.textContent = _hmT('本地图为春秋列国教学示意图，疆域和位置用于学习展示，不代表精确历史地理边界。', 'This map is a teaching diagram of the Spring and Autumn states; borders and positions are for learning display and do not represent precise historical geography.');
}

/**
 * 渲染完整历史地图（SVG + 图层开关 + 图例 + 免责声明）到指定容器
 * @param {string|HTMLElement} container - 容器 ID 或 DOM 元素（含 SVG 子元素）
 * @param {Object} [options] - 配置项 { locations, routeSteps, unlocked, activeLayers }
 */
function renderHistoryMap(container, options) {
    var el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    options = options || {};
    var svgEl = el.querySelector('svg');
    if (svgEl) {
        var locations = options.locations || window.historyMapLocations || [];
        var routeSteps = options.routeSteps || window.historyMapRouteSteps || [];
        var unlocked = options.unlocked || null;
        var activeLayers = options.activeLayers || _hmActiveLayers;
        svgEl.innerHTML = '';
        _hmBuildDefs(svgEl);
        _hmDrawBackground(svgEl);
        _hmDrawStateLabels(svgEl);
        if (activeLayers.geo) _hmDrawGeoFeatures(svgEl, locations, unlocked);
        if (activeLayers.route) _hmDrawRouteLines(svgEl, routeSteps, unlocked);
        _hmDrawLocationDots(svgEl, locations, unlocked);
    }
}

/**
 * 渲染游历卡片到指定容器
 * @param {string|HTMLElement} container - 容器 ID 或 DOM 元素
 * @param {Object} [options] - { step, total, journeyMode }
 */
function renderJourneyCard(container, options) {
    var el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    options = options || {};
    var step = options.step || getRouteStepByOrder(_hmCurrentStep);
    var total = options.total || getTotalSteps();
    if (!step) return;
    el.innerHTML =
        '<div class="hm-journey-header">' +
            '<span class="hm-journey-step-label">' + _hmT('第 ' + _hmCurrentStep + ' 站 / 共 ' + total + ' 站', 'Stop ' + _hmCurrentStep + ' of ' + total) + '</span>' +
            '<h3 class="hm-journey-title">' + _hmEscapeHtml(_hmField(step, 'title', 'titleEn')) + '</h3>' +
        '</div>' +
        '<p class="hm-journey-prompt">' + _hmEscapeHtml(_hmField(step, 'prompt', 'promptEn')) + '</p>';
}

/**
 * 渲染详情面板到指定容器
 * @param {string|HTMLElement} container - 容器 ID 或 DOM 元素
 * @param {Object} [options] - { view, location, event, character }
 */
function renderDetailPanel(container, options) {
    if (!options) { _hmRenderDetailPanel(); return; }
    var el = typeof container === 'string' ? document.getElementById(container) : container;
    if (!el) return;
    el.innerHTML = '<p class="hm-detail-hint">' + _hmEscapeHtml(options.hint || _hmT('点击地图上的点位，查看地点详情', 'Click a location on the map to view details')) + '</p>';
}

// ===== 初始化：对每个 tab 渲染共享的图层控件和图例 =====
function _hmRenderLayoutComponents() {
    renderLayerControls('hmLayerControls');
    renderLegend('hmLegend');
    renderDisclaimer('hmDisclaimerMap');
    renderDisclaimer('hmDisclaimerJourney');

    var totalSteps = getTotalSteps();
    var totalChars = (window.historyMapCharacters || []).length;
    var stepLabel = document.getElementById('hmJourneyStepLabel');
    var progressCount = document.getElementById('hmAtlasProgressCount');
    if (stepLabel) stepLabel.textContent = _hmT('第 1 站 / 共 ' + totalSteps + ' 站', 'Stop 1 of ' + totalSteps);
    if (progressCount) progressCount.textContent = '0 / ' + totalChars;

    // 继续上次游历按钮
    var saved = _hmLoadProgress();
    var continueBtn = document.getElementById('hmContinueBtn');
    if (continueBtn) {
        if (saved && saved.journeyMode && saved.currentStepOrder > 1) {
            var step = getRouteStepByOrder(saved.currentStepOrder);
            var stepName = step ? _hmField(step, 'title', 'titleEn') : _hmT('第 ' + saved.currentStepOrder + ' 站', 'Stop ' + saved.currentStepOrder);
            continueBtn.textContent = _hmT('继续上次游历 · ' + stepName, 'Continue · ' + stepName);
            continueBtn.style.display = '';
        } else {
            continueBtn.textContent = _hmT('开始游历', 'Start Journey');
            continueBtn.style.display = '';
        }
    }
}

/* ========== 详情面板关闭按钮 ========== */
function hmCloseDetail() {
    _hmResetDetailPanel();
}

function _hmInitDetailCloseObserver() {
    var container = _hmEl('hmDetailContent');
    if (!container) return;

    var observer = new MutationObserver(function() {
        var isDefault = container.children.length === 1 && container.querySelector('.hm-detail-hint');
        var existing = container.querySelector('.hm-detail-close');
        if (isDefault) {
            if (existing) existing.remove();
        } else {
            if (!existing) {
                var btn = document.createElement('button');
                btn.className = 'hm-detail-close';
                btn.textContent = '×';
                btn.onclick = hmCloseDetail;
                container.appendChild(btn);
            }
        }
    });

    observer.observe(container, { childList: true, subtree: true });
}

/* ========== 地图缩放 ========== */
var _hmZoom = 1;
var _hmZoomMin = 0.5;
var _hmZoomMax = 4;
var _hmZoomStep = 1.3;

function _hmApplyZoom() {
    var svg = _hmEl('hmSvg');
    if (!svg) return;
    var size = 100 / _hmZoom;
    var offset = (100 - size) / 2;
    svg.setAttribute('viewBox', offset + ' ' + offset + ' ' + size + ' ' + size);

    var label = _hmEl('hmZoomLevel');
    if (label) label.textContent = Math.round(_hmZoom * 100) + '%';
}

function hmZoomIn() {
    if (_hmZoom < _hmZoomMax) {
        _hmZoom = Math.min(_hmZoom * _hmZoomStep, _hmZoomMax);
        _hmApplyZoom();
    }
}

function hmZoomOut() {
    if (_hmZoom > _hmZoomMin) {
        _hmZoom = Math.max(_hmZoom / _hmZoomStep, _hmZoomMin);
        _hmApplyZoom();
    }
}

function hmZoomReset() {
    _hmZoom = 1;
    _hmApplyZoom();
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.historyMapLocations && window.historyMapLocations.length > 0) {
        console.log(_hmT('[历史地理] 数据已加载，共 ', '[History Map] Data loaded, ') + window.historyMapLocations.length + _hmT(' 个地点', ' locations'));
    }
    _hmRenderLayoutComponents();
    _hmApplyZoom();
    _hmInitDetailCloseObserver();
});
