import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Currency } from '../_models/Currency';
import { Product } from '../_models/Product';
import { ProductModel } from '../_models/ProductModel';
import { ProductType } from '../_models/ProductType';
import { ModalService } from './modal.service';
import { toggleCart } from '../../assets/js/sidecart.js';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: BehaviorSubject<{ product: any, quantity: number }[]> = new BehaviorSubject<{ product: any, quantity: number }[]>([]);
  cartItemsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  couponCode: string;
  couponCodeChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
  couponData: any;


constructor(private modal: ModalService, private globals: GlobalsService) {

}

ngOnInit() {


}

  emptyCart(){
    this.cartItemsCount.next(0);
    this.cartItems.next([]);
  }

  addItem(product: Product, showPopup: boolean = false, showCart: boolean = false){
    this.cartItemsCount.next(this.cartItemsCount.getValue()+1);
    let prevCart = this.cartItems.getValue();
    for(let i=0;i<prevCart.length;i++){
      if(prevCart[i].product.id == product.id) {
        prevCart[i].quantity+=1;
        this.cartItems.next(prevCart);
        if(showCart) toggleCart();
        return;
      }
    }
    // add new key
    this.cartItems.next([...this.cartItems.getValue(), {
      product: product,
      quantity: 1
    }])

    if(showPopup) this.modal.open("modal-1");
    if(showCart) toggleCart();
    //console.log(showCart)
  }
  removeItem(product: Product){
    this.cartItemsCount.next(this.cartItemsCount.getValue()-1);
    let tempCart = this.cartItems.getValue();
    let index = -1;
    for(let i=0;i<tempCart.length;i++){
      if(tempCart[i].product.id == product.id) {
        index = i;
        break;
      }
    }

    if (index > -1) {
      if(tempCart[index].quantity==1)
        tempCart.splice(index, 1);
      else
        tempCart[index].quantity-=1;

    }
    this.cartItems.next(tempCart)
  }

  deleteItem(product: Product) {

    let tempCart = this.cartItems.getValue();
    let index = -1;
    for(let i=0;i<tempCart.length;i++){
      if(tempCart[i].product.id == product.id) {
        index = i;
        break;
      }
    }
    this.cartItemsCount.next(this.cartItemsCount.getValue()-tempCart[index].quantity);
    if (index > -1) {
      tempCart.splice(index, 1);
    }


  }

  productInCart(product: Product) {
    let cartContent = this.cartItems.getValue();
    for (var i = 0; i < cartContent.length; i++) {
        if (cartContent[i].product.id === product.id) {
            return true;
        }
    }

  return false;
}




  calculateTotal(withDiscount: boolean = false, withProcessingFee: boolean = false){
    let total = 0;
    for(let i=0;i<this.cartItems.value.length;i++){
      total += this.cartItems.value[i].quantity * this.cartItems.value[i].product.price;
    }
    if(withDiscount && this.couponData) {
      if(this.couponData.isPercentage)
        total = total * (100 - this.couponData.discount)/100;
      else
        total = total - this.couponData.discount;
    }

    if(withProcessingFee) total += this.globals.processing_fee;

    return total;
   }

   calculateTotalJSON(items: any){
    let total = 0;
    for(let i=0;i<items.length;i++){
      total += items[i].quantity * items[i].product.price;
    }

    return total
   }



}


