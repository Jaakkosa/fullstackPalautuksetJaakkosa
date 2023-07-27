import { createContext, useReducer, useContext } from 'react'

const NotifikaatioKonteksti = createContext()


const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
        return action.notifikaatio
    case "HIDE":
        return null
    default:
        return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notifikaatio, dispatch] = useReducer(notificationReducer, null)

  const showNotification = (viesti) => {
    dispatch({ type: "SHOW", notifikaatio: viesti })

    setTimeout(() => {
      dispatch({ type: "HIDE" })
    }, 5000)
  }

  return (
    <NotifikaatioKonteksti.Provider value={{ notifikaatio, showNotification }}>
      {children}
    </NotifikaatioKonteksti.Provider>
  )
}



export const useNotification = () => useContext(NotifikaatioKonteksti)


const Notification = () => {

 const { notifikaatio } = useNotification()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notifikaatio === null) {
    return null
  }

  

 return (
    <div style={style}>
      {notifikaatio}
    </div>
  )
}

export default Notification
