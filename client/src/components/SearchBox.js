import React, { Component } from 'react'
import Downshift from 'downshift'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchPosts, getPost } from '../actions'
import Post from './Post'

class SearchBox extends Component {
  state = {
    show: false,
    searchText: '',
    showForm: false
  }
  componentDidMount() {
    this.props.fetchPosts()
  }

  handleClose = () => {
    this.setState({ show: false })
  }
  onSelect = id => {
    this.setState({
      show: true,
      searchText: ''
    })
  }

  onGetPost = id => {
    this.props.getPost(id)
  }

  render() {
    const { posts } = this.props.post
    return (
      <div
        style={{
          position: 'absolute',
          top: '5px',
          left: '10rem',
          zIndex: '999',
          marginBottom: '5px'
        }}
      >
        <Downshift
          onChange={this.onSelect}
          itemToString={posts => (posts ? posts.text : '')}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => (
            <div>
              <input
                {...getInputProps({ placeholder: 'Search Teewts' })}
                className="form-control mr-sm-2 search"
              />
              {isOpen ? (
                <div className="downshift-dropdown" style={{ width: '30px' }}>
                  {posts
                    .filter(
                      item =>
                        !inputValue ||
                        item.text
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <div
                        className="dropdown-item"
                        {...getItemProps({ key: item.text, index, item })}
                        style={{
                          backgroundColor:
                            highlightedIndex === index
                              ? '#8ec0f5'
                              : 'transparent',
                          fontWeight: selectedItem === item ? 'bold' : 'normal'
                        }}
                      >
                        <div onClick={this.onGetPost.bind(this, item._id)}>
                          {item.text}
                        </div>
                      </div>
                    ))}
                </div>
              ) : null}
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Teewt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {<Post handleClose={this.handleClose} />}
                </Modal.Body>
              </Modal>
            </div>
          )}
        </Downshift>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { fetchPosts, getPost }
)(SearchBox)
