import { useState, useEffect } from 'react'
import Numero from "./Numero"
import Filter from "./Filter"
import HenkilöPlus from "./Henkilö"
import NoteMetodit from './numerot'
import Notification from './Ilmoitus'
import './index.css'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'

const App = () => {

  useEffect(() => {
    NoteMetodit
    .HaeKaikki()
    .then(initialNotes => {
      setPersons(initialNotes)
    })
  }, [])
  const [persons, setPersons] = useState([
  ])
  console.log("haettu") 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newRajaus, setNewRajaus] = useState('')
  const [näytetäänkö, setNäytetäänkö] = useState(true)
  const [Alertti,SetAlertti] = useState('')


  console.log("10") 

  const addNew = (event) => {
    event.preventDefault() 
const Nimi = {
  name: newName,  
  number: newNumber,
  id: ""
} 

console.log("22") 

const löytyykö = (henkilö) => henkilö.name === Nimi.name
if(persons.some(löytyykö)){
if(window.confirm("Tällainen nimi löytyy, päivitetäänkö numero?")){
  console.log("confirmed")
  console.log(persons)
  const Id = persons.find(henkilö => henkilö.name == Nimi.name)
  Nimi.id = Id.id
  NoteMetodit
  .Paivita(Id.id,Nimi)
  .then(palautus => {
    setPersons(persons.map(note => note.id !== palautus.id ? note : palautus))
  })
  SetAlertti('Muutettu ' + newName)
  setTimeout(() => {
   SetAlertti('')
  },5000)
}
}
else{
NoteMetodit
.Luo(Nimi)
.then(palautus => {
setPersons(persons.concat(palautus))
})
 SetAlertti('Added ' + newName)
 setTimeout(() => {
  SetAlertti('')
 },5000)
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
      <Notification message = {Alertti}/>
      <Filter rajaus = {newRajaus} muutos = {rajauksenTutkiminen} />
      <HenkilöPlus nimitys = {newName} tutkiminen = {sisällönTutkiminen} numeroitus = {newNumber} numeronTutkiminen = {numeronTutkiminen} uusi = {addNew} /> 
      <h2>Numbers</h2>
{RajausToShow.map(person => <Numero key={person.name} name={person.name} number={person.number} persons = {persons} SetPreson = {setPersons} id = {person.id}
Klikki ={ () => {if(window.confirm("Poistetaanko")){{NoteMetodit.Poista(person.id).then(palautus => NoteMetodit
    .HaeKaikki()
    .then(initialNotes => {
      setPersons(initialNotes)
      console.log(3)
      SetAlertti('Deleted ' + person.name)
      setTimeout(() => {
       SetAlertti('')
      },5000)
    }))
  .catch( 
    SetAlertti('Failed to Delete ' + person.name),
    setTimeout(() => {
     SetAlertti('')
    },5000)


  )}
    }}}/> )}
    </div>
  )

}

export default App