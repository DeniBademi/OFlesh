import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Currency } from '../_models/Currency';
import { Product } from '../_models/Product';
import { ProductModel } from '../_models/ProductModel';
import { ProductType } from '../_models/ProductType';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: BehaviorSubject<{ product: any, quantity: number }[]> = new BehaviorSubject<{ product: any, quantity: number }[]>([]);
  cartItemsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

constructor(private modal: ModalService) {
  let temp = [];
  // temp.push({product: new Product("4c4d9f4f-c0ed-495d-b671-529557a1ae35", "Top Roller", 350, "BGN", "", JSON.parse('{"thumbnail":"001_main_gwqm02.jpg",' +
  // '"gallery":["001_1_yl9bpm.png","001_2_cxbbdb.png","001_3_bspmo4.png","001_4_i2lafj.png"]}'),
  // new ProductModel("e752ef04-304f-49f2-b1ff-166309ea34fd","250mm 5,4 mm"),
  // new ProductType("dbd88a2b-8408-4a00-8af2-f8cda4584d14", "Spare part"),
  // new Currency(2, "US Dollar", "USD", "Prefix")
  // ), quantity: 1});

  // temp.push({product: new Product("26d61449-b1b2-4c55-b4cc-ebd260a47a77", "Bottom Roller", 350, "BGN", "", JSON.parse('{"thumbnail":"001_main_gwqm02.jpg",' +
  // '"gallery":["001_1_yl9bpm.png","001_2_cxbbdb.png","001_3_bspmo4.png","001_4_i2lafj.png"]}'),
  // new ProductModel("e752ef04-304f-49f2-b1ff-166309ea34fd","250mm 5,4 mm"),
  // new ProductType("dbd88a2b-8408-4a00-8af2-f8cda4584d14", "Spare part"),
  // new Currency(2, "US Dollar", "USD", "Prefix")
  // ), quantity: 1});

  this.cartItems.next(temp);
}

ngOnInit() {

}

  emptyCart(){
    this.cartItemsCount.next(0);
    this.cartItems.next([]);
  }

  addItem(product: Product, showPopup: boolean = true){
    this.cartItemsCount.next(this.cartItemsCount.getValue()+1);
    let prevCart = this.cartItems.getValue();
    for(let i=0;i<prevCart.length;i++){
      if(prevCart[i].product.id == product.id) {
        //increment quantity
        prevCart[i].quantity+=1;
        this.cartItems.next(prevCart);
        return;
      }
    }
    // add new key
    this.cartItems.next([...this.cartItems.getValue(), {
      product: product,
      quantity: 1
    }])

    if(showPopup) this.modal.open("modal-1");
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
  printCart(){
    //console.log(this.cartItems)
  }


  calculateTotal(){
    let total = 0;
    for(let i=0;i<this.cartItems.value.length;i++){
      total += this.cartItems.value[i].quantity * this.cartItems.value[i].product.price;
    }
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


