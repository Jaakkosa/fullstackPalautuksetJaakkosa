import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNotification } from './components/Notification'

import axios from 'axios';


const App = () => {
  const { showNotification } = useNotification()

  const queryClient = useQueryClient();
  const baseUrl = 'http://localhost:3001/anecdotes'

  const aanestys = anecdote =>
  axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  }).then (takaisin => takaisin.data);

  const voteAnecdote = useMutation(aanestys, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })


  const handleVote = (anecdote) => {
    voteAnecdote.mutate(anecdote);
    showNotification(`${anecdote.content} voted`)

  }


  const result = useQuery(
    'anecdotes',
    () => axios.get('http://localhost:3001/anecdotes').then(res => res.data)
  )
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <span>Anecdote service is not available due to problems in server</span>
  }

  const anecdotes = result.data



  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
