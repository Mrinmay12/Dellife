const initialState = {
    data: {}
  };
  
  const JobReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_JOB_DATA':
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default JobReducer;