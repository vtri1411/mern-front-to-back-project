import {
   REGISTER_FAIL, REGISTER_SUCCESS, LOADED_USER,
   AUTH_ERR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT,
   ACCOUNT_DELETED
} from "../actions/types"

const initialState = {
   token: localStorage.getItem('token'),
   isAuthenticated: false,
   loading: true,
   user: null,
}

const reducer = (state = initialState, action) => {
   const { type, payload } = action
   switch (type) {
      case LOADED_USER: return {
         ...state,
         isAuthenticated: true,
         loading: false,
         user: payload
      }
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload,
            loading: false,
            isAuthenticated: true
         }
      case REGISTER_FAIL:
      case AUTH_ERR:
      case LOGIN_FAIL:
      case LOGOUT:
      case ACCOUNT_DELETED:
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            loading: false,
            isAuthenticated: false
         }
      default: return state
   }
}

export default reducer