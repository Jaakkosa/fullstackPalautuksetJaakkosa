import { useState } from 'react'
import Numero from "./Numero"

const App = () => {
  const [persons, setPersons] = useState([
    { name:'Arto Hellas',
  number: 12345645322}
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
      <div>
        filter shown with <input value = {newRajaus} onChange = {rajauksenTutkiminen} />
      </div>
      <form onSubmit={addNew}>
        <div>
          name: <input value = {newName} onChange = {sisällönTutkiminen} />
        </div>
        <div>
          number: <input value = {newNumber} onChange = {numeronTutkiminen}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
{RajausToShow.map(person => <Numero key={person.name} name={person.name} number={person.number}/> )}
    </div>
  )

}

export default App