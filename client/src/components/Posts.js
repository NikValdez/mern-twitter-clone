import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, getPost } from '../actions'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  onDeleteClick = id => {
    this.props.deletePost(id)
  }

  onGetPost = id => {
    this.props.getPost(id)
  }

  render() {
    const { posts } = this.props.post
    return (
      <div className="container">
        {posts.map(({ _id, text, image, date }) => (
          <ul key={_id}>
            <div className="card card-body mb-3" style={{ width: '35rem' }}>
              <div className="row">
                <img src={image} alt="profile" className="profile-image" />
                <div className="mr-3">
                  <h4 onClick={this.onGetPost.bind(this, _id)}>
                    <Link to={`/posts/${_id}`}>{text}</Link>
                  </h4>
                </div>
                <div className="mr-3">
                  {moment(date).format('MMMM Do YYYY')}
                </div>
                <button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={this.onDeleteClick.bind(this, _id)}
                >
                  Delete Post
                </button>
              </div>
            </div>
          </ul>
        ))}
      </div>
    )
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost, getPost }
)(Posts)
