import {MOVIE_FAVORITE_TOGGLED, MOVIE_FAVORITED, MOVIE_UNFAVORITED, MOVIE_VISITED} from "./user.types"

const initialState = {
    visitedMovieIds: JSON.parse(localStorage.getItem('visitedMovies')) || [],
    favoriteMovieIds: JSON.parse(localStorage.getItem('favoriteMovies')) || []
}

export function userReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case MOVIE_FAVORITE_TOGGLED: {
            const id = payload.id
            let favoriteMovieIds
            const isFavorite = state.favoriteMovieIds.indexOf(id) !== -1
            if(isFavorite) favoriteMovieIds = state.favoriteMovieIds.filter(movieId => movieId !== id)
            else favoriteMovieIds = [...state.favoriteMovieIds, id]
            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovieIds))
            return {...state, favoriteMovieIds: favoriteMovieIds}
        }
        case MOVIE_FAVORITED: {
            const id = payload.id
            const favoriteMovieIds = [...state.favoriteMovieIds, id]
            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovieIds))
            return {...state, favoriteMovieIds: favoriteMovieIds}
        }
        case MOVIE_UNFAVORITED: {
            const id = payload.id
            const favoriteMovieIds = state.favoriteMovieIds.filter(movieId => movieId !== id)
            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovieIds))
            return {...state, favoriteMovieIds: favoriteMovieIds}
        }
        case MOVIE_VISITED: {
            const id = payload.id
            const visitedMovieIds = [...state.visitedMovieIds, id]
            localStorage.setItem('visitedMovies', JSON.stringify(visitedMovieIds))
            return {...state, visitedMovieIds: visitedMovieIds}
        }
        default:
            return state
    }
}
