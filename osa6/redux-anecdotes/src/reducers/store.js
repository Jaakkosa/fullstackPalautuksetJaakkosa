import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import reducer from './AnecdoteReducer'
import filterReducer from './FilterReducer'


const store = configureStore({
    reducer: {
        anecdotes: reducer,
        filter: filterReducer,
    }
  })

 



export default store