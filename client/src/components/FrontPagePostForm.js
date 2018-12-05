import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import Pacman from '../images/Pacman.gif'

class FrontPagePostForm extends Component {
  state = {
    text: '',
    upload: '',
    textError: '',
    loading: false
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
        image: image,
        upload: this.state.upload
      }
      this.props.addPost(newPost)
      this.setState({ text: '', upload: '' })
    }
  }

  uploadFile = async e => {
    this.setState({
      loading: true
    })
    console.log('uploading file...')
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'sickfits') //name must match cloudinary name

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/nikcochran/image/upload',
      {
        method: 'Post',
        body: data
      }
    )
    const file = await res.json()
    console.log(file)
    this.setState({
      upload: file.secure_url,
      loading: false
    })
  }

  render() {
    let button
    if (this.state.text.length > 0 && this.state.text.length <= 280) {
      button = (
        <button
          type="submit"
          className="tweet-button-modal"
          onClick={this.props.handleFormClose}
        >
          Teewt
        </button>
      )
    } else {
      button = (
        <div className="animated lightSpeedIn">
          <span>Teewt above 🖕</span>
        </div>
      )
    }
    return (
      <div className="post-form mb-3">
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Teewt Something..."
                name="text"
                value={this.state.text}
                onChange={this.onChange}
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
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { addPost }
)(FrontPagePostForm)
