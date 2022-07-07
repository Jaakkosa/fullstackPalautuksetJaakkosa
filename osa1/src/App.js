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
   <Part tehtävä = {part1} määrä= {exercises1}/> 
   <Part tehtävä = {part2} määrä= {exercises2}/>
   <Part tehtävä = {part3} määrä= {exercises3}/>
   


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

    const Part = (props) => {
      return (
        <div> 
      <p> {props.tehtävä} {props.määrä}</p>
  
     
  
  
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
    <Content/>
<Total luku = {exercises1} luku2 = {exercises2} luku3 = {exercises2}  />



</div>
  
  )
}

export default App