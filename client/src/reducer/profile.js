import {
   CLEAR_PROFILE, GET_ALL_PROFILE, GET_PROFILE, PROFILE_ERROR
   , UPDATE_PROFILE, GET_REPOS
} from '../actions/types'

const initialState = {
   profile: {},
   profiles: [],
   repos: [],
   loading: true,
   error: {}
}

const reducer = (state = initialState, action) => {
   const { type, payload } = action
   switch (type) {
      case GET_PROFILE:
      case UPDATE_PROFILE:
         return {
            ...state,
            profile: payload,
            loading: false
         }
      case GET_ALL_PROFILE: return {
         ...state,
         profiles: payload,
         loading: false
      }
      case PROFILE_ERROR: return {
         ...state,
         error: payload,
         loading: false
      }
      case CLEAR_PROFILE: return {
         ...state,
         loading: false,
         profile: {}
      }
      case GET_REPOS: return {
         ...state,
         repos: payload,
         loading: false
      }
      default: return state
   }
}



export default reducer