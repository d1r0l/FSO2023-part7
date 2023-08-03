import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Users = () => {
  const usersSelector = state => state.users
  const users = useSelector(usersSelector)
  const { userId } = useParams()
  const user = users.find(user => user.id === userId)

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs:</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Users
