import React, { Component } from 'react'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import { connect } from 'react-redux'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Dashboard />
      </div>
    )
  }
}

export default App
