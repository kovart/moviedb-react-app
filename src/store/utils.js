export function prepareImage(url, size = 'w500') {
    // size = 'original'
    if (!url) return null
    return `https://image.tmdb.org/t/p/${size}${url}`
}

export function getMovie(id, entities, user) {
    const movie = entities.moviesById[id]
    if(!movie) return null
    return {
        ...movie,
        genres: movie.genreIds.map(id => entities.genresById[id]),
        isFavorite: user.favoriteMovieIds.indexOf(id) !== -1
    }
}

export function prepareMovie({raw = {}, posterSize = 'w500', backdropSize = 'original', extended = false}) {
    const basicData = {
        id: raw.id,
        title: raw.title,
        overview: raw.overview,
        genreIds: raw.genres ? raw.genres.map(i => i.id) : raw.genre_ids,
        voteAverage: raw.vote_average,
        releaseDate: new Date(raw.release_date),
        posterImageUrl: prepareImage(raw.poster_path, posterSize),
        backdropImageUrl: prepareImage(raw.backdrop_path, backdropSize),
        popularity: raw.popularity
    }
    const extendedData = !extended ? null : {
        duration: raw.runtime,
        budget: raw.budget,
        productionCountries: (raw.production_countries || []).map(c => c.name),
        legend: raw.tagline,
        actors: (raw.credits || []).cast.map(cast => ({
            id: cast.id,
            name: cast.name,
            character: cast.character,
            gender: cast.gender,
            photo: prepareImage(cast.profile_path)
        })),
        crew: (raw.credits || []).crew.map(person => ({
            id: person.id,
            department: person.department,
            job: person.job,
            gender: person.gender,
            name: person.name,
            photo: prepareImage(person.profile_path)
        })),

        isExtendedDataLoaded: true
    }
    return Object.assign(basicData, extendedData)
}
