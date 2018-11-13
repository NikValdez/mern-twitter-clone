import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

class Navbar extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return
      case false:
        return (
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/auth/google">Login</a>
            </li>
          </ul>
        )
      default:
        return (
          <div>
            <ul className="navbar-nav" key={this.props.auth._id}>
              <li className="nav-item">
                <a href="/api/logout">Logout</a>
              </li>
              <Button
                onClick={this.props.handleFormShow}
                className="tweet-button"
              >
                Teewt
              </Button>
            </ul>
          </div>
        )
    }
  }

  render() {
    return (
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: '#fff', borderBottom: '1px solid #80808094' }}
      >
        <Link
          to={this.props.auth ? '/dashboard' : '/'}
          className="left brand-logo"
        >
          <i className="fas fa-home" />
          Home
        </Link>

        <ul className="twitter-logo">
          <i className="fab fa-twitter fa-lg" style={{ color: '#1da1f2' }} />
        </ul>

        {this.renderContent()}
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(Navbar)
