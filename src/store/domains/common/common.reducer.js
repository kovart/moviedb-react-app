import {GENRES_FETCH_FAIL, GENRES_FETCH_REQUEST, GENRES_FETCH_SUCCESS} from "./common.types"

const initialState = {
    // main state
    isAppReady: false,
    // for better control
    isGenresLoaded: false,
}

export function commonReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case GENRES_FETCH_REQUEST:
        case GENRES_FETCH_FAIL:
            return {...state, isGenresLoaded: false, isAppReady: false}
        case GENRES_FETCH_SUCCESS:
            return {...state, isGenresLoaded: true, isAppReady: true}
        default:
            return state
    }
}
