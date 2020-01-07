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
import {moviesFetchReducer} from "../shared"

const initialState = {
    id: null,
    isFetching: false,
    isFetched: false,
    similarMovies: moviesFetchReducer("SIMILAR_MOVIES", undefined, {}),
    recommendedMovies: moviesFetchReducer("RECOMMENDED_MOVIES", undefined, {}),
}

export function movieReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case MOVIE_PAGE_FETCH_REQUEST:
            return {...initialState, isFetching: true}
        case MOVIE_PAGE_FETCH_FAIL:
            return {...state, isFetched: false, isFetching: false}
        case MOVIE_PAGE_FETCH_SUCCESS:
            return {
                ...state,
                id: payload.id,
                isFetched: true,
                isFetching: false,
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
