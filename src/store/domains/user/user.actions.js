import {
    USER_FAVORITE_TOGGLE,
    USER_VISITED_MOVIE,
    USER_CLEANED_VISITED_MOVIES
} from "./user.types"

export function makeMovieVisited(id) {
    return {type: USER_VISITED_MOVIE, payload: {id}}
}

export function cleanVisitedMovies(){
    return {type: USER_CLEANED_VISITED_MOVIES}
}

export function toggleFavorite(id) {
    return {type: USER_FAVORITE_TOGGLE, payload: {id}}
}
