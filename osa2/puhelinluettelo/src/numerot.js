import axios from 'axios'


const baseUrl = '/api/persons'

const HaeKaikki = () => {
    const request = axios.get(baseUrl)
  
    return request.then(response => response.data)
  }



const Luo = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data).catch(error => {return error.response.data})
}

const Paivita = (id, newObject) => {
  const request = axios.put('/api/persons/' + String(id), newObject)
  return request.then(response => response.data)
}

const Poista = (id) => {
  const request = axios.delete('/api/persons/' + String(id))
  try{ return( request.then(response => response.data))} catch{ return( request.catch((error) => error )) }
}

export default {Luo, Paivita, HaeKaikki, Poista}