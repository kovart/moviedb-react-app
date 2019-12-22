import {MOVIEDB_MIDDLEWARE} from "../../middlewares/moviedb-api"
import {GENRES_FETCH_FAIL, GENRES_FETCH_REQUEST, GENRES_FETCH_SUCCESS} from "./common.types"
import {ADD_ERROR} from "../ui/ui.types"

export function fetchGenres() {
    return {
        type: "FETCH_GENRES",
        payload: null,
        meta: {
            target: MOVIEDB_MIDDLEWARE,
            method: "GET",
            url: "genre/movie/list",
            params: null,
            handlers: {
                request: GENRES_FETCH_REQUEST,
                success: GENRES_FETCH_SUCCESS,
                fail: [ADD_ERROR, GENRES_FETCH_FAIL]
            }
        }
    }
}
