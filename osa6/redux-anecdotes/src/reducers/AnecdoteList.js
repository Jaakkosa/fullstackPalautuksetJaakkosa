import { useSelector, useDispatch } from 'react-redux'
import { likeTheAnecdote, CreateAnecdote} from './AnecdoteReducer'
import React, { useState } from 'react';
import {setNotification } from './notificationReducer';

const AnecdoteList = () => {

    const filter = useSelector((state) => state.filter);


    const anecdotes = useSelector((state) => {
        if (filter === 'ALL') {
          return state.anecdotes;
        } else {
          return state.anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(filter?.toLowerCase())
          );
        }
      });
    const dispatch = useDispatch()
  
    const sortAnecdotes = (anecdotes) => {
      return anecdotes.slice().sort((a, b) => b.votes - a.votes);
    };

    const vote = (anecdote) => {
      dispatch(likeTheAnecdote(anecdote.id))
      dispatch(setNotification(`you liked, ${anecdote.content}`,5))
  
    }

    const sortedAnecdotes = sortAnecdotes(anecdotes)
    const list = (sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
         
        </div>
      ))

  return ( <div>
{list}
</div> 

  )

}

export default AnecdoteList