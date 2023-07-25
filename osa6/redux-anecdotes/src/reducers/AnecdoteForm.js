import { useSelector, useDispatch } from 'react-redux'
import { LiketheAnecdote, CreateAnecdote} from './AnecdoteReducer'
import React, { useState } from 'react';


const AnecdoteForm = () => {
    const [anecdote, setAnecdote] = useState('');
    const dispatch = useDispatch()

    
    const AddAnecdote = (event) => {
        event.preventDefault();
        dispatch(CreateAnecdote(anecdote))
    setAnecdote('')
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