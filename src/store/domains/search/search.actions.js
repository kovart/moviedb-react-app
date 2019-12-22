import {ActionTask} from "../../middlewares/utils"
import {MOVIEDB_MIDDLEWARE} from "../../middlewares/moviedb-api"
import {SEARCH_CANCEL, SEARCH_FAIL, SEARCH_REQUEST, SEARCH_SUCCESS} from "./search.types"
import {ADD_ERROR} from "../ui/ui.types"

let searchTask = ActionTask()

export function searchMovies(query, page = 1) {
    if (!searchTask.isDone) searchTask.cancel()

    if (!query || !query.trim()) return {type: SEARCH_CANCEL}

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
