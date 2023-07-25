import { useSelector, useDispatch } from 'react-redux'
import { LiketheAnecdote, CreateAnecdote} from './AnecdoteReducer'
import React, { useState } from 'react';

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
  
  
    const vote = (id) => {
     dispatch(LiketheAnecdote(id))
    }

    const list = (anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
         
        </div>
      ))

  return ( <div>
{list}
</div> 

  )

}

export default AnecdoteList