import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = ({ activeUser }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    dispatch(createBlog(newBlog, activeUser))
    setTitle('')
    setAuthor('')
    setUrl('')
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
  activeUser: PropTypes.object.isRequired
}

export default BlogForm
