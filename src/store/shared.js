// TODO Should I put this reducer in another place?

const moviesFetchInitialState = {
    ids: [],
    isFetching: true,
    isFetched: false,
    totalMovies: 0
}

// Sub-reducer
// ---
// Used for widget-like components that load list of movies.
// The reducer keeps only the ids of movies so you should save the full data of movies in 'entities' reducer.
// TODO Think of a better name
export function moviesFetchReducer(prefix, state = moviesFetchInitialState, action) {
    const {type, payload} = action
    switch (type) {
        case prefix + "_FETCH_REQUEST":
            return {...state, isFetching: true}
        case prefix + "_FETCH_SUCCESS":
            const {total_results: totalMovies, results: movies} = payload
            const movieIds = movies.map(movie => movie.id)
            return {
                ids: [...state.ids, ...movieIds],
                isFetching: false,
                isFetched: true,
                totalMovies: totalMovies
            }
        case prefix + "_FETCH_FAIL":
            return {...state, isFetching: false, isFetched: false}
        default:
            return state
    }
}
