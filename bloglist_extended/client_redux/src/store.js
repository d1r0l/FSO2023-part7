import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import activeUserReducer from './reducers/activeUserReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    activeUser: activeUserReducer,
    notification: notificationReducer
  }
})

export default store
