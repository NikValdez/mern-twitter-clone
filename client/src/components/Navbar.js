import React, { Component } from 'react'

class Navbar extends Component {
  render() {
    return (
      <div className="navbar navbar-full navbar-light bg-faded">
        <div className="container">
          <span className="navbar-brand">TwitterClone</span>
          <ul className="nav  pull-xs-right">
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Navbar
