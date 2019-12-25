import {generateId} from "../../utils/common"

/**
 * This function allows us to dispatch action(s)
 * defined in different ways through the 'next' function.
 *
 * @param {string|function|array} action
 * @param {*} payload
 * @param {function} next
 * @returns {*}
 */
export function dispatchAction(action, payload = null, next) {
    if (Array.isArray(action)) return action.forEach(item => dispatchAction(item, payload, next))

    if (typeof action === 'string') {
        return next({type: action, payload})
    } else if (typeof action === "function") {
        return action(next, payload)
    } else {
        console.error('\'action\' prop must be a string or function, but got: ' + typeof action)
    }
}

/**
 * Allows us to manage action executing in a Middleware.
 *
 * @returns {{cancel(): void, , done(): void, isCancelled: boolean, subscribe(string, function): void, unsubscribe(string, function): void, id: string, _handlers: {cancel: [], done: []}, isDone: boolean}}
 * @constructor
 */
export function ActionTask() {
    return {
        id: "TASK-" + generateId(),
        isCancelled: false,
        isDone: false,
        _handlers: {
            cancel: [],
            done: [],
        },
        cancel() {
            if(Object.isFrozen(this)) return
            this.isCancelled = true
            this._handlers.cancel.forEach(h => h && h(this))
        },
        done() {
            this.isDone = true
            this._handlers.done.forEach(h => h && h(this))
            Object.freeze(this)
        },
        subscribe(event, handler) {
            this._handlers[event].push(handler)
        },
        unsubscribe(event, handler) {
            this._handlers[event] = this._handlers[event].filter(h => h !== handler)
        }
    }
}

ActionTask.events = {
    DONE: 'done',
    CANCEL: 'cancel'
}
