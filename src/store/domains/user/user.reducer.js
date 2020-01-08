import {USER_CLEARED_VISITED_MOVIES, USER_FAVORITE_TOGGLE, USER_VISITED_MOVIE} from "./user.types"

const initialState = {
    visitedMovieIds: JSON.parse(localStorage.getItem('visitedMovies')) || [],
    favoriteMovieIds: JSON.parse(localStorage.getItem('favoriteMovies')) || []
}

export function userReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case USER_FAVORITE_TOGGLE: {
            const id = payload.id
            let favoriteMovieIds
            const isFavorite = state.favoriteMovieIds.indexOf(id) !== -1
            if(isFavorite) favoriteMovieIds = state.favoriteMovieIds.filter(movieId => movieId !== id)
            else favoriteMovieIds = [id,...state.favoriteMovieIds]
            localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovieIds))
            return {...state, favoriteMovieIds: favoriteMovieIds}
        }
        case USER_VISITED_MOVIE: {
            const id = payload.id
            const visitedMovieIds = [...new Set([id, ...state.visitedMovieIds])]
            localStorage.setItem('visitedMovies', JSON.stringify(visitedMovieIds))
            return {...state, visitedMovieIds: visitedMovieIds}
        }
        case USER_CLEARED_VISITED_MOVIES: {
            localStorage.setItem('visitedMovies', JSON.stringify([]))
            return {...state, visitedMovieIds: []}
        }
        default:
            return state
    }
}
