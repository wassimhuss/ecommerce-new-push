/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    courasel: '',
    error: '',
  };
  
  export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'Getcourasel':    
     return {...state, ...action.payload};
      default:
        return state;
    }
  }
  