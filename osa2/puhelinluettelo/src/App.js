import { useState, useEffect } from 'react'
import axios from 'axios'
import Numero from "./Numero"
import Filter from "./Filter"
import HenkilöPlus from "./Henkilö"

const App = () => {

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  const [persons, setPersons] = useState([
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newRajaus, setNewRajaus] = useState('')
  const [näytetäänkö, setNäytetäänkö] = useState(true)


 

  const addNew = (event) => {
event.preventDefault()
const Nimi = {
  name: newName,
  number: newNumber
} 

const löytyykö = (henkilö) => henkilö.name === Nimi.name
if(persons.some(löytyykö)){
  alert(`${Nimi.name} allready added`)
}
else{
setPersons(persons.concat(Nimi))
setNewName('')
setNewNumber('')
}
  }
const sisällönTutkiminen = (event) => {
setNewName(event.target.value)
}

const numeronTutkiminen = (event) => {
  setNewNumber(event.target.value)
  
}

 

const rajauksenTutkiminen = (event) => {
  setNewRajaus(event.target.value)
  const kuuluuko = (henkilö) => henkilö.name.toLowerCase().includes(newRajaus.toLowerCase())
  console.log(newRajaus.toLowerCase())


 setNäytetäänkö(persons.some(kuuluuko))
}

const RajausToShow = näytetäänkö
? persons.filter(note => note.name.toLowerCase().includes(newRajaus.toLowerCase()))
: persons.filter(note => note.name.toLowerCase().includes(newRajaus.toLowerCase()))




  return (
    <div>
      <h2>Phonebook</h2>
      <Filter rajaus = {newRajaus} muutos = {rajauksenTutkiminen} />
      <HenkilöPlus nimitys = {newName} tutkiminen = {sisällönTutkiminen} numeroitus = {newNumber} numeronTutkiminen = {numeronTutkiminen} uusi = {addNew} />
      <h2>Numbers</h2>
{RajausToShow.map(person => <Numero key={person.name} name={person.name} number={person.number}/> )}
    </div>
  )

}

export default App