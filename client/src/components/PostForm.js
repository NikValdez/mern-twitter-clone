import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions'

class PostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const { firstName, image } = this.props.auth

    const newPost = {
      text: this.state.text,
      name: firstName,
      image: image
    }
    this.props.addPost(newPost)
    this.setState({ text: '' })
    this.props.history.push('/dashboard')
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
              </div>
              <button type="submit" className="btn btn-dark">
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
