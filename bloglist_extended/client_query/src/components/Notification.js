import { useNotificationValue } from './NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  const text = notification.text
  const color = notification.color

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
