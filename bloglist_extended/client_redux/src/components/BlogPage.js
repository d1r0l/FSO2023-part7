import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'

const BlogPage = () => {
  const blogsSelector = state => state.blogs
  const blogs = useSelector(blogsSelector)
  const activeUserSelector = state => state.activeUser
  const activeUser = useSelector(activeUserSelector)
  const { blogId } = useParams()
  const blog = blogs.find(blog => blog.id === blogId)

  const dispatch = useDispatch()

  if (!blog) return null

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}{' '}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <span>likes: {blog.likes} </span>
      <button onClick={() => dispatch(likeBlog(blog, activeUser))}>like</button>
      <br />
      <span>{blog.user.name}</span>
      <br />
      {blog.user.id === activeUser.id && (
        <button onClick={() => dispatch(deleteBlog(blog, activeUser))}>
          delete
        </button>
      )}
    </div>
  )
}

export default BlogPage
