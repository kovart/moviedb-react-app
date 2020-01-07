import {SEARCH_CANCEL, SEARCH_FAIL, SEARCH_QUERY_CHANGED, SEARCH_REQUEST, SEARCH_SUCCESS} from "./search.types"
import {prepareMovie} from "../../utils"
import {LOCATION_CHANGE} from 'connected-react-router';

const initialSearchState = {
    query: '',
    isFetching: false,
    isFetched: false,
    foundMovies: []
}

// sub-reducer
export function searchReducer(state = initialSearchState, action) {
    const {type, payload} = action
    switch (type) {
        case LOCATION_CHANGE:
            return initialSearchState
        case SEARCH_QUERY_CHANGED:
            return {...state, query: payload.query}
        case SEARCH_REQUEST:
            return {...state, isFetching: true, isFetched: false, foundMovies: []}
        case SEARCH_SUCCESS: {
            let movies = payload.results.map(movie => prepareMovie({raw: movie, posterSize: 'w154'}))
            movies = filterEmptyMovies(movies).sort((a, b) => b.popularity - a.popularity)
            return {
                ...state,
                isFetching: false,
                isFetched: true,
                foundMovies: movies
            }
        }
        case SEARCH_FAIL:
        case SEARCH_CANCEL:
            return {...state, isFetching: false, isFetched: false, foundMovies: []}
        default:
            return state
    }
}

function filterEmptyMovies(movies) {
    return movies.filter(m => {
        return !!m.title && m.popularity > 0.25
    })
}
