import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ notifyColor, setNotifyColor ] = useState('green')
  const [ notifyText, setNotifyText ] = useState('')

  const blogFormRef = useRef()

  const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const blogsLoader = async () => {
      const response = await blogService.getAll()
      setBlogs(response)
    }
    blogsLoader()
  }, [])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedBloglistAppUser')
    if (storedUser) {
      const loadedUser = JSON.parse(storedUser)
      setUser(loadedUser)
    }
  }, [])

  const handleLogin = async (credentials) => {
    const loggedUser = await loginService(credentials)
    if (loggedUser) {
      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(loggedUser))
      setUser(loggedUser)
      setNotification('login successful', 'green')
    } else {
      setNotification('wrong credentials', 'red')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistAppUser')
    setNotification('logged out', 'green')
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.createNew(newBlog, user.token)
      const savedBlogWithUser = {
        ...savedBlog,
        user: {
          name: user?.name,
          username: user?.username,
          id: user?.id
        }
      }
      const updatedBlogs = blogs.concat(savedBlogWithUser)
      blogFormRef.current.toggleVisibility()
      setBlogs(updatedBlogs)
      setNotification(`a new blog "${savedBlog.title}" by "${savedBlog.author}" added`, 'green')
    } catch (error) {
      console.log(error)
      if (error.response.data.error) {
        setNotification(error.response.data.error, 'red')
      } else {
        setNotification('an error occured', 'red')
      }
    }
  }

  const handleLikeBlog = async (selectedBlog) => {
    try {
      const requestBlog = { ...selectedBlog, likes: selectedBlog.likes + 1, user: selectedBlog.user.id }
      const responseBlog = await blogService.addLike(requestBlog, user.token)
      const updatedBlog = { ...responseBlog, user: selectedBlog.user }
      const updatedBlogs = blogs.map(blog =>
        blog.id === responseBlog.id
          ? updatedBlog
          : blog
      )
      setBlogs(updatedBlogs)
      setNotification(`a blog "${responseBlog.title}" by "${responseBlog.author}" likes updated`, 'green')
    } catch (error) {
      console.log(error)
      if (error.response.data.error) {
        setNotification(error.response.data.error, 'red')
      } else {
        setNotification('an error occured', 'red')
      }
    }
  }

  const handleDeleteBlog = async (selectedBlog) => {
    if (window.confirm(`Remove blog "${selectedBlog.title}" by "${selectedBlog.author}"?`)) {
      try {
        await blogService.deleteBlog(selectedBlog, user.token)
        const updatedBlogs = blogs.filter((blog) => blog.id !== selectedBlog.id)
        setBlogs(updatedBlogs)
        setNotification(`a blog "${selectedBlog.title}" by "${selectedBlog.author}" deleted`, 'green')
      } catch (error) {
        console.log(error)
        if (error.response.data.error) {
          setNotification(error.response.data.error, 'red')
        } else {
          setNotification('an error occured', 'red')
        }
      }
    }
  }

  const setNotification = (text, color) => {
    setNotifyText(text)
    setNotifyColor(color)
    setTimeout(() => setNotifyText(''), 2500)
  }

  const blogList = () => {
    return(
      <div>
        <p>
          {user.name} logged in&nbsp;
          <button type='button' onClick={handleLogout}>
            logout
          </button>
        </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm handleCreateBlog={handleCreateBlog}/>
        </Togglable>
        <br/>
        <div>
          {sortBlogs(blogs).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLikeClick={() => handleLikeBlog(blog)}
              handleDeleteClick={() => handleDeleteBlog(blog)}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification text={notifyText} color={notifyColor}/>
      {user
        ? blogList()
        : <LoginForm handleLogin={handleLogin}/>
      }
    </div>
  )
}

export default App
