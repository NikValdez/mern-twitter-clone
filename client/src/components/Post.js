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
      <li key={comment.date}>
        {comment.text}
        <br />
        {moment(comment.date).format('MMMM Do YYYY')}
        <br />
        <button onClick={this.onDeleteClick.bind(this, post._id, comment._id)}>
          Delete Comment
        </button>
      </li>
    ))

    return (
      <div>
        <h4>Tweet</h4>
        <div className="card">
          <h4>{post.text}</h4>
          <p> {moment(post.date).format('MMMM Do YYYY')}</p>
        </div>

        <h6>Comments</h6>
        <div className="card">{comm}</div>

        <Button variant="primary" onClick={this.handleShow}>
          Add comment
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CommentForm postId={post._id} handleClose={this.handleClose} />
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { getPost, deleteComment }
)(Post)
