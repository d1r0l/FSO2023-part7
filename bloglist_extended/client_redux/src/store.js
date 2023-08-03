import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import activeUserReducer from './reducers/activeUserReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    activeUser: activeUserReducer,
    notification: notificationReducer
  }
})

export default store
