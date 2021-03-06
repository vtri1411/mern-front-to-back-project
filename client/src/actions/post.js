import { ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES } from "./types"
import axios from 'axios'
import { setAlert } from './alert'

export const getPosts = () => async dispatch => {
   try {
      const res = await axios.get('/api/posts')
      dispatch({
         type: GET_POSTS,
         payload: res.data
      })
   } catch (err) {
      console.log(err)
      dispatch({
         type: POST_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

export const addLike = postId => async dispatch => {
   try {
      const res = await axios.put(`/api/posts/like/${postId}`)
      dispatch({
         type: UPDATE_LIKES,
         payload: { postId, likes: res.data }
      })
   } catch (err) {
      console.log(err)
      dispatch({
         type: POST_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

export const removeLike = postId => async dispatch => {
   try {
      const res = await axios.put(`/api/posts/unlike/${postId}`)
      dispatch({
         type: UPDATE_LIKES,
         payload: { postId, likes: res.data }
      })
   } catch (err) {
      console.log(err)
      dispatch({
         type: POST_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

export const deletePost = postId => async dispatch => {
   try {
      const res = await axios.delete(`/api/posts/${postId}`)
      dispatch({
         type: DELETE_POST,
         payload: postId
      })
      dispatch(setAlert('Post deleted', 'success'))
   } catch (err) {
      console.log(err)
      dispatch({
         type: POST_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

export const addPost = formData => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   try {
      const res = await axios.post(`/api/posts`, formData, config)
      dispatch({
         type: ADD_POST,
         payload: res.data
      })
      dispatch(setAlert('Post created', 'success'))
   } catch (err) {
      console.log(err)
      dispatch({
         type: POST_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}


export const getPost = postId => async dispatch => {
   try {
      const res = await axios.get(`/api/posts/${postId}`)
      dispatch({
         type: GET_POST,
         payload: res.data
      })
   } catch (err) {
      console.log(err)
      dispatch({
         type: POST_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

export const addComment = (postId, formData) => async dispatch => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      const res = await axios.post(`/api/posts/comment/${postId}`, formData, config)
      dispatch({
         type: ADD_COMMENT,
         payload: res.data
      })
      dispatch(setAlert('Comment added', 'success'))
   } catch (err) {
      console.log(err)
      dispatch({
         type: POST_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}

export const deleteComment = (postId, commentId) => async dispatch => {
   try {
      const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
      dispatch({
         type: REMOVE_COMMENT,
         payload: commentId
      })
      dispatch(setAlert('Comment removed', 'success'))
   } catch (err) {
      console.log(err)
      dispatch({
         type: POST_ERROR,
         payload: {
            msg: err.response.statusText,
            status: err.response.status
         }
      })
   }
}