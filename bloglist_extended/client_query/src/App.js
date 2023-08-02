import { useState, useEffect, useRef } from 'react'
import { useNotificationSet } from './components/NotificationContext'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [anotherblogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const setNotification = useNotificationSet()

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 2,
    refetchOnWindowFocus: false
  })
  const blogs = blogsQuery.data

  const blogFormRef = useRef()

  const sortBlogs = blogs => blogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedBloglistAppUser')
    if (storedUser) {
      const loadedUser = JSON.parse(storedUser)
      setUser(loadedUser)
    }
  }, [])

  const handleLogin = async credentials => {
    try {
      const loggedUser = await loginService(credentials)
      if (loggedUser) {
        window.localStorage.setItem(
          'loggedBloglistAppUser',
          JSON.stringify(loggedUser)
        )
        setUser(loggedUser)
        setNotification('login successful', 'green')
      }
    } catch (error) {
      if (error.response.status === 401) {
        setNotification('wrong credentials', 'red')
      } else {
        setNotification('some error occured', 'red')
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistAppUser')
    setNotification('logged out', 'green')
  }

  const queryClient = useQueryClient()

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
    },
    onError: error => {
      if (error.response.data.error) {
        setNotification(error.response.data.error, 'red')
      } else {
        setNotification('an error occured', 'red')
      }
    }
  })

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

  const blogList = () => {
    return (
      <div>
        <p>
          {user.name} logged in&nbsp;
          <button type='button' onClick={handleLogout}>
            logout
          </button>
        </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm
            handleCreateBlog={props => createBlogMutation.mutate(props)}
          />
        </Togglable>
        <br />
        <div>
          {sortBlogs(blogs).map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLikeClick={() => likeBlogMutation.mutate(blog)}
              handleDeleteClick={() => deleteBlogMutation.mutate(blog)}
            />
          ))}
        </div>
      </div>
    )
  }

  if (blogsQuery.isLoading) {
    return (
      <div>
        <h2>Blogs</h2>
        <p>blogs data is loading</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user ? blogList() : <LoginForm handleLogin={handleLogin} />}
    </div>
  )
}

export default App
