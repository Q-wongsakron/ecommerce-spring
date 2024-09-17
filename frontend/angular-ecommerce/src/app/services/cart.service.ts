import { Injectable } from '@angular/core';
import { CartItem } from './../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  // use for publish evenets Subject will sent to all subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      
      // for (let tempCartItem of this.cartItems)
      //   if (tempCartItem.id === theCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }

      // refactor use Array.find(...)
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id)

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart && existingCartItem) {
      // increment the quantity
      existingCartItem.quantity++;

    }
    else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValues: number = 0;
    let totalQuantityValues: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValues += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValues += currentCartItem.quantity;
    }

    // publish the new values ... all subscribers will receive the new data
    // next() publish/send event
    this.totalPrice.next(totalPriceValues);
    this.totalQuantity.next(totalQuantityValues)

    // log for debuging
    this.logCartData(totalPriceValues, totalQuantityValues);
  }
  logCartData(totalPriceValues: number, totalQuantityValues: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValues.toFixed(2)}, totalQuantityValues: ${totalQuantityValues}`);
    console.log("-----")
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id)

    // if found remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1)
      
      this.computeCartTotals();
    }
  }
}
