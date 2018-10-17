import React, { Component } from 'react'
import { fetchPosts } from '../actions'
import { connect } from 'react-redux'

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    const { posts } = this.props.post
    const postContent = posts.map(post => {
      return post.text
    })
    return <div>{postContent}</div>
  }
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts)
