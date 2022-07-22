import { useState } from 'react'

const Button = (props) => {

  return (<button onClick = {props.handleClick}> {props.text}</button>)

}



const App = () => {

  const points = [0,0,0,0,0,0,0 ]

  const handleVote = () => {
  let uusiLuku = pisteet[selected] + 1
  pisteet[selected] = uusiLuku
  setPisteet([...pisteet])
  console.log(pisteet)
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
 const [pisteet, setPisteet] = useState(points)
 const min = 0
 const max = 6
  return (
    <div>
      <div>
      {anecdotes[selected]}
      </div>
      <div>
      <Button handleClick = {() => setSelected(Math.floor(Math.random() * (max - min + 1)) + min)} text = "seuraava"/>
      <Button handleClick = {handleVote} text = "vote" />
      </div>  
      <div>
    <p>Has {pisteet[selected]} votes</p>  
      </div>
<div>
<h1> Eniten ääniä saannut</h1>
<p> {anecdotes[pisteet.indexOf(Math.max(...pisteet))]}</p>
</div>
    
  
    </div>
  )
}

export default App
