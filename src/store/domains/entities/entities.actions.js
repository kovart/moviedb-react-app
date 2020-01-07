import {MOVIEDB_MIDDLEWARE} from "../../middlewares/moviedb-api"
import {MOVIE_FETCH_FAIL, MOVIE_FETCH_REQUEST, MOVIE_FETCH_SUCCESS} from "./entities.types"
import {ADD_ERROR} from "../ui/ui.types"

export function fetchMovie(id) {
    return {
        type: "FETCH_MOVIE",
        payload: null,
        meta: {
            target: MOVIEDB_MIDDLEWARE,
            method: "GET",
            url: "/movie/" + id,
            params: {
                append_to_response: 'credits'
            },
            handlers: {
                request: MOVIE_FETCH_REQUEST,
                success: MOVIE_FETCH_SUCCESS,
                fail: [ADD_ERROR, MOVIE_FETCH_FAIL]
            }
        }
    }
}
