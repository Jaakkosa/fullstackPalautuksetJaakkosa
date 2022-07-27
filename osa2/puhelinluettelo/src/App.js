import { useState } from 'react'
import Numero from "./Numero"

const App = () => {
  const [persons, setPersons] = useState([
    { name:'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  const addNew = (event) => {
event.preventDefault()
const Nimi = {
  name: newName
}
const löytyykö = (henkilö) => henkilö.name === Nimi.name
if(persons.some(löytyykö)){
  alert(`${Nimi.name} allready added`)
}
else{
setPersons(persons.concat(Nimi))
setNewName('')
}
  }
const sisällönTutkiminen = (event) => {
setNewName(event.target.value)
}


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNew}>
        <div>
          name: <input value = {newName} onChange = {sisällönTutkiminen} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
{persons.map(person => <Numero key={person.name} name={person.name}/> )}
    </div>
  )

}

export default App