import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const loggedUserSelector = state => state.activeUser
  const activeUser = useSelector(loggedUserSelector)
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    const dispatchSuccessful = await dispatch(createBlog(newBlog, activeUser))
    if (dispatchSuccessful) {
      if (blogFormRef) {
        blogFormRef.current.toggleVisibility()
      }
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='blogForm'>
      title:
      <input
        id='input-title'
        type='text'
        name='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      author:
      <input
        id='input-author'
        type='text'
        name='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      url:
      <input
        id='input-url'
        type='text'
        name='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button id='button-create' type='submit'>
        create
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.object
}

export default BlogForm
