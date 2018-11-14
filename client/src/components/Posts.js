import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, getPost } from '../actions'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PostForm from './PostForm'
import { Modal, Button } from 'react-bootstrap'
import Post from './Post'
import Navbar from './Navbar'

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

  render() {
    const { posts } = this.props.post
    return (
      <div>
        <Navbar handleFormShow={this.handleFormShow} />
        <div className="container">
          <div className="row posts-display">
            {posts.map(({ _id, text, image, date }) => (
              <ul key={_id}>
                <div
                  className="card card-body mb-3 tweet-hover"
                  style={{ width: '35rem' }}
                >
                  <div className="row">
                    <img src={image} alt="profile" className="profile-image" />
                    <div
                      className="mr-3"
                      onClick={this.onGetPost.bind(this, _id)}
                    >
                      <div onClick={this.onGetPost.bind(this, _id)}>
                        <div onClick={this.handleShow}>
                          {text}
                          <p> {moment(date).format('MMMM Do YYYY')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="angle-icon-container">
                      <i class="fas  fa-angle-down " data-toggle="dropdown" />
                      <div class="dropdown-menu">
                        <button
                          class="dropdown-item"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          Delete Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            ))}

            <Modal show={this.state.showForm} onHide={this.handleFormClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PostForm handleFormClose={this.handleFormClose} />
              </Modal.Body>
              <Modal.Footer />
            </Modal>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Post handleClose={this.handleClose} />
              </Modal.Body>
              <Modal.Footer />
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
  post: state.post
})

export default connect(
  mapStateToProps,
  { fetchPosts, deletePost, getPost }
)(Posts)
