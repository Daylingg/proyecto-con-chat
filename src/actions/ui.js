import { types } from "../types/types"

export const startLoading  = () => (
    {
        type:types.uiStartLoading
    }
)

export const finishLoading  = () => (
    {
        type:types.uiFinishLoading
    }
)

export const setError = (err) => {
    return {
        type: types.uiSetError,
        payload: err
    }
}

export const removeError = () => {
    return {
        type: types.uiRemoveError
        
    }
}