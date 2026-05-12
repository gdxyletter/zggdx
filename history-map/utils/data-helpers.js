/**
 * 历史地理 / 孔子周游列国 — 数据工具函数
 *
 * 提供对地点、人物、事件、路线数据的查询和组合操作。
 * 所有数据依赖全局变量（window.historyMapLocations 等）。
 */

/**
 * 根据 ID 获取地点
 * @param {string} id 地点 ID
 * @returns {Location|undefined}
 */
function getLocationById(id) {
    var locations = window.historyMapLocations || [];
    for (var i = 0; i < locations.length; i++) {
        if (locations[i].id === id) {
            return locations[i];
        }
    }
    return undefined;
}

/**
 * 根据 ID 获取人物
 * @param {string} id 人物 ID
 * @returns {Character|undefined}
 */
function getCharacterById(id) {
    var characters = window.historyMapCharacters || [];
    for (var i = 0; i < characters.length; i++) {
        if (characters[i].id === id) {
            return characters[i];
        }
    }
    return undefined;
}

/**
 * 根据 ID 获取事件
 * @param {string} id 事件 ID
 * @returns {Event|undefined}
 */
function getEventById(id) {
    var events = window.historyMapEvents || [];
    for (var i = 0; i < events.length; i++) {
        if (events[i].id === id) {
            return events[i];
        }
    }
    return undefined;
}

/**
 * 根据步骤序号获取路线步骤
 * @param {number} order 步骤序号（1-12）
 * @returns {RouteStep|undefined}
 */
function getRouteStepByOrder(order) {
    var steps = window.historyMapRouteSteps || [];
    for (var i = 0; i < steps.length; i++) {
        if (steps[i].order === order) {
            return steps[i];
        }
    }
    return undefined;
}

/**
 * 获取总路线步骤数
 * @returns {number}
 */
function getTotalSteps() {
    var steps = window.historyMapRouteSteps || [];
    return steps.length;
}

/**
 * 获取指定步骤之前（含当前步骤）解锁的所有地点
 * @param {number} upToStep 步骤序号
 * @returns {Location[]}
 */
function getUnlockedLocations(upToStep) {
    var locations = [];
    var seen = {};
    var steps = window.historyMapRouteSteps || [];
    for (var i = 0; i < steps.length; i++) {
        if (steps[i].order > upToStep) break;
        var ids = steps[i].unlockLocationIds || [];
        for (var j = 0; j < ids.length; j++) {
            if (!seen[ids[j]]) {
                seen[ids[j]] = true;
                var loc = getLocationById(ids[j]);
                if (loc) locations.push(loc);
            }
        }
    }
    return locations;
}

/**
 * 获取指定步骤之前（含当前步骤）解锁的所有人物
 * @param {number} upToStep 步骤序号
 * @returns {Character[]}
 */
function getUnlockedCharacters(upToStep) {
    var characters = [];
    var seen = {};
    var steps = window.historyMapRouteSteps || [];
    for (var i = 0; i < steps.length; i++) {
        if (steps[i].order > upToStep) break;
        var ids = steps[i].unlockCharacterIds || [];
        for (var j = 0; j < ids.length; j++) {
            if (!seen[ids[j]]) {
                seen[ids[j]] = true;
                var chr = getCharacterById(ids[j]);
                if (chr) characters.push(chr);
            }
        }
    }
    return characters;
}

/**
 * 获取指定步骤之前（含当前步骤）解锁的所有事件
 * @param {number} upToStep 步骤序号
 * @returns {Event[]}
 */
function getUnlockedEvents(upToStep) {
    var events = [];
    var seen = {};
    var steps = window.historyMapRouteSteps || [];
    for (var i = 0; i < steps.length; i++) {
        if (steps[i].order > upToStep) break;
        var ids = steps[i].unlockEventIds || [];
        for (var j = 0; j < ids.length; j++) {
            if (!seen[ids[j]]) {
                seen[ids[j]] = true;
                var evt = getEventById(ids[j]);
                if (evt) events.push(evt);
            }
        }
    }
    return events;
}

/**
 * 获取指定步骤解锁的所有数据（地点、人物、事件）
 * @param {number} upToStep 步骤序号
 * @returns {{ locations: Location[], characters: Character[], events: Event[] }}
 */
function getUnlockedDataByStep(upToStep) {
    return {
        locations: getUnlockedLocations(upToStep),
        characters: getUnlockedCharacters(upToStep),
        events: getUnlockedEvents(upToStep)
    };
}

/**
 * 获取某个地点关联的所有人物详情
 * @param {string} locationId 地点 ID
 * @returns {Character[]}
 */
function getCharactersAtLocation(locationId) {
    var loc = getLocationById(locationId);
    if (!loc || !loc.relatedCharacterIds) return [];
    var result = [];
    for (var i = 0; i < loc.relatedCharacterIds.length; i++) {
        var chr = getCharacterById(loc.relatedCharacterIds[i]);
        if (chr) result.push(chr);
    }
    return result;
}

/**
 * 获取某个地点关联的所有事件详情
 * @param {string} locationId 地点 ID
 * @returns {Event[]}
 */
function getEventsAtLocation(locationId) {
    var loc = getLocationById(locationId);
    if (!loc || !loc.relatedEventIds) return [];
    var result = [];
    for (var i = 0; i < loc.relatedEventIds.length; i++) {
        var evt = getEventById(loc.relatedEventIds[i]);
        if (evt) result.push(evt);
    }
    return result;
}

/**
 * 获取某个人物关联的所有地点详情
 * @param {string} characterId 人物 ID
 * @returns {Location[]}
 */
function getLocationsOfCharacter(characterId) {
    var chr = getCharacterById(characterId);
    if (!chr || !chr.relatedLocationIds) return [];
    var result = [];
    for (var i = 0; i < chr.relatedLocationIds.length; i++) {
        var loc = getLocationById(chr.relatedLocationIds[i]);
        if (loc) result.push(loc);
    }
    return result;
}

/**
 * 获取某个事件涉及的所有人物详情
 * @param {string} eventId 事件 ID
 * @returns {Character[]}
 */
function getCharactersInEvent(eventId) {
    var evt = getEventById(eventId);
    if (!evt || !evt.characterIds) return [];
    var result = [];
    for (var i = 0; i < evt.characterIds.length; i++) {
        var chr = getCharacterById(evt.characterIds[i]);
        if (chr) result.push(chr);
    }
    return result;
}

/**
 * 获取所有核心地点
 * @returns {Location[]}
 */
function getCoreLocations() {
    var locations = window.historyMapLocations || [];
    var result = [];
    for (var i = 0; i < locations.length; i++) {
        if (locations[i].isCore) result.push(locations[i]);
    }
    return result;
}

/**
 * 获取某个路线步骤对应的完整数据（地点详情 + 关联人物 + 关联事件）
 * @param {number} order 步骤序号
 * @returns {{ step: RouteStep|undefined, location: Location|undefined, characters: Character[], events: Event[] }}
 */
function getStepFullData(order) {
    var step = getRouteStepByOrder(order);
    if (!step) {
        return { step: undefined, location: undefined, characters: [], events: [] };
    }
    var location = getLocationById(step.locationId);
    var characters = [];
    for (var i = 0; i < step.unlockCharacterIds.length; i++) {
        var chr = getCharacterById(step.unlockCharacterIds[i]);
        if (chr) characters.push(chr);
    }
    var events = [];
    for (var i = 0; i < step.unlockEventIds.length; i++) {
        var evt = getEventById(step.unlockEventIds[i]);
        if (evt) events.push(evt);
    }
    return { step: step, location: location, characters: characters, events: events };
}
