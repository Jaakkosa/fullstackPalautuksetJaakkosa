import { useState } from 'react'

var painallukset = 0
var pisteet = 0

const Button = (props) => {

  return (<button onClick = {props.handleClick}> {props.text}</button>)

}


const Statistics = (props) => {
  var keskiarvo = (props.good - props.bad)/(props.good + props.bad + props.neutral)
  var positive =  props.good/(props.good + props.bad + props.neutral)*100.0

    if(props.good == 0 && props.bad == 0  && props.neutral == 0) {
      return(
      <div>
        <h3> No feedback</h3>
      </div>)
    }
    else {
      return (
        <div>
          <h3> Keskiarvo : {keskiarvo}</h3>
          <h3> Positiiviset : {positive}%</h3>
        </div>
      )
    }
   }


  





const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
const painalluksetplus = () => painallukset += 1
const handleClickGood = () => (
setGood(good +1 )

)

  return (
    <div className='tausta'>
      <h1> Arvostele Unicafe </h1>
<Button handleClick = {handleClickGood} text = "Hyvä"/>
<Button handleClick = {() => setNeutral(neutral + 1)} text = "Neutraali"/>
<Button handleClick = {() => setBad(bad + 1)} text = "Huono"/>
<h2> Statistiikka </h2>
<div>
<h3> Hyvä: {good} </h3>

</div>

<div>
<h3> Neutraali: {neutral} </h3>

</div>

<div>
<h3> Huono: {bad} </h3>

</div>

<Statistics good = {good} bad = {bad} neutral = {neutral} />





  
    </div>
  )
}

export default App
