import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLikeClick, handleDeleteClick }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 3,
    paddingLeft: 4,
    paddingBottom: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <span>
          {blog.title} by {blog.author}{' '}
        </span>
        <button type='button' onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <span>{blog.url}</span>
        <br />
        <span>likes: {blog.likes} </span>
        <button onClick={handleLikeClick}>like</button>
        <br />
        <span>{blog.user.name}</span>
        <br />
        {blog.user.id === user.id && (
          <button onClick={handleDeleteClick}>delete</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired
}

export default Blog
