import { useSelector, useDispatch } from 'react-redux'
import { LiketheAnecdote, CreateAnecdote} from './reducers/AnecdoteReducer'
import React, { useState } from 'react';
import AnecdoteForm from './reducers/AnecdoteForm';
import AnecdoteList from './reducers/AnecdoteList';
import Filter from './reducers/AnexdoeFilter';
const App = () => {
  

 
  

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
    <AnecdoteList/>
      <Filter />
    </div>
  )
}

export default App