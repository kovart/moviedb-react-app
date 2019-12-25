import {SEARCH_CANCEL, SEARCH_FAIL, SEARCH_REQUEST, SEARCH_SUCCESS} from "./search.types"

const initialSearchState = {
    isFetching: false,
    isFetched: false,
    foundMovieIds: []
}

// sub-reducer
export function searchReducer(state = initialSearchState, action) {
    const {type, payload} = action
    switch (type) {
        case SEARCH_REQUEST:
            return {...state, isFetching: true, isFetched: false, foundMovieIds: []}
        case SEARCH_SUCCESS: {
            const {results: movies} = payload
            return {
                ...state,
                isFetching: false,
                isFetched: true,
                foundMovieIds: [...state.foundMovieIds, movies.map(movie => movie.id)]
            }
        }
        case SEARCH_FAIL:
        case SEARCH_CANCEL:
            return {...state, isFetching: false, isFetched: false, foundMovieIds: []}
        default:
            return state
    }
}
