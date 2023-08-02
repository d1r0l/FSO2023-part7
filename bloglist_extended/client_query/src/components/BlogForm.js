import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationSet } from '../components/NotificationContext'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useActiveUserValue } from './ActiveUserContext'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const user = useActiveUserValue()
  const setNotification = useNotificationSet()
  const queryClient = useQueryClient()

  const handleSubmit = event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    createBlogMutation.mutate(newBlog)
  }

  const createBlogMutation = useMutation({
    mutationFn: async newBlog => {
      const responseBlog = await blogService.createNew(newBlog, user.token)
      const updatedBlog = {
        ...responseBlog,
        user: {
          name: user?.name,
          username: user?.username,
          id: user?.id
        }
      }
      return updatedBlog
    },
    onSuccess: savedBlog => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], () => blogs.concat(savedBlog))
      setNotification(
        `a new blog "${savedBlog.title}" by "${savedBlog.author}" added`,
        'green'
      )
      setTitle('')
      setAuthor('')
      setUrl('')
      if (blogFormRef) {
        blogFormRef.current.toggleVisibility()
      }
    },
    onError: error => {
      if (error.response.data.error) {
        setNotification(error.response.data.error, 'red')
      } else {
        setNotification('an error occured', 'red')
      }
    }
  })

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
