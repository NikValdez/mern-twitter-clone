import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost, deleteComment } from '../actions'
import _ from 'lodash'
import moment from 'moment'
import CommentForm from './CommentForm'
import { Modal, Button } from 'react-bootstrap'

class Post extends Component {
  state = {
    show: false
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId)
  }

  render() {
    const { post } = this.props.post

    const comm = _.map(post.comments, comment => (
      <div className="card comments" key={comment._id}>
        <li>
          <div className="angle-icon-container">
            {comment.name === this.props.auth.firstName ? (
              <i className="fas  fa-angle-down " data-toggle="dropdown" />
            ) : null}
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={this.onDeleteClick.bind(this, post._id, comment._id)}
              >
                Delete Comment
              </button>
            </div>
          </div>
          {comment.text}
          <br />
          <span className="date">
            {moment(comment.date).format('MMMM Do YYYY')}
          </span>
          <br />
        </li>
      </div>
    ))

    return (
      <div>
        <div className="card">
          <h4 className="tweet-text">{post.text}</h4>
          {post.upload && <img width="200" src={post.upload} alt="Upload" />}
          <p className="date tweet-text">
            {' '}
            {moment(post.date).format('MMMM Do YYYY')}
          </p>
        </div>

        <h6 className="comment-title tweet-text">Comments</h6>
        {comm}

        <i className="far fa-comment" onClick={this.handleShow} />

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          className="comment-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Reply to Teewt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CommentForm postId={post._id} handleClose={this.handleClose} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getPost, deleteComment }
)(Post)
