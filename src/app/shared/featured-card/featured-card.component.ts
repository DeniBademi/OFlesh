import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { GlobalsService } from '../../_services/globals.service';
import { Product } from '../../_models/Product';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-featured-card',
  templateUrl: './featured-card.component.html',
  styleUrls: ['./featured-card.component.css']
})
export class FeaturedCardComponent implements OnInit {

  @Input() product!: Product
  photosJSON : any;
  
  constructor(public CartService: CartService, public GlobalsService: GlobalsService, public translate: TranslateService) { }

  ngOnInit() {
  }

}
