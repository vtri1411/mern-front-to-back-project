import {
   CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE
   , ACCOUNT_DELETED, GET_ALL_PROFILE, GET_REPOS
} from './types'
import axios from 'axios'
import { setAlert } from './alert'


export const getCurrentProfile = () => async dispatch => {
   try {
      const res = await axios.get('/api/profile/me')
      dispatch({
         type: GET_PROFILE,
         payload: res.data
      })
   } catch (err) {
      console.log(err)
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

export const getAllProfiles = () => async dispatch => {
   try {
      const res = await axios.get('/api/profile')
      dispatch({
         type: GET_ALL_PROFILE,
         payload: res.data
      })
   } catch (err) {
      console.log(err)
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

export const getProfileById = userId => async dispatch => {
   try {
      const res = await axios.get(`/api/profile/user/${userId}`)
      dispatch({
         type: GET_PROFILE,
         payload: res.data
      })
   } catch (err) {
      console.log(err)
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

export const getGithubRepos = username => async dispatch => {
   try {
      const res = await axios.get(`/api/profile/github/${username}`)
      dispatch({
         type: GET_REPOS,
         payload: res.data
      })
   } catch (err) {
      console.log(err)
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

export const createProfile = (formData, history, edit) => async dispatch => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      const body = JSON.stringify(formData)
      const res = await axios.post('/api/profile', body, config)
      dispatch({
         type: GET_PROFILE,
         payload: res.data
      })
      dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'))
      if (!edit) {
         history.push('/dashboard')
      }
   } catch (err) {
      console.log(err)
      const errors = err.response.data.errors
      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      }
   }
}

// Add experience
export const addExperience = (formData, history) => async dispatch => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      const res = await axios.put('/api/profile/experience', formData, config)
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data
      })
      dispatch(setAlert('Experience added', 'success'))
      history.push('/dashboard')
   } catch (err) {
      console.log(err)
      const errors = err.response.data.errors
      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      }
   }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      const res = await axios.put('/api/profile/education', formData, config)
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data
      })
      dispatch(setAlert('Education added', 'success'))
      history.push('/dashboard')
   } catch (err) {
      console.log(err)
      const errors = err.response.data.errors
      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      }
   }
}


// Delete Experience
export const deleteExperience = id => async dispatch => {
   try {
      const res = await axios.delete(`/api/profile/experience/${id}`)
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data
      })
      dispatch(setAlert('Experience Removed', 'success'))
   } catch (err) {
      console.log(err)
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

// Delete Education
export const deleteEducation = id => async dispatch => {
   try {
      const res = await axios.delete(`/api/profile/education/${id}`)
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data
      })
      dispatch(setAlert('Education Removed', 'success'))
   } catch (err) {
      console.log(err)
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

// Delete Profile & Account
export const deleteProfile = id => async dispatch => {
   if (!window.confirm('Are you sure? This can NOT be UNDONE')) {
      return {}
   }

   try {
      await axios.delete(`/api/profile`)
      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })
      dispatch(setAlert('Your account has been permanantly deleted'))
   } catch (err) {
      console.log(err)
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}