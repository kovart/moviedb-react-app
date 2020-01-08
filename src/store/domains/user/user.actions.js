import {
    USER_FAVORITE_TOGGLE,
    USER_VISITED_MOVIE,
    USER_CLEARED_VISITED_MOVIES
} from "./user.types"

export function makeMovieVisited(id) {
    return {type: USER_VISITED_MOVIE, payload: {id}}
}

export function clearVisitedMovies(){
    return {type: USER_CLEARED_VISITED_MOVIES}
}

export function toggleFavorite(id) {
    return {type: USER_FAVORITE_TOGGLE, payload: {id}}
}
