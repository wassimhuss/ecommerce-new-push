/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
  AllProducts: '',
  isRecommended: '',
  error: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GetALLProduct':    
   return {...state, ...action.payload};
    default:
      return state;
  }
}
