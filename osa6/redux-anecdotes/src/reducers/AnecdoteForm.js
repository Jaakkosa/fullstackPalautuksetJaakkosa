import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote} from './AnecdoteReducer'
import React, { useState } from 'react';
import { clearNotification, setNotification } from './notificationReducer';
import { createNewAnecdote } from './AnecdoteReducer';

const AnecdoteForm = () => {
    const [anecdote, setAnecdote] = useState('');
    const dispatch = useDispatch()

    
    const AddAnecdote = (event) => {
        event.preventDefault();
        dispatch(createNewAnecdote(anecdote))
        setAnecdote('')
    dispatch(setNotification(`you created, ${anecdote}`,5))
   

      }

      return (
        <div>
        <h2>create new</h2>
      <form onSubmit={AddAnecdote}>
        <div><input type="text"
            value={anecdote}
            onChange={(event) => setAnecdote(event.target.value)} /></div>
        <button>create</button>
      </form>
      </div>
      )



}

export default AnecdoteForm