import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdote) => {

    const response = await axios.post(baseUrl,anecdote)
    console.log(response)
    return response.data
}

const like = async (id) => {
  const anecdotes = await axios.get(baseUrl)
const theonetolike = anecdotes.data.find(a => a.id === id);
const updatedAnecdote = {
  ...theonetolike,
  votes: theonetolike.votes + 1
}
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  console.log(response)
  return response.data
}

export default { getAll, create, like }