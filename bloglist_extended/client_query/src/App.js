import { useState, useEffect, useRef } from 'react'
import { useNotificationSet } from './components/NotificationContext'
import { useQuery } from '@tanstack/react-query'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
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
          <BlogForm user={user} blogFormRef={blogFormRef} />
        </Togglable>
        <br />
        <div>
          {sortBlogs(blogs).map(blog => (
            <Blog key={blog.id} blog={blog} user={user} />
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
