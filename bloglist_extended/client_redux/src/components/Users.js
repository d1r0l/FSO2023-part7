import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const usersSelector = state => state.users
  const users = useSelector(usersSelector)
  const navigate = useNavigate()

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td
                onClick={() => {
                  navigate(`/users/${user.id}`)
                }}
              >
                {user.name}
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
