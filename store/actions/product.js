/* eslint-disable prettier/prettier */
export const GetALLProduct = 'GetALLProduct';
export const GetALLCategories = 'GetALLCategories';
export const getAboutUs = 'getAboutUs';
export const Getcourasel = 'Getcourasel';
import * as api from '../../api/APIs';

  export function GetProduct(product) {
  //  alert('action productsssssssssss' +JSON.stringify(product))
    return {type: GetALLProduct, payload: product};
  };
  export function GetAboutUs(data) {
    //  alert('action productsssssssssss' +JSON.stringify(product))
      return {type: getAboutUs, payload: data};
    };
  export function GetCategories(data) {
    //  alert('action productsssssssssss' +JSON.stringify(product))
      return {type: GetALLCategories, payload: data};
    };
    export function GetCourasel(data) {
      //  alert('action productsssssssssss' +JSON.stringify(product))
        return {type: Getcourasel, payload: data};
      };
