
import { configureStore } from '@reduxjs/toolkit'
import reducer from './AnecdoteReducer'
import filterReducer from './FilterReducer'
import notificationReducer from './notificationReducer';



const store = configureStore({
    reducer: {
        anecdotes: reducer,
        filter: filterReducer,
        notification: notificationReducer,
    }
  })

 



export default store