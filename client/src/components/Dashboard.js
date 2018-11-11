import React, { Component } from 'react'
import Posts from './Posts'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Posts />
      </div>
    )
  }
}

export default Dashboard
