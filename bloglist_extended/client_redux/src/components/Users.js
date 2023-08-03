import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const usersSelector = state => state.users
  const users = useSelector(usersSelector)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <b>blogs created:</b>
            </td>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
