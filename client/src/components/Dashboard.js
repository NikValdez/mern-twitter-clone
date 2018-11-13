import React, { Component } from 'react'
import Posts from './Posts'
import { Link } from 'react-router-dom'
import Post from './Post'

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
