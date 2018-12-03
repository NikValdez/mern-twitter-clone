import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser, fetchPosts } from '../actions'

class Profile extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    const { firstName, image, _id } = this.props.auth
    const { posts } = this.props.post
    const userPosts = posts.filter(post => {
      if (post.name === firstName) {
        return post.name
      }
    })

    const postLikes = posts.filter(post => {
      if (post.name === firstName) {
        return post.likes.length
      }
    })

    const mostPopular = posts.map(post => {
      if (post.likes.length > 10) {
        return (
          <li key={post._id}>
            <div className="card" style={{ marginTop: '1rem' }}>
              <h6>{post.text}</h6>
              <p>@{post.name}</p>
              <img src={post.upload} alt="" className="upload-small" />
            </div>
          </li>
        )
      }
    })

    return (
      <div className="col-3">
        <div className="card">
          <img src={image} alt="" className="profile-pic" />
          <p className="profile-name">@{firstName}</p>
          <div className="row">
            <div className="col-6">
              <h5 style={{ marginLeft: '0.5rem' }}>Teewts</h5>
              <p style={{ marginLeft: '1rem' }}>{userPosts.length}</p>
            </div>
            <div className="col-6">
              <h5 style={{ marginRight: '0.5rem' }}>Total Hearts</h5>
              <p>{postLikes.length}</p>
            </div>
          </div>
        </div>
        <div
          className="card"
          style={{ marginTop: '2rem', background: '#ddeaf3' }}
        >
          <h4>Popular Posts</h4>
          {mostPopular}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
})

export default connect(
  mapStateToProps,
  { fetchUser, fetchPosts }
)(Profile)
