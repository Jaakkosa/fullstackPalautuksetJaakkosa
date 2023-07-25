import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/AnecdoteReducer'
import filterReducer from './reducers/FilterReducer'


const reduceri = combineReducers({
  anecdotes: reducer,
  filter: filterReducer,
})

const store = createStore(reduceri)

console.log(store.getState())


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)