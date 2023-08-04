import { useSelector } from 'react-redux/es/hooks/useSelector'

const Notification = () => {
  const text = useSelector(state => state.notification.text)
  const color = useSelector(state => state.notification.color)

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
