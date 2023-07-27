import { useSelector, useDispatch } from 'react-redux'
import { LiketheAnecdote, CreateAnecdote, setAnecdote} from './reducers/AnecdoteReducer'
import React, { useState } from 'react';
import AnecdoteForm from './reducers/AnecdoteForm';
import AnecdoteList from './reducers/AnecdoteList';
import Filter from './reducers/AnexdoeFilter';
import Notification from './components/Notification';
import { initializeAnecdotes } from './reducers/AnecdoteReducer'
import { useEffect } from 'react';
const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])


  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteForm />
    <AnecdoteList/>
      <Filter />
    </div>
  )
}

export default App