import axios from 'axios'
import {
  FETCH_USER,
  FETCH_POSTS,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  GET_POST
} from './types'

//Get user
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

//Get posts
export const fetchPosts = () => async dispatch => {
  const res = await axios.get('/api/posts')
  dispatch({ type: FETCH_POSTS, payload: res.data })
}

//Get post
export const getPost = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    )
}

// Add Post
export const addPost = postData => async dispatch => {
  const res = await axios.post('/api/posts', postData)
  dispatch({
    type: ADD_POST,
    payload: res.data
  })
}

//Delete Post
export const deletePost = id => dispatch => {
  axios.delete(`/api/posts/${id}`).then(res =>
    dispatch({
      type: DELETE_POST,
      payload: id
    })
  )
}

//Add comment
export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.res.data
      })
    )
}

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
