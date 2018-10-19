import { FETCH_POSTS, ADD_POST } from '../actions/types'

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
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    default:
      return state
  }
}
