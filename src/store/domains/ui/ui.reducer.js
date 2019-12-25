import {ADD_ERROR, REMOVE_ERROR} from "./ui.types"
import {prepareError} from "./ui.utils"
import {generateId} from "../../../utils/common"

const initialState = {
    errors: [],
}

export function uiReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case ADD_ERROR:
            console.error(payload.error)
            const error = {
                id: generateId(),
                message: prepareError(payload.error),
                date: new Date()
            }
            return {...state, errors: [...state.errors, error]}
        case REMOVE_ERROR:
            const {error: {id}} = payload
            return {...state, errors: state.errors.filter(err => err.id !== id)}
        default:
            return state
    }
}

