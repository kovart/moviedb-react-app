import {
    MOVIE_FETCH_FAIL,
    MOVIE_FETCH_REQUEST,
    MOVIE_FETCH_SUCCESS, RECOMMENDED_MOVIES_FETCH_FAIL, RECOMMENDED_MOVIES_FETCH_REQUEST,
    RECOMMENDED_MOVIES_FETCH_SUCCESS, SIMILAR_MOVIES_FETCH_FAIL, SIMILAR_MOVIES_FETCH_REQUEST,
    SIMILAR_MOVIES_FETCH_SUCCESS
} from "./movie.types"
import {moviesFetchReducer} from "../shared"
import {prepareImage} from "../../utils"

const initialState = {
    isFetching: false,
    isFetched: false,
    // ...movie data

    similarMovies: moviesFetchReducer("SIMILAR_MOVIES", undefined, {}),
    recommendedMovies: moviesFetchReducer("RECOMMENDED_MOVIES", undefined, {}),
}

export function movieReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case MOVIE_FETCH_REQUEST:
            return {...initialState, isFetching: true}
        case MOVIE_FETCH_FAIL:
            return {...state, isFetched: false, isFetching: false}
        case MOVIE_FETCH_SUCCESS:
            const movie = prepareMovie(payload)
            return {
                ...state,
                isFetched: true,
                isFetching: false,
                ...movie,
            }
        case SIMILAR_MOVIES_FETCH_REQUEST:
        case SIMILAR_MOVIES_FETCH_SUCCESS:
        case SIMILAR_MOVIES_FETCH_FAIL:
            return {
                ...state,
                similarMovies: moviesFetchReducer("SIMILAR_MOVIES", state.similarMovies, action)
            }
        case RECOMMENDED_MOVIES_FETCH_REQUEST:
        case RECOMMENDED_MOVIES_FETCH_SUCCESS:
        case RECOMMENDED_MOVIES_FETCH_FAIL:
            return {
                ...state,
                recommendedMovies: moviesFetchReducer("RECOMMENDED_MOVIES", state.recommendedMovies, action)
            }
        default:
            return state
    }
}

function prepareMovie(raw){
    return {
        id: raw.id,
        title: raw.title,
        genres: raw.genres.map(g => g.name),
        duration: raw.runtime,
        budget: raw.budget,
        backdropImage: prepareImage(raw.backdrop_path, 'original'),
        posterImage: prepareImage(raw.poster_path),
        releaseDate: new Date(raw.release_date),
        productionCountries: raw.production_countries.map(c => c.name),
        voteAverage: raw.vote_average,
        legend: raw.legend,
        overview: raw.overview,
        actors: raw.credits.cast.map(cast => ({
            id: cast.id,
            name: cast.name,
            character: cast.character,
            gender: cast.gender,
            photo: prepareImage(cast.profile_path)
        })),
        crew: raw.credits.crew.map(person => ({
            id: person.id,
            department: person.department,
            job: person.job,
            gender: person.gender,
            name: person.name,
            photo: prepareImage(person.profile_path)
        }))
    }
}
