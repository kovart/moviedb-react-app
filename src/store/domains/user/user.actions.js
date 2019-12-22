import {MOVIE_FAVORITED, MOVIE_UNFAVORITED, MOVIE_VISITED} from "./user.types"

export function visitMovie(movie) {
    return {type: MOVIE_VISITED, payload: {movie}}
}

export function favoriteMovie(movie) {
    return {type: MOVIE_FAVORITED, payload: {movie}}
}

export function unfavoriteMovie(movie) {
    return {type: MOVIE_UNFAVORITED, payload: {movie}}
}
