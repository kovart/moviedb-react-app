import {
    POPULAR_MOVIES_FETCH_FAIL,
    POPULAR_MOVIES_FETCH_REQUEST,
    POPULAR_MOVIES_FETCH_SUCCESS, TOP_RATED_MOVIES_FETCH_FAIL,
    TOP_RATED_MOVIES_FETCH_REQUEST, TOP_RATED_MOVIES_FETCH_SUCCESS
} from "./home.types"
import {moviesFetchReducer} from "../../shared"

const initialState = {
    popularMovies: moviesFetchReducer("POPULAR_MOVIES", null, null),
    topRatedMovies: moviesFetchReducer("TOP_RATED_MOVIES", null, null)
}

export function homeReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case POPULAR_MOVIES_FETCH_REQUEST:
        case POPULAR_MOVIES_FETCH_SUCCESS:
        case POPULAR_MOVIES_FETCH_FAIL:
            return {
                ...state,
                popularMovies: moviesFetchReducer("POPULAR_MOVIES", state.popularMovies, action)
            }
        case TOP_RATED_MOVIES_FETCH_REQUEST:
        case TOP_RATED_MOVIES_FETCH_SUCCESS:
        case TOP_RATED_MOVIES_FETCH_FAIL:
            return {
                ...state,
                topRatedMovies: moviesFetchReducer("TOP_RATED_MOVIES", state.topRatedMovies, action)
            }
        default:
            return state
    }
}
