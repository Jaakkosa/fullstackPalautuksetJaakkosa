import axios from 'axios'


const baseUrl = 'http://localhost:3001/persons'

const HaeKaikki = () => {
    const request = axios.get(baseUrl)
  
    return request.then(response => response.data)
  }


const Luo = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const Paivita = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  request.then(response => response.data)
}

const Poista = (id) => {
  const request = axios.delete('http://localhost:3001/persons/' + String(id))
  try{ return( request.then(response => response.data))} catch{ return( request.catch((error) => error )) }
}

export default {Luo, Paivita, HaeKaikki, Poista}