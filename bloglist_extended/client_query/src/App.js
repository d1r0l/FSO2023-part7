import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import {
  useActiveUserRemove,
  useActiveUserValue
} from './components/ActiveUserContext'

const App = () => {
  const user = useActiveUserValue()
  const removeUser = useActiveUserRemove()

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 2,
    refetchOnWindowFocus: false
  })
  const blogs = blogsQuery.data

  const blogFormRef = useRef()

  const sortBlogs = blogs => blogs.sort((a, b) => b.likes - a.likes)

  const blogList = () => {
    return (
      <div>
        <p>
          {user.name} logged in&nbsp;
          <button type='button' onClick={() => removeUser()}>
            logout
          </button>
        </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
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
      {user ? blogList() : <LoginForm />}
    </div>
  )
}

export default App
