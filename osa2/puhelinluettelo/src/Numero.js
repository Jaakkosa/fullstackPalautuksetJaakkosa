import NoteMetodit from './numerot'


const Numero = (props) => {

  
  
    return (
      <li>{props.name} {props.number} <button  onClick = {props.Klikki}>delete </button></li>
    )
  }
  
  export default Numero