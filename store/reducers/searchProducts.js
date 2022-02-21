/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    products: ""
  };
  
  export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'Search':    
     return {...state, ...action.payload};
      default:
        return state;
    }
  }
  