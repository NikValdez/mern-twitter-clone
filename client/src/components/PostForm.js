import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions'

class PostForm extends Component {
  state = {
    text: '',
    textError: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
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
    //check for errors
    const err = this.validate()
    if (!err) {
      const newPost = {
        text: this.state.text,
        name: firstName,
        image: image
      }
      this.props.addPost(newPost)
      this.setState({ text: '' })
    }
  }

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            TweetClone someting...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
                <div className="animated lightSpeedIn">
                  {this.state.textError}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-dark"
                onClick={this.props.handleClose}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm)
