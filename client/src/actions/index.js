import axios from 'axios'
import { FETCH_USER, FETCH_POSTS, ADD_POST } from './types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchPosts = () => async dispatch => {
  const res = await axios.get('/api/posts')
  dispatch({ type: FETCH_POSTS, payload: res.data })
}
