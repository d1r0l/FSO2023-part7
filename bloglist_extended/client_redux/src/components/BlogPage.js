import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { deleteBlog, likeBlog, addComment } from '../reducers/blogsReducer'

const BlogPage = () => {
  const [comment, setComment] = useState('')
  const blogs = useSelector(state => state.blogs)
  const activeUser = useSelector(state => state.activeUser)
  const { blogId } = useParams()
  const blog = blogs.find(blog => blog.id === blogId)

  const dispatch = useDispatch()

  if (!blog) return null

  const handleClick = async event => {
    event.preventDefault()
    const dispatchSuccessful = await dispatch(
      addComment(blog, comment, activeUser)
    )
    if (dispatchSuccessful) setComment('')
  }

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
      <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      <br />
      {blog.user.id === activeUser.id && (
        <button onClick={() => dispatch(deleteBlog(blog, activeUser))}>
          delete
        </button>
      )}
      <h3>Comments:</h3>
      <form>
        <input
          id='input-comment'
          type='text'
          name='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type='submit' onClick={handleClick}>
          add comment
        </button>
      </form>
      {blog.comments.length === 0 ? (
        <p>no comments</p>
      ) : (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BlogPage
