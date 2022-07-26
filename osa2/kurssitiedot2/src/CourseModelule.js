const Kurssi = () => {
const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    } 
  ]

  const Course = (props) => {
    return(
      courses.map(course => 
      <div key = {course.id}>
<Header nimi = {course.name} />
<Content parts = {course.parts} />
<Total parts = {course.parts}/>
      </div>
    )
    )
  }


  const Header = (props) => {
    return (
      <div> 
    <h3> {props.nimi} </h3>
    </div> 
    )
  }
  const Content = (props) => {
   return(
   
      <div> 
<ul> 
  {props.parts.map(part => <Part partti = {part} key = {part.id} />)}
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
          <Course course={courses} />
        </div>
      )

}
export default Kurssi