import {MOVIE_FAVORITED, MOVIE_UNFAVORITED, MOVIE_VISITED} from "./user.types"

const initialState = {
    visitedMovieIds: localStorage.getItem('visitedMovies') || [],
    favoriteMovieIds: localStorage.getItem('favoriteMovies') || []
}

export function userReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case MOVIE_FAVORITED: {
            const {movie: {id}} = payload
            const favoriteMovieIds = [...state.favoriteMovieIds, id]
            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovieIds))
            return {...state, favoriteMovieIds: favoriteMovieIds}
        }
        case MOVIE_UNFAVORITED: {
            const {movie: {id}} = payload
            const favoriteMovieIds = state.favoriteMovieIds.filter(movieId => movieId !== id)
            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovieIds))
            return {...state, favoriteMovieIds: favoriteMovieIds}
        }
        case MOVIE_VISITED: {
            const {movie: {id}} = payload
            const visitedMovieIds = [...state.visitedMovieIds, id]
            localStorage.setItem('visitedMovies', JSON.stringify(visitedMovieIds))
            return {...state, visitedMovieIds: visitedMovieIds}
        }
        default:
            return state
    }
}
