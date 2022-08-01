import { useState, useEffect } from 'react'
import axios from 'axios'
import Kielet from './Kielet'
import Kuva from './Kuva'


const Maat = (props) => {

    const [Saa, SetWeather] = useState('')
    const [Nayta, SetNayta] = useState(0)
 

      useEffect(() => {
        axios
          .get('https://api.openweathermap.org/data/2.5/weather?lat=' + props.latlng[0]+ '&lon=' + props.latlng[1] + '&appid=0892f04cb7497fb995cf9996284a8a8d')
          .then(response => {
            SetWeather(response.data)
            SetNayta(1)
          })
      }, [])
    


const kielet = props.kielet

console.log(kielet)
if(Nayta == 1) return(
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
  else  return(
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


</div>
 

)
}

export default Maat
