import React, { Component } from 'react'
import TwitterBird from '../images/twitter-bird.png'

class Landing extends Component {
  render() {
    return (
      <div className="grid-container">
        <div className="grid-item1" />
        <div className="grid-item">
          <img
            src={TwitterBird}
            alt=""
            style={{
              width: '4rem',
              float: 'left',
              marginLeft: '6rem',
              marginTop: '8rem'
            }}
          />
          <h4 className="landing-title">
            See what's happening in the world right now
          </h4>
          <h6>Join Rettiwt today</h6>
          <div className="stage">
            <a href="/auth/google">
              <button className="ui button google-auth__button">
                <img
                  className="google-auth__logo"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
                Sign in/Join with Google
              </button>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
