/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import AuthReducer from './auth';
import ApplicationReducer from './application';
import cart from './cart';
import product from './product';
import Login from './Login';
import Categories from './Categories';
import userData from './userData';
import searchProducts from './searchProducts';
import Aboutus from './Aboutus';
import courasel from './courasel';

export default combineReducers({
  auth: AuthReducer,
  application: ApplicationReducer,
  cart: cart,
  Product: product,
  Login:Login,
  Categories:Categories,
  userData:userData,
  searchProducts:searchProducts,
  aboutus:Aboutus,
  courasel:courasel

});
