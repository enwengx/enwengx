function find(list, f) {
    return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    if(obj instanceof RegExp) {
        return new RegExp(obj)
    }
    if(obj instanceof Date) {
        return new Date(obj)
    }
    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }
    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })
    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })
    return copy
}
/**
 * cache [{orginal:[{a:'1',b:[{a:"333"}]}],cope:[]}]
 * [{orginal:[{a:'1',b:[{a:"333"}]}],cope:[{a:''1'}]},{orginal:{a:'1',b:[{a:"333"}]},cope:[]}] * 
 */
