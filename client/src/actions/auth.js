import {
   REGISTER_FAIL, REGISTER_SUCCESS,
   LOADED_USER, AUTH_ERR, LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
   CLEAR_PROFILE
} from './types'
import { setAlert } from './alert'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'


// Load user
export const loadUser = () => async dispatch => {
   if (localStorage.token) {
      setAuthToken(localStorage.token)
   }
   try {
      const res = await axios.get('/api/auth')
      dispatch({
         type: LOADED_USER,
         payload: res.data
      })
   } catch (err) {
      console.log(err)
      dispatch({
         type: AUTH_ERR
      })
   }

}

// Register a new user
export const register = (email, name, password) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   const body = JSON.stringify({ email, name, password })
   try {
      const res = await axios.post('/api/users', body, config)
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
      })
      dispatch(loadUser())
   } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      }
      dispatch({
         type: REGISTER_FAIL
      })
   }
}

// Login
export const login = (email, password) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   const body = JSON.stringify({ email, password })
   try {
      const res = await axios.post('/api/auth', body, config)
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
      })
      dispatch(loadUser())
   } catch (err) {
      // console.log('data',err.response.data)
      const errors = err.response.data.errors
      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      }
      dispatch({
         type: LOGIN_FAIL
      })
   }
}

export const logout = () => dispatch => {
   dispatch({type: LOGOUT})
   dispatch({type: CLEAR_PROFILE})
}