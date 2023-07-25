const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return String(action.payload)
      default:
        return state
    }
  }

  export default filterReducer

  export const setFilter = (filter) => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    };
  };