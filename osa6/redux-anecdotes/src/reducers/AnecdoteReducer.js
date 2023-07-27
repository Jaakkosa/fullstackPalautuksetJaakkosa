import { createSlice } from '@reduxjs/toolkit'
import anecdoteservice from '../services/anecdoteservice'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a latasdfsdfe software project makes it later!',
  'The first 90 percasdfsadfent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write codeasdfsadf that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the asdfsadfroot of all evil.',
  'Debugging is twice as hardasdfsadf as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}



const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    likeAnecdote(state, action) {
      const id = action.payload;
      const anecdote = state.find(a => a.id === id);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
    createAnecdote(state, action) {
      const newAnecdote = action.payload
      state.push(newAnecdote);
   

    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})






export const {likeAnecdote,createAnecdote, setAnecdote, appendAnecdote,} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteservice.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteservice.create(asObject(content))
    console.log(newAnecdote)
    dispatch(createAnecdote(newAnecdote))

  }
}

export const likeTheAnecdote = (id) => {
  return async dispatch => {
    await anecdoteservice.like(id)
  dispatch(likeAnecdote(id))

  }
}

export default anecdoteSlice.reducer