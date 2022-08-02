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
  return request.then(response => response.data)
}

const Poista = (id) => {
  const request = axios.delete('http://localhost:3001/persons/' + String(id))
  return request.then(response => response.data)
}

export default {Luo, Paivita, HaeKaikki, Poista}