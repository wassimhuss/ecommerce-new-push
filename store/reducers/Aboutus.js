/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    AboutUs:"",
    error: "",
  };
  
  export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'getAboutUs':    
     return {...state, ...action.payload};
      default:
        return state;
    }
  }
  