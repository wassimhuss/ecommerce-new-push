/* eslint-disable prettier/prettier */
export const Login = 'Login';
export const signUp = 'signUp';
export const getAddress = 'getAddress';
export const Edituser = 'Edituser';
export const register = 'register';
export const Search = 'Search';
import * as api from '../../api/APIs';

  export function LoginUser(data) {
    //console.error('my data' +JSON.stringify(data))
    return {type: Login, payload: data};
  };
  export function SignUp() {
    //console.error('my data' +JSON.stringify(data))
    return {type: signUp, payload: 'SignUp'};
  };
  export function getAdress(data) {
    //console.error('my data' +JSON.stringify(data))
    return {type: getAddress, payload: data};
  };
 
  export function EditUser(data) {
   // console.error('my data' +JSON.stringify(data))
    return {type: Edituser, payload: data};
  };
  export function Register(data) {
     //console.error('my data' +JSON.stringify(data))
     return {type: register, payload: data};
   };
   export function search(data) {
    //console.error('my data' +JSON.stringify(data))
    return {type: Search, payload: data};
  };