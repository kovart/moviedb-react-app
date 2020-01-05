export function prepareImage(url, size='w500') {
    // size = 'original'
    if(!url) return null
    return `https://image.tmdb.org/t/p/${size}${url}`
}

export function getMovie(id, entities){
    const movie = entities.moviesById[id]
    return {
        ...movie,
        genres: movie.genreIds.map(id => entities.genresById[id])
    }
}

export function prepareMovie(raw = {}, posterSize='w500', backdropSize = 'original') {
    return {
        id: raw.id,
        name: raw.title,
        overview: raw.overview,
        genreIds: raw.genre_ids,
        date: new Date(raw.release_date),
        voteAverage: raw.vote_average,
        posterImageUrl: prepareImage(raw.poster_path, posterSize),
        backdropImageUrl: prepareImage(raw.backdrop_path, backdropSize),
        popularity: raw.popularity
    }
}
