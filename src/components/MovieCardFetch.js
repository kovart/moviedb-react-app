import React, {useEffect} from "react"
import MovieCard from "./MovieCard"
import MovieCardPlaceholder from "./placeholders/MovieCardPlaceholder"


function MovieCardFetch({id, movie, ready, fetch, onFavorite}) {

    useEffect(function () {
        if (!movie && ready) fetch(id)
    }, [id, movie, fetch, ready])

    return (
        !!movie ? <MovieCard {...movie} onFavorite={onFavorite}/> : <MovieCardPlaceholder/>
    )
}

export default MovieCardFetch
