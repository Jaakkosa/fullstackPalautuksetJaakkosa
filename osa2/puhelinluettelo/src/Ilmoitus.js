import './index.css'

const Notification = (props) => {
if (props.message == '') return(
  null

)
    return (
      <div className="notifikaatio">
        {props.message}
      </div>
    )
  }


export default Notification