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

  const Course = (props) => {
    return(
      <div>
<Header nimi = {props.course.name} />
<Content parts = {props.course.parts} />
<Total parts = {props.course.parts}/>


      </div>
    )
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
<ul> 
  {props.parts.map(part => <Part partti = {part} key = {part.name} />)}
</ul>

    </div> 
    
   )
  }
  const Part = (props) => {
    return (
      <div> 
    <li> {props.partti.name} {props.partti.exercises}</li>
      
   


    </div> 
    )
    }
//     props.parts.map(part => summa += part.exercises)
  const Total = (props) => {
    const total = props.parts.map(part => part.exercises).reduce( (s, p) => (
      s + p
    ))


    return (
      <div> 
    <p> Number of exercises {total}  </p>

   


    </div> 
    )
    } 

      return (
        <div>
          <Course course={course} />
        </div>
      )
}

export default App