import { types } from '../types/types'

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        photo: action.payload.photoURL,
      }

    case types.updatePhoto:
      return { ...state, photo: action.payload.photoURL }

    case types.logout:
      return {}

    default:
      return state
  }
}
