import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import '../App.css'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Navbar from './Navbar'
import Landing from './Landing'
import Posts from './Posts'
import PostForm from './PostForm'
import SearchBox from './SearchBox'

import Dashboard from './Dashboard'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {!this.props.auth ? (
            <Route exact path="/" component={Landing} />
          ) : (
            <Route exact path="/" component={Dashboard} />
          )}

          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/posts" component={Posts} />
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  actions
)(App)
