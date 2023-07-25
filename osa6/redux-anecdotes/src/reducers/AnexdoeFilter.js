import { useSelector } from "react-redux";
import filterReducer from "./FilterReducer";
import { useDispatch } from 'react-redux';
import { setFilter } from './FilterReducer'; // Import the action creator

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
  
    const handleChange = (event) => {
      dispatch(setFilter(event.target.value)); // Dispatch the action with the new filter value
    };
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter