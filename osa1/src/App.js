const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  const Header = (props) => {
    return (
      <div> 
    <p> {props.nimi} </p>
    </div> 
    )
  }
  const Content = (props) => {
   return(
   
      <div> 

<Part parts = {props.parts} luku = {0}/> 
<Part parts = {props.parts} luku = {1}/>
<Part parts = {props.parts} luku = {2}/>

    </div> 
    
   )
  }

  const Total = (props) => {
   
    return (
      <div> 
    <p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises }

 </p>

   


    </div> 
    )
    }

   const Part = (props) => {
      return (
        <div> 
      <p> {props.parts[props.luku].name} {props.parts[props.luku].exercises}</p>
        
     
  
  
      </div> 
      )
      }





  return (
    <div>
    <Header nimi = {course.name} />
    <Content parts = {course.parts} />
  <Total parts = {course.parts}/>



</div>
  
  )
}

export default App