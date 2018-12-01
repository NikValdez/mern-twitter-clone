import React, { Component } from 'react'
import Posts from './Posts'
import { Link } from 'react-router-dom'
import Profile from './Profile'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Posts />
      </div>
    )
  }
}

export default Dashboard
