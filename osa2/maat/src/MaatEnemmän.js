
import Kielet from './Kielet'
import { useState, useEffect} from 'react'
import axios from 'axios'
import Kuva from './Kuva'

const MaatEnemmän = (props) => {
    const [Saa, SetWeather] = useState('')


    const [Nayta, SetNayta] = useState(0)
    

      useEffect(() => {
        axios
          .get('https://api.openweathermap.org/data/2.5/weather?lat=' + props.latlng[0]+ '&lon=' + props.latlng[1] + '&appid=(Tähän copypastesin tokenin)')
          .then(response => {
            SetWeather(response.data)
           
          })
      }, [])
      
      
const url = ''

  
      const [maat, setMaat] = useState([
      ])



    const Button = (props) => {

        return (<button onClick = {props.handleClick}> {props.text}</button>)
      
      }

const handleKlikki = () => {
    SetShow(1)
 

}

const [Show,SetShow] = useState(0)

const kielet =  props.kielet

console.log('cessi')


if(Show == 0)
    return(
        <div>
        {props.nimi}   <Button handleClick = {handleKlikki} text = "näytä" />
                </div>

    )
else return(
    <div>
<div>
<h1>{props.nimi}</h1>
</div>
<div>
<h3>pääkaupunki {props.pääkaupunki}</h3>
</div>
<div>
<p> area {props.koodi}</p>
</div>
<h3> kielet</h3>
<div>
{Object.values(kielet).map(lang => <Kielet kieli ={lang} key = {lang} />)}
</div>
<div>
{props.lippu}
</div>
<div> <h3>Sää</h3>
<div> {Saa.weather[0].description}</div>

<p> Lämpötila {(Saa.main.temp)-273.15} Celcius</p>
</div>
<div>
<p> Tuulen nopeus {Saa.wind.speed} m/s</p>
</div>
<Kuva linkki = {Saa.weather[0].icon} />

</div>
)
}   

export default  MaatEnemmän