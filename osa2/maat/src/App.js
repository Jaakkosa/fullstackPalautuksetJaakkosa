import Maat from "./Maat"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Hakija from './Finder'
import MaatEnemmän from './MaatEnemmän'




const App = () => {

  

  const [newHaku, setNewHaku] = useState('')
  const [näytetäänkö, setNäytetäänkö] = useState(true)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setMaat(response.data)
      })
  }, [])
  const [maat, setMaat] = useState([
  ])

console.log(maat)


const Haku = (event) => {
  setNewHaku(event.target.value)
  const kuuluuko = (maa) => maa.name.common.toLowerCase().includes(newHaku.toLowerCase())
  setNäytetäänkö(maat.some(kuuluuko))

}
const näytettävät = näytetäänkö
? maat.filter(note => (note.name.common.toLowerCase()).includes(newHaku.toLowerCase()))
: maat.filter(note => (note.name.common.toLowerCase()).includes(newHaku.toLowerCase()))



if (näytettävät.length >= 10){
  return (<div>
 <div>  <Hakija rajaus = {newHaku} muutos = {Haku} />   </div> 
  <h3> specify more </h3>
</div>)

}

else  if(näytettävät.length <= 10 && näytettävät.length > 1) return(
    <div>
<Hakija rajaus = {newHaku} muutos = {Haku} /> 
{näytettävät.map(maa => <MaatEnemmän nimi = {maa.name.common} key = {maa.name.common}  pääkaupunki = {maa.capital}
koodi = {maa.area} lippu = {maa.flag} kielet = {maa.languages} latlng = {maa.latlng}  />)}


</div>


)

else if(näytettävät.length = 1) return(
<div>
<Hakija rajaus = {newHaku} muutos = {Haku} /> 
{näytettävät.map(maa => <Maat nimi = {maa.name.common} key = {maa.name.common}  pääkaupunki = {maa.capital}
koodi = {maa.area} lippu = {maa.flag} kielet = {maa.languages} latlng = {maa.latlng}  />)}



</div>




)

else return(
  <Hakija rajaus = {newHaku} muutos = {Haku} /> 
)


}

export default App


