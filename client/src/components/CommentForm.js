import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, getPost, fetchPosts } from '../actions'

class CommentForm extends Component {
  state = {
    text: '',
    errors: {}
  }

  validate = () => {
    let isError = false
    const errors = {}
    if (this.state.text.length < 1 || this.state.text.length > 280) {
      isError = true
      errors.textError = 'Post must be between 1 and 280 characters'
    }

    if (isError) {
      this.setState({
        ...this.state,
        ...errors
      })
    }

    return isError
  }

  onSubmit = e => {
    e.preventDefault()
    const { firstName, image } = this.props.auth
    const { postId } = this.props

    //check for errors
    const err = this.validate()
    if (!err) {
      const newComment = {
        text: this.state.text,
        name: firstName,
        image: image
      }
      this.props.addComment(postId, newComment)
      this.setState({ text: '' })
      setTimeout(() => {
        this.props.fetchPosts()
      }, 300)
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state
    let button
    if (this.state.text.length > 0 && this.state.text.length <= 280) {
      button = (
        <button
          type="submit"
          className="tweet-button-modal"
          onClick={this.props.handleClose}
        >
          Reply
        </button>
      )
    } else {
      button = (
        <div className="animated lightSpeedIn">
          <p>Add your reply above 🖕</p>
        </div>
      )
    }

    return (
      <div className="post-form mb-3" style={{ height: '25rem' }}>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <textarea
                placeholder="Reply to post"
                className="form-control comment-form-input"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
            </div>
            {button}
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { addComment, getPost, fetchPosts }
)(CommentForm)
