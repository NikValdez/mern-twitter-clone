import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import '../App.css'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Navbar from './Navbar'
import Landing from './Landing'
import Posts from './Posts'
import PostForm from './PostForm'

import Dashboard from './Dashboard'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/new_post" component={PostForm} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(
  null,
  actions
)(App)
