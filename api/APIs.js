
import {Proxy} from './fetch';
import * as P from './fetch';
import { Item } from 'native-base';
import { Alert } from 'react-native';

let myProxy = new Proxy();

export async function Get_Product_By_By_Where(id) {
  let oParams_Get_Product_By_OWNER_ID = new P.Params_Get_Product_By_OWNER_ID();
  oParams_Get_Product_By_OWNER_ID.OWNER_ID = id;
  let result = await myProxy.Get_Product_By_Where(
    oParams_Get_Product_By_OWNER_ID
    )
     if (result?.My_Result) {
       let AllProducts =[];
       let isRecommended =[];
      result.My_Result.forEach(item => { 
        item.STOCK > 0 ? 
        item?.IS_RECOMMENDED == true ? isRecommended.push(item) : null
        : null 
                
      });
      result.My_Result.forEach(item => { 
        item.STOCK > 0 ? 
        AllProducts.push(item)
        : null  
                
      });
            return {AllProducts : AllProducts, error: result.ExceptionMsg, isRecommended: isRecommended }
      }
} 
export async function Get_About_us_By_OWNER_ID(id) {
  let OParams_Get_Product_By_OWNER_ID = new P.Params_Get_Product_By_OWNER_ID();
  OParams_Get_Product_By_OWNER_ID.OWNER_ID = id;
  let result = await myProxy.Get_About_us_By_OWNER_ID(
    OParams_Get_Product_By_OWNER_ID
    )
     if (result?.My_Result) {
            return {AboutUs : result?.My_Result[0].DESCRIPTION, error:0}
      } 
      else{
        return{AboutUs:"" , error : 1 }
      }
} 
export async function Get_Category_By_Where(name) {
  let oParams_Get_Category_By_Where = new P.Params_Get_Category_By_Where();
  oParams_Get_Category_By_Where.NAME = name;
  let result = await myProxy.Get_Category_By_Where(
    oParams_Get_Category_By_Where
    )
     if (result?.My_Result) {
            return {courasel : result?.My_Result[0].My_Uploaded_files, error:0}
      } 
      else{
        return{courasel:[] , error : 1 }
      }
}
export async function Get_Product_By_Search(NAME) {
  // console.error(id)
  // console.error( 'ana honmnnnn' + result.My_Result)
  let oParams_Get_Product_By_Where = new P.Params_Get_Product_By_Where();
  oParams_Get_Product_By_Where.NAME = NAME;
  //alert(joParams_Get_Product_By_Where)
  let result = await myProxy.Get_Product_By_Where(
    oParams_Get_Product_By_Where
    )
   
     //console.error( 'my result' +JSON.stringify(result))
     if (result?.My_Result) {
      //alert(JSON.stringify(result))
     // alert('done')
      //  let isRecommended =[];
      // //  console.warn( 'my results  ::::: ' + JSON.stringify(result.My_Result));
      // result.My_Result.forEach(item => {
      //   item?.IS_RECOMMENDED == true ? isRecommended.push(item) : null;
      // });
             return {products: result.My_Result}
      }else{
        alert('please check your internet connection')
      }
} 
export async function  Get_Adress_By_USER_ID(id) {
  let oParams_Get_Adress_By_USER_ID = new P.Params_Get_Adress_By_USER_ID();
  oParams_Get_Adress_By_USER_ID.USER_ID = id;
  let result = await myProxy.Get_Adress_By_USER_ID(oParams_Get_Adress_By_USER_ID)
     if (result?.My_Result) {
            return {userAdress : result.My_Result, error: result.ExceptionMsg}
      }
      else{
       alert('please try again')
      }
}
export async function  Edit_Adress(data) {
  //console.warn(JSON.stringify(data));
  let result = await myProxy.Edit_Adress(data);
     if (result?.My_Adress) {
       //alert('done')
       return {error: false }
      }
      else{
        return {error: true }
       // alert("please try again")
      }
}
export async function  CHECKNET(id) {
 // console.warn(JSON.stringify(data));
 let oParams_Get_Product_By_OWNER_ID = new P.Params_Get_Product_By_OWNER_ID();
 oParams_Get_Product_By_OWNER_ID.OWNER_ID = id;
 let result = await myProxy.Get_Product_By_Where(
   oParams_Get_Product_By_OWNER_ID
   )
     if (result?.My_Result) {
       //alert('done')
       return {error: false }
      }
      else{
        return {error: true }
       // alert("please try again")
      }
}
export async function  Feetoura(data) {
  //console.warn("data :  " +JSON.stringify(data))
  let result = await myProxy.Feetoura(data);
// console.warn( "result : " +JSON.stringify(result));
     if (result?.My_Result) {
      return {error: false }
      }
      else{
        return {error: true }
      }
}
export async function  Edit_User(data) {
  let result = await myProxy.Edit_User(
    data
    )
     if (result?.My_User) {
      alert('user info Updated !')
      //  let isRecommended =[];
      // //  console.warn( 'my results  ::::: ' + JSON.stringify(result.My_Result));
      // result.My_Result.forEach(item => {
      //   item?.IS_RECOMMENDED == true ? isRecommended.push(item) : null;
      // });
      return {userData : result.My_User, error:'',success:true,}
      }
      else{
        alert(JSON.stringify(result.ExceptionMsg))
        return {userData :'', error:result.ExceptionMsg , success:true,}
      }
}
export async function  Add_User(data) {
  let result = await myProxy.Edit_User(
    data
    )
     if (result?.My_User) {
      alert('welcome !')
      //  let isRecommended =[];
      // //  console.warn( 'my results  ::::: ' + JSON.stringify(result.My_Result));
      // result.My_Result.forEach(item => {
      //   item?.IS_RECOMMENDED == true ? isRecommended.push(item) : null;
      // });
      return {userData : result.My_User, error:'',success:true}
      }
      else{
        alert(JSON.stringify(result.ExceptionMsg))
        return {userData :'', error:result.ExceptionMsg , success:false}
      }
}
export async function Get_Authenticate(id , email , password) {
  //  console.error(id)
  //  console.error(email)
  //  console.error(password)
  // console.error( 'ana honmnnnn' + result.My_Result)
  let oParams_Authenticate = new P.Params_Authenticate();
  oParams_Authenticate.OWNER_ID = id;
  oParams_Authenticate.EMAIL = email;
  oParams_Authenticate.PASSWORD = password;
  //console.error(oParams_Get_Product_By_OWNER_ID)
  let result = await myProxy.Authenticate(
    oParams_Authenticate
    )
  //console.log(result)
    //console.log(result.ExceptionMsg) 
     //console.error( 'my result' +JSON.stringify(result))
     if (result?.My_Result != null) {
      //console.error(result.My_Result.myAdress)
      alert('login successful')
     //  let isRecommended =[]; 
      //  console.warn( 'my results  ::::: ' + JSON.stringify(result.My_Result));
      // result.My_Result.forEach(item => {
      //   item?.IS_RECOMMENDED == true ? isRecommended.push(item) : null;
      // });
        return {userData : result.My_Result, error:'',success:true,  address : result.My_Result.myAdress}
      } 
      else{
        alert(result.ExceptionMsg)
       return {userData : '', error: result.ExceptionMsg,success:false}
      }
}

      
  // console.log('my result  :  ' + result);
  // return result;
  
   
 
  // .then((data) => {
  //   console.warn(
  //     "my daaaaaaaaaaaaaaaaaaataaaaaaaaaaaaaaaaaaaaa is"+
  //     data); 
  //   // this.setState(data);
  // }).catch((error)=>{
  //    console.warn(
  //     "my daaaaaaaaaaaaaaaaaaataaaaaaaaaaaaaaaaaaaaa is"+ 
  //     error);
  //   //  alert(error.message);
  // });
  // //   let newres = result.My_Result;
  // console.log(   "my daaaaaaaaaaaaaaaaaaataaaaaaaaaaaaaaaaaaaaa is"+result)
 
  //let newRes = [];
  // console.log('all answers by owner id' + JSON.stringify(result));

  //   if (result?.My_Result) {
  //     // console.log(result.My_Result);
  //     result.My_Result.map(x =>
  //       newRes.push({
  //         QUESTION_ID: x.QUESTION_ID,
  //         answer: x.DESCRIPTION,
  //         TEACHER_ID: x.TEACHER_ID,
  //         question: x.My_Question.DESCRIPTION,
  //         STUDENT_ID: x.My_Question.STUDENT_ID,
  //         CATEGORY_ID: x.My_Question.CATEGORY_ID,
  //         ANSWER_ID: x.ANSWER_ID,
  //       }),
  //     );
  //   }


// export async function Get_Answer_Details(QUESTION_ID) {

//     let oParams_Get_Answer_Details = new P.Params_Get_Answer_Details();
//     oParams_Get_Answer_Details.QUESTION_ID = QUESTION_ID;
//     let result = await myProxy.Get_Answer_Details(oParams_Get_Answer_Details);

//     if (result?.My_Result) {
//         // console.log(result.My_Result);

//         return result.My_Result;
//     }
// };
// export async function Get_Category_By_OWNER_ID(OWNER_ID) {

//     let oParams_Get_Category_By_OWNER_ID = new P.Params_Get_Category_By_OWNER_ID();
//     oParams_Get_Category_By_OWNER_ID.OWNER_ID = OWNER_ID;
//     let result = await myProxy.Get_Category_By_OWNER_ID(oParams_Get_Category_By_OWNER_ID);

//     if (result?.My_Result) {
//         console.log(result.My_Result);

//         return result.My_Result;
//     }
//     return result;
// };
// export async function Get_Question_By_OWNER_ID(OWNER_ID) {

//     let oParams_Get_Question_By_OWNER_ID = new P.Params_Get_Question_By_OWNER_ID();
//     oParams_Get_Question_By_OWNER_ID.OWNER_ID = OWNER_ID;
//     let result = await myProxy.Get_Question_By_OWNER_ID(oParams_Get_Question_By_OWNER_ID);

//     if (result?.My_Result) {
//         console.log(result.My_Result);

//         return result.My_Result;
//     }
//     return result;
// };
