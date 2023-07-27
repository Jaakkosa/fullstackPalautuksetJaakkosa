import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';



const notification = createSlice ({
name:'notification',
initialState:'',
reducers: {
    notifikaatio(state,action){
        return action.payload
    },
    clearNotification(){
return ''
    }
}


})

export const { notifikaatio, clearNotification } = notification.actions;
export const setNotification = (text,time) => {
    return async (dispatch) => {

dispatch(notifikaatio(text))
setTimeout(() => {
    dispatch(clearNotification())
 }, time*1000);
    }
}
export default notification.reducer;