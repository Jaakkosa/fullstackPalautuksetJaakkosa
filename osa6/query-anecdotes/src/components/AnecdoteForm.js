import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'



const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const baseUrl = 'http://localhost:3001/anecdotes'

  const createAnecdote = newNote =>
  axios.post(baseUrl, newNote).then(res => res.data)

  const newAnecdote = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })
    const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
newAnecdote.mutate(asObject(content))
    event.target.anecdote.value = ''
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
