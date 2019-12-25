import {MOVIEDB_MIDDLEWARE} from "../../middlewares/moviedb-api"
import {ADD_ERROR} from "../ui/ui.types"
import {
    UPCOMING_MOVIES_FETCH_FAIL,
    UPCOMING_MOVIES_FETCH_REQUEST,
    UPCOMING_MOVIES_FETCH_SUCCESS,
    POPULAR_MOVIES_FETCH_FAIL,
    POPULAR_MOVIES_FETCH_REQUEST,
    POPULAR_MOVIES_FETCH_SUCCESS,
    TOP_RATED_MOVIES_FETCH_FAIL,
    TOP_RATED_MOVIES_FETCH_REQUEST,
    TOP_RATED_MOVIES_FETCH_SUCCESS
} from "./home.types"

export function fetchPopularMovies(page = 1) {
    return {
        type: "FETCH_POPULAR_MOVIES",
        payload: null,
        meta: {
            target: MOVIEDB_MIDDLEWARE,
            method: "GET",
            params: {page},
            url: "movie/popular",
            handlers: {
                request: POPULAR_MOVIES_FETCH_REQUEST,
                success: POPULAR_MOVIES_FETCH_SUCCESS,
                fail: [ADD_ERROR, POPULAR_MOVIES_FETCH_FAIL]
            }
        }
    }
}

export function fetchTopRatedMovies(page = 1) {
    return {
        type: "FETCH_TOP_RATED_MOVIES",
        payload: null,
        meta: {
            target: MOVIEDB_MIDDLEWARE,
            method: "GET",
            params: {page},
            url: "movie/top_rated",
            handlers: {
                request: TOP_RATED_MOVIES_FETCH_REQUEST,
                success: TOP_RATED_MOVIES_FETCH_SUCCESS,
                fail: [ADD_ERROR, TOP_RATED_MOVIES_FETCH_FAIL]
            }
        }
    }
}

export function fetchUpcomingMovies(page = 1) {
    return {
        type: "FETCH_UPCOMING_MOVIES",
        payload: null,
        meta: {
            target: MOVIEDB_MIDDLEWARE,
            method: "GET",
            params: {page},
            url: "movie/upcoming",
            handlers: {
                request: UPCOMING_MOVIES_FETCH_REQUEST,
                success: UPCOMING_MOVIES_FETCH_SUCCESS,
                fail: [ADD_ERROR, UPCOMING_MOVIES_FETCH_FAIL]
            }
        }
    }
}
