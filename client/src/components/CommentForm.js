import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, getPost } from '../actions'

class CommentForm extends Component {
  state = {
    text: '',
    errors: {}
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onSubmit = e => {
    e.preventDefault()
    const { firstName, image } = this.props.auth
    const { postId } = this.props

    const newComment = {
      text: this.state.text,
      name: firstName,
      image: image
    }
    this.props.addComment(postId, newComment)
    this.setState({ text: '' })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state
    return (
      <div className="post-form mb-3" style={{ height: '25rem' }}>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                placeholder="Reply to post"
                className="form-control comment-form-input"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
            </div>
            <button
              type="submit"
              className="tweet-button-modal"
              onClick={this.props.handleClose}
            >
              Reply
            </button>
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
  { addComment, getPost }
)(CommentForm)
