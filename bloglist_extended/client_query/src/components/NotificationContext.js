import { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return {
        text: action.payload.text,
        color: action.payload.color
      }
    case 'RESET':
      return {
        text: '',
        color: 'green'
      }
    default:
      return state
  }
}

const NotificationContext = createContext()

let timeoutId = null
const delaySec = 5

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    text: '',
    color: 'green'
  })

  const notificationSet = (text, color) => {
    clearTimeout(timeoutId)
    notificationDispatch({ type: 'SET', payload: { text: text, color: color } })
    timeoutId = setTimeout(
      () => notificationDispatch({ type: 'RESET' }),
      delaySec * 1000
    )
  }

  return (
    <NotificationContext.Provider
      value={[notification, notificationDispatch, notificationSet]}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const fullContext = useContext(NotificationContext)
  return fullContext[0]
}

export const useNotificationDispatch = () => {
  const fullContext = useContext(NotificationContext)
  return fullContext[1]
}

export const useNotificationSet = () => {
  const fullContext = useContext(NotificationContext)
  return fullContext[2]
}

NotificationContextProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export default NotificationContext
