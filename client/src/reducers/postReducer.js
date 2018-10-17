import { FETCH_POSTS } from '../actions/types'

const initialState = {
  posts: [],
  post: {},
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload || false,
        loading: false
      }
    default:
      return state
  }
}
