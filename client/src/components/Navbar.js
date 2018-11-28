import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import SearchBox from './SearchBox'

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
          <>
            <ul>
              <SearchBox />
            </ul>

            <ul className="twitter-logo">
              <i
                className="fab fa-twitter fa-lg"
                style={{ color: '#1da1f2' }}
              />
            </ul>
            <div className="dropdown">
              <img
                src={this.props.auth.image}
                alt=""
                className="profile-image dropdown-toggle"
                data-toggle="dropdown"
              />
              <span className="dropdown-menu logout">
                <ul className="dropdown" key={this.props.auth._id}>
                  <a href="/api/logout">Logout</a>
                </ul>
              </span>
            </div>
          </>
        )
    }
  }

  render() {
    return (
      <nav
        className="navbar navbar-light bg-light justify-content-between"
        style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #80808094',
          maxHeight: '5rem'
        }}
      >
        <Link
          to={this.props.auth ? '/dashboard' : '/'}
          className="left brand-logo"
        >
          <i className="fas fa-home" />
          Home
        </Link>

        {this.renderContent()}

        <Button onClick={this.props.handleFormShow} className="tweet-button">
          Teewt
        </Button>
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps)(Navbar)
