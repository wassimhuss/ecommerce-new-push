class CartItem {
  constructor(quantity, productPrice, productTitle, sum,IMAGE,DESCRIPTION) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
    this.IMAGE=IMAGE;
    this.DESCRIPTION = DESCRIPTION;
  }
}

export default CartItem;
