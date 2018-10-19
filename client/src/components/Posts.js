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
      return (
        <ul>
          <div className="card">
            <div className="card-body">
              <img src={post.image} className="profile-image" />
              {post.text}
            </div>
          </div>
        </ul>
      )
    })
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{postContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts)
