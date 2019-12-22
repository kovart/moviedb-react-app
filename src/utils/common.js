// A simple function for generation of unique IDs
export const generateId = (function () {
    let globalId = 0
    return function () {
        return globalId++
    }
})()
