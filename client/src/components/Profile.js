import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions'

class Profile extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    const { firstName, image } = this.props.auth
    return (
      <div className="col-3">
        <div className="card">
          <img src={image} alt="" className="profile-pic" />
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
  { fetchUser }
)(Profile)
