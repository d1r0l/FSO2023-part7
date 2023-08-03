import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const loggedUserSelector = state => state.activeUser
  const activeUser = useSelector(loggedUserSelector)

  const dispatch = useDispatch()

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

  const viewBtnStyle = {
    marginLeft: 4
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <span>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </span>
        <button style={viewBtnStyle} type='button' onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <span>{blog.url}</span>
        <br />
        <span>likes: {blog.likes} </span>
        <button onClick={() => dispatch(likeBlog(blog, activeUser))}>
          like
        </button>
        <br />
        <span>{blog.user.name}</span>
        <br />
        {blog.user.id === activeUser.id && (
          <button onClick={() => dispatch(deleteBlog(blog, activeUser))}>
            delete
          </button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
