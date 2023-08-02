import { createContext, useContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { useNotificationSet } from './NotificationContext'
import loginService from '../services/login'

const activeUserReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return null
    default:
      return state
  }
}

const ActiveUserContext = createContext()

export const ActiveUserContextProvider = props => {
  const [activeUser, activeUserDispatch] = useReducer(activeUserReducer, null)

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedBloglistAppUser')
    if (storedUser) {
      const loadedUser = JSON.parse(storedUser)
      activeUserDispatch({ type: 'SET', payload: loadedUser })
    }
  }, [])

  const setNotification = useNotificationSet()

  const activeUserSet = async credentials => {
    try {
      const loggedUser = await loginService(credentials)
      if (loggedUser) {
        window.localStorage.setItem(
          'loggedBloglistAppUser',
          JSON.stringify(loggedUser)
        )
        activeUserDispatch({ type: 'SET', payload: loggedUser })
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

  const activeUserRemove = () => {
    activeUserDispatch({ type: 'REMOVE' })
    window.localStorage.removeItem('loggedBloglistAppUser')
    setNotification('logged out', 'green')
  }

  return (
    <ActiveUserContext.Provider
      value={[activeUser, activeUserDispatch, activeUserSet, activeUserRemove]}
    >
      {props.children}
    </ActiveUserContext.Provider>
  )
}

export const useActiveUserValue = () => {
  const fullContext = useContext(ActiveUserContext)
  return fullContext[0]
}

export const useActiveUserDispatch = () => {
  const fullContext = useContext(ActiveUserContext)
  return fullContext[1]
}

export const useActiveUserSet = () => {
  const fullContext = useContext(ActiveUserContext)
  return fullContext[2]
}

export const useActiveUserRemove = () => {
  const fullContext = useContext(ActiveUserContext)
  return fullContext[3]
}

ActiveUserContextProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export default ActiveUserContext
