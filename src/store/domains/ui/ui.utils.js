const universalMessage = "Something went wrong"

export function prepareError(error) {
    if(typeof error === 'string') return error
    else if(error.isAxiosError) {
        if(!error.response) {
            return error.message || universalMessage
        }
        const status = error.response.status
        if(status === 404) return universalMessage
        else if(error.response.message) return error.response.message
        else return error.message
    } else if(error.message){
        return error.message
    } else if(error.error) {
        return prepareError(error.error)
    }
    return universalMessage
}
