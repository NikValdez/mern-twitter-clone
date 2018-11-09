import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../actions'
import _ from 'lodash'
import moment from 'moment'
import CommentForm from './CommentForm'

class Post extends Component {
  render() {
    const { post } = this.props.post

    const comm = _.map(post.comments, comment => (
      <li key={comment.date}>
        {comment.text}
        <br />
        {moment(comment.date).format('MMMM Do YYYY')}
      </li>
    ))

    return (
      <div>
        <h4>Tweet</h4>
        <div className="card">
          <h4>{post.text}</h4>
          <p> {moment(post.date).format('MMMM Do YYYY')}</p>
        </div>

        <h6>Comments</h6>
        <div className="card">{comm}</div>
        <CommentForm postId={post._id} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { getPost }
)(Post)
