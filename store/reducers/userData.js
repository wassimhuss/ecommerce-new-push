/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    // userData:'',
    // error: '',
    userAdress:''
  };
  
  export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
      case 'getAddress':    
      //console.error('my new data : ' +  JSON.stringify(action.payload))
     return {...state, ...action.payload};
     case 'signUp':    
    return {...state, 
    address:'',
    error: '',};    
      default:
        return state;
    }
  }
  