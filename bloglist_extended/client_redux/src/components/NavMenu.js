import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/activeUserReducer'

const navMenuStyle = {
  backgroundColor: 'silver',
  padding: 4,
  marginBottom: 5
}
const elementsSlyle = {
  margin: 4
}

const NavMenu = () => {
  const activeUser = useSelector(state => state.activeUser)

  const dispatch = useDispatch()

  return (
    <div style={navMenuStyle}>
      <Link style={elementsSlyle} to='/'>
        Blogs
      </Link>
      <Link style={elementsSlyle} to='/users'>
        Users
      </Link>
      {activeUser ? (
        <>
          <span style={elementsSlyle}>{activeUser.name} logged in</span>
          <button type='button' onClick={() => dispatch(logoutUser())}>
            logout
          </button>
        </>
      ) : null}
    </div>
  )
}

export default NavMenu
