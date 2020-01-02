import axios from "axios"
import {dispatchAction, ActionTask} from "./utils"
import {CancelToken as AxiosCancelToken} from 'axios'

const API_KEY = "e0d3d49d19ce926b6842e10c9d97ba31"

export const MOVIEDB_MIDDLEWARE = 'MOVIEDB_MIDDLEWARE'

// ACTION SCHEMA
// -----------
// const example = {
//     type: "SEARCH_MOVIES",
//     payload: {
//         // for POST method
//         someData: {},
//     },
//     meta: {
//         target: MOVIEDB_MIDDLEWARE_TARGET,
//         url: "popular/movie",
//         method: "GET",
//         params: {page: 2},
//         handlers: {
//             request: "SOME_ACTION_REQUEST",
//             success: function (dispatch, {results: movies}) {
//                 dispatch({type: "SOME_ACTION_SUCCESS", payload: {movies}})
//             },
//             fail: [
//                 "ADD_ERROR",
//                 "SOME_ACTION_FAIL",
//                 function (dispatch, {error}) {
//                     console.error('ERROR', error)
//                 }
//             ],
//             cancel: "SOME_ACTION_CANCEL"
//         }
//     }
// }

const MiddlewareName = 'MovieDB Api Middleware'

export function MovieDbApiMiddleware(debug = false) {
    return store => next => async action => {
        const {type, payload, meta} = action

        if (!meta || meta.target !== MOVIEDB_MIDDLEWARE) return next(action)
        if (!meta.handlers || !Object.keys(meta.handlers).length)
            return console.error(`action must contain non empty 'meta' object with at least one handler`, action)

        const {url, method, params, handlers} = meta
        const task = meta.task || {isCancelled: false, isDone: false, isDummy: true}
        const log = (msg, ...data) => console.log(
            `%c[${MiddlewareName}]`, 'font-weight: bold',
            `[${type}]${!task.isDummy ? ` [${task.id}]` : ""}: ${msg}`,
            ...data
        )

        const cancelToken = AxiosCancelToken.source()
        !task.isDummy && task.subscribe(ActionTask.events.CANCEL, function () {
            cancelToken.cancel()
            if (debug) log(`Action has been canceled`)
            if (handlers.cancel) dispatchAction(handlers.cancel, null, store.dispatch)
        })

        if (!task.isCancelled && handlers.request) {
            if (debug) log(`Request handling`, meta, payload)
            dispatchAction(handlers.request, null, store.dispatch)
        }

        try {
            let response
            if (method.toLowerCase() === 'get') response = await get(url, params, cancelToken)
            // else if () { ... }
            else {
                console.error('Unknown request method: ' + method, action)
                return next(action)
            }
            if (handlers.success && !task.isCancelled) {
                if (debug) log(`Success handling`)
                dispatchAction(handlers.success, response.data, store.dispatch)
            }
        } catch (error) {
            if (!task.isCancelled) {
                if (debug) log(`Fail handling`, error)
                if (handlers.fail) {
                    dispatchAction(handlers.fail, {error}, store.dispatch)
                } else {
                    console.error(`Uncaught exception in ${MiddlewareName}: `, error)
                }
            }
        } finally {
            if (!task.isDummy && !task.isCancelled) task.done()
            // TODO Should we make the task done if it is cancelled?
            // if (task) task.done()
        }
    }

}


function get(url, params = {}, cancelToken) {
    return axios({
        baseURL: "https://api.themoviedb.org/3/",
        url: url,
        method: "get",
        cancelToken: cancelToken.token,
        params: Object.assign({},
            {
                api_key: API_KEY,
                language: "en-US"
            }, params
        ),
        timeout: 15 * 1000
    })
}
