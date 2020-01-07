import {MOVIEDB_MIDDLEWARE} from "../../middlewares/moviedb-api"
import {
    MOVIE_PAGE_FETCH_FAIL,
    MOVIE_PAGE_FETCH_REQUEST,
    MOVIE_PAGE_FETCH_SUCCESS,
    RECOMMENDED_MOVIES_FETCH_FAIL,
    RECOMMENDED_MOVIES_FETCH_REQUEST,
    RECOMMENDED_MOVIES_FETCH_SUCCESS,
    SIMILAR_MOVIES_FETCH_FAIL,
    SIMILAR_MOVIES_FETCH_REQUEST,
    SIMILAR_MOVIES_FETCH_SUCCESS
} from "./movie.types"
import {ADD_ERROR} from "../ui/ui.types"

export function fetchMoviePage(id) {
    return {
        type: "FETCH_MOVIE_PAGE",
        payload: null,
        meta: {
            target: MOVIEDB_MIDDLEWARE,
            method: "GET",
            url: "/movie/" + id,
            params: {
                append_to_response: 'credits'
            },
            handlers: {
                request: MOVIE_PAGE_FETCH_REQUEST,
                success: MOVIE_PAGE_FETCH_SUCCESS,
                fail: [ADD_ERROR, MOVIE_PAGE_FETCH_FAIL]
            }
        }
    }
}

export function fetchSimilarMovies(movieId, page = 1) {
    return {
        type: "FETCH_SIMILAR_MOVIES",
        payload: null,
        meta: {
            target: MOVIEDB_MIDDLEWARE,
            method: "GET",
            url: `movie/${movieId}/similar`,
            params: {page},
            handlers: {
                request: SIMILAR_MOVIES_FETCH_REQUEST,
                success: SIMILAR_MOVIES_FETCH_SUCCESS,
                fail: [ADD_ERROR, SIMILAR_MOVIES_FETCH_FAIL]
            }
        }
    }
}

export function fetchRecommendedMovies(movieId, page = 1) {
    return {
        type: "FETCH_RECOMMENDED_MOVIES",
        payload: null,
        meta: {
            target: MOVIEDB_MIDDLEWARE,
            method: "GET",
            url: `movie/${movieId}/recommendations`,
            params: {page},
            handlers: {
                request: RECOMMENDED_MOVIES_FETCH_REQUEST,
                success: RECOMMENDED_MOVIES_FETCH_SUCCESS,
                fail: [ADD_ERROR, RECOMMENDED_MOVIES_FETCH_FAIL]
            }
        }
    }
}
