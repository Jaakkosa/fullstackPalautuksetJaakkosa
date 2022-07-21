import { useState } from 'react'

var painallukset = 0
var pisteet = 0

const Button = (props) => {

  return (<button onClick = {props.handleClick}> {props.text}</button>)

}

const StatisticLine = (props) => {
 return(
<tr><td>{props.text}{props.value}</td></tr>
 )
}

const Statistics = (props) => {
  var keskiarvo = (props.good - props.bad)/(props.good + props.bad + props.neutral)
  var positive =  props.good/(props.good + props.bad + props.neutral)*100.0
  var positiveteksti = "positiiviset"
  var keskiarvoteksti = "keskiarvo "
  var nofeedback = "nofeedback"


    if(props.good === 0 && props.bad === 0  && props.neutral === 0) {
      return(
      <tr><th>{nofeedback}</th></tr>
      )
    }

  else return (
  <>
<tr><td>{keskiarvoteksti}{keskiarvo.toPrecision(3)}</td></tr>
<tr><td>positiiviset {positive.toPrecision(3)}</td></tr>
</>
      )
  
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
    <div>
      <h1> Arvostele Unicafe </h1>
<Button handleClick = {handleClickGood} text = "Hyvä"/> 
<Button handleClick = {() => setNeutral(neutral + 1)} text = "Neutraali"/>
<Button handleClick = {() => setBad(bad + 1)} text = "Huono"/>
<h2> Statistiikka </h2>
<table> 
  <tbody>
<StatisticLine text = "hyvä " value = {good}/>
<StatisticLine text = "neutraali " value = {neutral}/>
<StatisticLine text = "huono " value = {bad}/>
<Statistics good = {good} bad = {bad} neutral = {neutral}/>
</tbody>
</table>
  
    </div>
  )
}

export default App
