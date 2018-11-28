import React, { Component } from 'react'
import Downshift from 'downshift'
import { connect } from 'react-redux'
import { fetchPosts, getPost } from '../actions'

class SearchBox extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }
  render() {
    const { posts } = this.props.post
    console.log(posts)

    const onChange = selectedBook => {
      alert(`your favourite book is ${selectedBook.text}`)
    }

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
          onChange={onChange}
          itemToString={posts => (posts ? posts.text : '')}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            highlightedItem,
            getLabelProps
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
                        {item.text}
                      </div>
                    ))}
                </div>
              ) : null}
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
