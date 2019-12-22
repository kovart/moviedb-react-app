import {
    MOVIE_FETCH_FAIL,
    MOVIE_FETCH_REQUEST,
    MOVIE_FETCH_SUCCESS, RECOMMENDED_MOVIES_FETCH_FAIL, RECOMMENDED_MOVIES_FETCH_REQUEST,
    RECOMMENDED_MOVIES_FETCH_SUCCESS, SIMILAR_MOVIES_FETCH_FAIL, SIMILAR_MOVIES_FETCH_REQUEST,
    SIMILAR_MOVIES_FETCH_SUCCESS
} from "./movie.types"
import {moviesFetchReducer} from "../../shared"

const initialState = {
    isFetching: false,
    isFetched: false,
    // ...movie data

    similarMovies: moviesFetchReducer("SIMILAR_MOVIES", null, null),
    recommendedMovies: moviesFetchReducer("RECOMMENDED_MOVIES", null, null),
}

export function movieReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case MOVIE_FETCH_REQUEST:
            return {...state, isFetched: false, isFetching: true}
        case MOVIE_FETCH_FAIL:
            return {...state, isFetched: false, isFetching: false}
        case MOVIE_FETCH_SUCCESS:
            const {movie} = payload
            return {
                ...state,
                isFetched: true,
                isFetching: false,
                ...movie,
            }
        case SIMILAR_MOVIES_FETCH_REQUEST:
        case SIMILAR_MOVIES_FETCH_SUCCESS:
        case SIMILAR_MOVIES_FETCH_FAIL:
            return {
                ...state,
                similarMovies: moviesFetchReducer("SIMILAR_MOVIES", state.similarMovies, action)
            }
        case RECOMMENDED_MOVIES_FETCH_REQUEST:
        case RECOMMENDED_MOVIES_FETCH_SUCCESS:
        case RECOMMENDED_MOVIES_FETCH_FAIL:
            return {
                ...state,
                recommendedMovies: moviesFetchReducer("RECOMMENDED_MOVIES", state.recommendedMovies, action)
            }
        default:
            return state
    }
}
