import {MOVIE_FAVORITE_TOGGLED, MOVIE_FAVORITED, MOVIE_UNFAVORITED, MOVIE_VISITED} from "./user.types"

export function visitMovie(id) {
    return {type: MOVIE_VISITED, payload: {id}}
}

export function favoriteMovie(id) {
    return {type: MOVIE_FAVORITED, payload: {id}}
}

export function unfavoriteMovie(id) {
    return {type: MOVIE_UNFAVORITED, payload: {id}}
}

export function toggleFavorite(id) {
    return {type: MOVIE_FAVORITE_TOGGLED, payload: {id}}
}
