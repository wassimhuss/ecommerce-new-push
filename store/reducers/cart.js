/* eslint-disable prettier/prettier */
import {ADD_TO_CART, REMOVE_FROM_CART,Clearcart} from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.DISCOUNT_PRICE;
      const Tprice = addedProduct.Tprice;
      const prodTitle = addedProduct.NAME;
      const IMAGE = addedProduct.My_Uploaded_files[0]? addedProduct.My_Uploaded_files[0].My_URL :'https://previews.123rf.com/images/kaymosk/kaymosk1804/kaymosk180400006/100130939-error-404-page-not-found-error-with-glitch-effect-on-screen-vector-illustration-for-your-design-.jpg'
      const prodquantity = addedProduct.quantity;
      const DESCRIPTION = addedProduct.DESCRIPTION;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.PRODUCT_ID]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.PRODUCT_ID].quantity +prodquantity,
          prodPrice,
          prodTitle,
          state.items[addedProduct.PRODUCT_ID].sum + Tprice,
          IMAGE,
          DESCRIPTION
        )
        return {
          ...state,
          items: {...state.items, [addedProduct.PRODUCT_ID]: updatedOrNewCartItem},
          totalAmount:state.totalAmount + Tprice,
        }
      } else {
        updatedOrNewCartItem = new CartItem(prodquantity, prodPrice, prodTitle, Tprice,IMAGE,DESCRIPTION)
        return {
          ...state,
          items: {...state.items, [addedProduct.PRODUCT_ID]: updatedOrNewCartItem},
          totalAmount:state.totalAmount + Tprice,
        };
      }
      // return {
      //   ...state,
      //   items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
      //   totalAmount:Tprice,
      // };
      case Clearcart : 
      return {
        ...state,
      items: {},
        totalAmount: 0,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice,
          selectedCartItem.IMAGE,
          DESCRIPTION
        );
        updatedCartItems = {...state.items, [action.pid]: updatedCartItem};
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
  }

  return state;
};
