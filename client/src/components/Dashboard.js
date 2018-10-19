import React, { Component } from 'react'
import Posts from './Posts'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Link to="/new_post">
          <button className="btn btn-primary twit-button">Twit</button>
        </Link>
        <Posts />
      </div>
    )
  }
}

export default Dashboard
