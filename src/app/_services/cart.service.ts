import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Currency } from '../_models/Currency';
import { Product } from '../_models/Product';
import { ProductModel } from '../_models/ProductModel';
import { ProductType } from '../_models/ProductType';
import { ModalService } from './modal.service';
import { toggleCart } from '../../assets/js/sidecart.js';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: BehaviorSubject<{ product: any, quantity: number }[]> = new BehaviorSubject<{ product: any, quantity: number }[]>([]);
  cartItemsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  couponCode: string;
  couponData: any;


constructor(private modal: ModalService) {
  let temp = [
    {product: new Product(
      "b52271b9-7ee0-49ea-8d2c-ce40c5f16f11",
      "Ofleshy Andjela Tasheva",
      1,
      null,
      "Колекцията на „Andjela Tasheva“ се състои от изключително качествени мъжки\n                    мастурбатори, създадени с възможността да ви приближи до любимата ви звезда.\n                    Излъчващ интимност, този продукт доставя несравнимо удоволствие и реализъм.\n                    Изработен от висококачествен TPE материал, който е безопасен за кожата, той предлага\n                    меко и реалистично изживяване. Тъй като се управлява ръчно, можете да контролирате\n                    темпото, силата и интензивността на удоволствието, като го настроите според\n                    предпочитанията си.\n                    <h3>Характеристики:</h3>\n                    <li> Име на модел: Ofleshy Andjela Tasheva </li>\n                    <li> Размери (сантиметри): 9x9x22 (LxWxH) <li>\n                    <li> Марка: Oflesh </li>\n                    <li> Материал: Термопластичен Еластомер (TPE) </li>\n                    <li> Цвят: Черен </li>\n                    <li> Нето тегло: 450г </li>\n                    <li> Наличен лубрикант: 30 ml. </i>",
      {'thumbnail':'Ofleshy%20Andjela%20Tasheva/1_tmjxi9.jpg','gallery':['Ofleshy%20Andjela%20Tasheva/6_emnzh0.jpg','Ofleshy%20Andjela%20Tasheva/7_bkoqdr.jpg','Ofleshy%20Andjela%20Tasheva/8_iy0e1t.jpg']},
      new ProductModel(
        "e752ef04-304f-49f2-b1ff-166309ea34fd",
        "5,4 mm"
      ),
      new ProductType(
        "d9e9e846-7a39-4aec-b065-88b9e22ff526",
        "Machine"
      ),
      null,
      "/Catalog/Andjela_Tasheva/Ofleshy"
    ),


    quantity: 1},
    {product: new Product(
      "b52271b9-7ee0-49ea-8d2c-ce40c5f16f12",
      "Autofleshy Andjela Tasheva",
      1,
      null,
      "Колекцията на „Andjela Tasheva“ се състои от изключително качествени мъжки\n                    мастурбатори, създадени с възможността да ви приближи до любимата ви звезда.\n                    Излъчващ интимност, този продукт доставя несравнимо удоволствие и реализъм.\n                    Изработен от висококачествен TPE материал, който е безопасен за кожата, той предлага\n                    меко и реалистично изживяване. Тъй като се управлява ръчно, можете да контролирате\n                    темпото, силата и интензивността на удоволствието, като го настроите според\n                    предпочитанията си.\n                    <h3>Характеристики:</h3>\n                    <li> Име на модел: Ofleshy Andjela Tasheva </li>\n                    <li> Размери (сантиметри): 9x9x22 (LxWxH) <li>\n                    <li> Марка: Oflesh </li>\n                    <li> Материал: Термопластичен Еластомер (TPE) </li>\n                    <li> Цвят: Черен </li>\n                    <li> Нето тегло: 450г </li>\n                    <li> Наличен лубрикант: 30 ml. </i>",
      {'thumbnail':'Ofleshy%20Andjela%20Tasheva/1_tmjxi9.jpg','gallery':['Ofleshy%20Andjela%20Tasheva/6_emnzh0.jpg','Ofleshy%20Andjela%20Tasheva/7_bkoqdr.jpg','Ofleshy%20Andjela%20Tasheva/8_iy0e1t.jpg']},
      new ProductModel(
        "e752ef04-304f-49f2-b1ff-166309ea34fd",
        "5,4 mm"
      ),
      new ProductType(
        "d9e9e846-7a39-4aec-b065-88b9e22ff526",
        "Machine"
      ),
      null,
      "/Catalog/Andjela_Tasheva/Ofleshy"
    ),


    quantity: 1}
  ];

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
    console.log(showCart)
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




  calculateTotal(withDiscount: boolean = false){
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


