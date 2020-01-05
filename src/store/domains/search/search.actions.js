import {ActionTask} from "../../middlewares/utils"
import {MOVIEDB_MIDDLEWARE} from "../../middlewares/moviedb-api"
import {SEARCH_CANCEL, SEARCH_FAIL, SEARCH_QUERY_CHANGED, SEARCH_REQUEST, SEARCH_SUCCESS} from "./search.types"
import {ADD_ERROR} from "../ui/ui.types"

const DUMMY_ACTION = {type: "DO_NOTHING"}

let searchTask = {isDone: true, isCancelled: false}

export function searchMovies(query, page = 1) {
    if (!query || !query.trim().length) {
        if(!searchTask.isDone && !searchTask.isCancelled) {
            // Cancel task and return DUMMY_ACTION
            // because the cancel handler has already declared 
            // what to dispatch after cancel() call
            searchTask.cancel()
            return DUMMY_ACTION
        }
        return cancelSearch()
    }
    if (!searchTask.isDone && !searchTask.isCancelled) cancelSearch()

    searchTask = ActionTask()

    return {
        type: "MOVIES_SEARCH",
        payload: null,
        meta: {
            target: MOVIEDB_MIDDLEWARE,
            url: 'search/movie',
            method: "GET",
            params: {query, page},
            task: searchTask,
            handlers: {
                request: SEARCH_REQUEST,
                success: SEARCH_SUCCESS,
                fail: [ADD_ERROR, SEARCH_FAIL],
                cancel: SEARCH_CANCEL
            },
        }
    }
}

export function cancelSearch(){
    if (!searchTask.isDone && !searchTask.isCancelled) {
        // Return DUMMY_ACTION because
        // search action will automatically dispatch cancel handler
        searchTask.cancel()
        return DUMMY_ACTION
    }
    return {type: SEARCH_CANCEL}
}

export function changeQuery(value){
    return {type: SEARCH_QUERY_CHANGED, payload: {query: value}}
}
