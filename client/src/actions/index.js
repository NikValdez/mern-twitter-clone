import axios from 'axios'
import {
  FETCH_USER,
  FETCH_POSTS,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS
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
