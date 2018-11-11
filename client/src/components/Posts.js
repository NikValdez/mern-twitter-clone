import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, getPost } from '../actions'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PostForm from './PostForm'
import { Modal, Button } from 'react-bootstrap'

class Posts extends Component {
  state = {
    show: false
  }
  componentDidMount() {
    this.props.fetchPosts()
  }
  onDeleteClick = id => {
    this.props.deletePost(id)
  }

  onGetPost = id => {
    this.props.getPost(id)
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  render() {
    const { posts } = this.props.post
    return (
      <div className="container">
        <Button
          variant="primary"
          onClick={this.handleShow}
          className="tweet-button"
        >
          Teewt
        </Button>
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

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PostForm handleClose={this.handleClose} />
          </Modal.Body>
          <Modal.Footer />
        </Modal>
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
