/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
    userData:'',
    error: '',
    address:'',
  };
  
  export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
      case 'Login':    
      //console.error('my new data : ' +  JSON.stringify(action.payload))
     return {...state, ...action.payload};
     case 'Edituser' :
     return {...state, ...action.payload};
     case 'register':
      return {...state, ...action.payload};
     case 'signUp':  
    return {...state, userData:'',
    address:'',
    error: '',
     success:false};    
      default:
        return state;
    }
  }
  