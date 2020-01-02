export function prepareImage(url, size='w500') {
    // size = 'original'
    return `https://image.tmdb.org/t/p/${size}${url}`
}

export function getMovie(id, entities){
    const movie = entities.moviesById[id]
    return {
        ...movie,
        genres: movie.genreIds.map(id => entities.genresById[id])
    }
}
