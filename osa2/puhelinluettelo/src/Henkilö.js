const HenkilöPlus = (props) => {
    return(
        <form onSubmit={props.uusi}>
        <div>
          name: <input value = {props.nimitys} onChange = {props.tutkiminen} />
        </div>
        <div>
          number: <input value = {props.numeroitus} onChange = {props.numeronTutkiminen}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>     
    )
}
export default HenkilöPlus