const App = () => {

  const Header = (props) => {
    return (
      <div> 
    <p> {props.nimi} </p>

    </div> 
    )
  }
  const Content = (props) => {
    return (
      <div> 
    <p> {props.tehtävä} {props.määrä}   </p>
    <p> {props.tehtävä2} {props.määrä2}   </p>
    <p> {props.tehtävä3} {props.määrä3}   </p>


    </div> 
    )
  }

  const Total = (props) => {
    return (
      <div> 
    <p> Number of exercises { props.luku + props.luku2 + props.luku3}   </p>

   


    </div> 
    )
  }

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
    <Header nimi = {course} />
    <Content tehtävä = {part1} määrä = {exercises1}
    tehtävä2 = {part2} määrä2 = {exercises2}
    tehtävä3 = {part2} määrä3 = {exercises2}      />
<Total luku = {exercises1} luku2 = {exercises2} luku3 = {exercises2}  />



</div>
  
  )
}

export default App