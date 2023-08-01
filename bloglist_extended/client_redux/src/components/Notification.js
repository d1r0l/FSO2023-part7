import { useSelector } from 'react-redux/es/hooks/useSelector'

const Notification = () => {
  const notificationTextSelector = state => state.notification.text
  const notificationColorSelector = state => state.notification.color
  const text = useSelector(notificationTextSelector)
  const color = useSelector(notificationColorSelector)

  if (text === '') return null
  else {
    return (
      <div
        style={{
          color: color,
          background: 'lightgrey',
          fontSize: 20,
          borderStyle: 'solid',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10
        }}
      >
        {text}
      </div>
    )
  }
}

export default Notification
