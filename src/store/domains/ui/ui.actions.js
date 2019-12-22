import {ADD_ERROR, REMOVE_ERROR} from "./ui.types"

export function addError(error) {
    return {type: ADD_ERROR, payload: {error}}
}

export function removeError(error) {
    return {type: REMOVE_ERROR, payload: {error}}
}
