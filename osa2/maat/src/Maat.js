import { useState, useEffect } from 'react'
import axios from 'axios'
import Kielet from './Kielet'


const Maat = (props) => {

const kielet = props.kielet

console.log(kielet)

    return(
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
