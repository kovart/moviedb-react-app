import {
    POPULAR_MOVIES_FETCH_SUCCESS,
    TOP_RATED_MOVIES_FETCH_SUCCESS,
    UPCOMING_MOVIES_FETCH_SUCCESS
} from "../home/home.types"
import {GENRES_FETCH_SUCCESS} from "../common/common.types"
import {RECOMMENDED_MOVIES_FETCH_SUCCESS, SIMILAR_MOVIES_FETCH_SUCCESS} from "../movie/movie.types"
import {prepareMovie} from "../../utils"

const initialState = {
    moviesById: {},
    genresById: {}
}

export function entitiesReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case GENRES_FETCH_SUCCESS:
            const genresById = {}
            for (let genre of payload.genres) {
                genresById[genre.id] = genre.name
            }
            return {...state, genresById: genresById}
        case POPULAR_MOVIES_FETCH_SUCCESS:
        case TOP_RATED_MOVIES_FETCH_SUCCESS:
        case UPCOMING_MOVIES_FETCH_SUCCESS:
        case SIMILAR_MOVIES_FETCH_SUCCESS:
        case RECOMMENDED_MOVIES_FETCH_SUCCESS:
            const moviesById = {...state.moviesById}
            for (let movie of payload.results) {
                moviesById[movie.id] = prepareMovie(movie)
                moviesById[movie.id].fetchDate = new Date()
            }
            return {...state, moviesById: moviesById}
        default:
            return state
    }
}
