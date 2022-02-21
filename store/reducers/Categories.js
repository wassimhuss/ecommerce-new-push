/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    AllCategories: '',
    error: '',
  };
  
  export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GetALLCategories':    
     return {...state, ...action.payload};
      default:
        return state;
    }
  }
  