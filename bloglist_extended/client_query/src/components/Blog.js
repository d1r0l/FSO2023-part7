import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationSet } from './NotificationContext'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(!visible)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const queryClient = useQueryClient()
  const setNotification = useNotificationSet()

  const likeBlogMutation = useMutation({
    mutationFn: async selectedBlog => {
      const preparedBlog = {
        ...selectedBlog,
        likes: selectedBlog.likes + 1,
        user: selectedBlog.user.id
      }
      const responseBlog = await blogService.addLike(preparedBlog, user.token)
      const updatedBlog = { ...responseBlog, user: selectedBlog.user }
      return updatedBlog
    },
    onSuccess: savedBlog => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], () =>
        blogs.map(blog => (blog.id === savedBlog.id ? savedBlog : blog))
      )
      setNotification(
        `a blog "${savedBlog.title}" by "${savedBlog.author}" likes updated`,
        'green'
      )
    },
    onError: error => {
      if (error.response.data.error) {
        setNotification(error.response.data.error, 'red')
      } else {
        setNotification('an error occured', 'red')
      }
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: async selectedBlog => {
      if (
        window.confirm(
          `Remove blog "${selectedBlog.title}" by "${selectedBlog.author}"?`
        )
      ) {
        await blogService.deleteBlog(selectedBlog, user.token)
        return selectedBlog
      } else return null
    },
    onSuccess: deletedBlog => {
      if (deletedBlog) {
        const blogs = queryClient.getQueryData(['blogs'])
        queryClient.setQueryData(['blogs'], () =>
          blogs.filter(blog => blog.id !== deletedBlog.id)
        )
        setNotification(
          `a blog "${deletedBlog.title}" by "${deletedBlog.author}" deleted`,
          'green'
        )
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
        <button onClick={() => likeBlogMutation.mutate(blog)}>like</button>
        <br />
        <span>{blog.user.name}</span>
        <br />
        {blog.user.id === user.id && (
          <button onClick={() => deleteBlogMutation.mutate(blog)}>
            delete
          </button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
