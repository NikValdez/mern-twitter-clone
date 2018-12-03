import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchPosts,
  deletePost,
  getPost,
  addLike,
  removeLike
} from '../actions'
import PropTypes from 'prop-types'
import moment from 'moment'
import PostForm from './PostForm'
import { Modal } from 'react-bootstrap'
import Post from './Post'
import Navbar from './Navbar'
import Profile from './Profile'

class Posts extends Component {
  state = {
    show: false,
    showForm: false
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

  handleFormClose = () => {
    this.setState({ showForm: false })
  }

  handleFormShow = () => {
    this.setState({ showForm: true })
  }

  onLike = id => {
    const { posts } = this.props.post
    const newLike = {
      count: this.props.auth._id
    }

    this.props.addLike(id, newLike)
    setTimeout(() => {
      this.props.fetchPosts()
    }, 300)
  }

  render() {
    const { posts } = this.props.post
    const { auth } = this.props

    return (
      <div>
        <Navbar handleFormShow={this.handleFormShow} />
        <div className="container">
          <div className="row">
            <Profile />
            <div
              className="card"
              style={{
                width: '34rem',
                marginLeft: '5rem',
                height: '13rem',
                marginBottom: '2rem'
              }}
            >
              <PostForm />
            </div>

            {posts.map(
              ({ _id, text, image, date, upload, comments, likes, name }) => (
                <ul key={_id} className="tweet-card">
                  <div
                    className="card card-body mb-3 tweet-hover"
                    style={{ width: '35rem' }}
                  >
                    <img
                      src={image}
                      alt="profile image"
                      className="tweet-card-image"
                    />

                    <div onClick={this.onGetPost.bind(this, _id)}>
                      {name === auth.firstName ? (
                        <div className="angle-icon-container">
                          <i
                            className="fas  fa-angle-down "
                            data-toggle="dropdown"
                          />
                          <div className="dropdown-menu">
                            <button
                              className="dropdown-item"
                              onClick={this.onDeleteClick.bind(this, _id)}
                            >
                              Delete Post
                            </button>
                          </div>
                        </div>
                      ) : null}
                      <div onClick={this.handleShow}>
                        <p className="tweet-text">{text}</p>
                        {upload && (
                          <img
                            width="200"
                            src={upload}
                            alt="Upload"
                            className="upload-small"
                          />
                        )}
                        <p className="date tweet-text">
                          {' '}
                          {moment(date).format('MMMM Do YYYY')}
                        </p>
                        <div className="comment">
                          <i
                            className="far fa-comment"
                            onClick={this.handleCommentShow}
                          />
                          <span className="comment-count">
                            {comments.length ? comments.length : null}
                          </span>
                        </div>
                      </div>
                    </div>
                    {likes.find(like => like.count === auth._id) ? (
                      <i
                        className="fas fa-heart" //Solid heart
                      />
                    ) : (
                      <i
                        className="far fa-heart" //empty heart
                        onClick={this.onLike.bind(this, _id)}
                      />
                    )}

                    <span />

                    <span className="like-count">
                      {likes.length ? likes.length : null}
                    </span>
                  </div>
                </ul>
              )
            )}

            <Modal show={this.state.showForm} onHide={this.handleFormClose}>
              <Modal.Header closeButton>
                <Modal.Title className="modal-title">
                  Compose a new Teewt
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PostForm handleFormClose={this.handleFormClose} />
              </Modal.Body>
            </Modal>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Teewt</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Post handleClose={this.handleClose} />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost, getPost, addLike, removeLike }
)(Posts)
