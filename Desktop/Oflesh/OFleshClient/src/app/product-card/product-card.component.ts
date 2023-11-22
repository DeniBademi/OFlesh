import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { GlobalsService } from '../_services/globals.service';
import { Product } from '../_models/Product';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../_services/modal.service';
import { DataService } from '../_services/data.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css',]
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product
  photosJSON : any;

  constructor(public CartService: CartService,
    public GlobalsService: GlobalsService,
    public translate: TranslateService,
    public modal: ModalService,
    public DataService: DataService) {

 }


  ngOnInit() {
  }

  onAddToCart(product: Product) {
    this.CartService.addItem(product);

  }

}
