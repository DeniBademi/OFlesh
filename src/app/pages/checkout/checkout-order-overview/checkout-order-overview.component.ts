import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Checkout } from 'src/app/_models/Checkout';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { GlobalsService } from 'src/app/_services/globals.service';
import { OrderForm } from 'src/app/shared/order.form';

@Component({
  selector: 'app-checkout-order-overview',
  templateUrl: './checkout-order-overview.component.html',
  styleUrls: ['./checkout-order-overview.component.css']
})
export class CheckoutOrderOverviewComponent implements OnInit {

  @Input() checkout: Checkout;
  @Input() setShipping: Observable<number>;
  cartItems: any;
  sum: any;
  total: any = 0;
  discount: any;
  shippingPrice: number;
  private countryIdSubscription: any;
  private shippingMethodIdSubscription: any;

  constructor(private Route: ActivatedRoute,
    private DataService: DataService,
    public CartService: CartService,
    public GlobalsService: GlobalsService,
    public translate: TranslateService,
    public form: OrderForm) {
    }

  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });


    // this.countryIdSubscription = this.form.get("shippingAddress.countryId").valueChanges.subscribe((value) => {
    //   if(value != undefined) {
    //     this.shippingPrice = value.price + (this.form.get("shippingMethodId").value == "priority"? 10 : 0);
    //     this.recalculate();
    //   }
    //   console.log(value);
    // });

    // this.shippingMethodIdSubscription = this.form.get("shippingMethodId").valueChanges.subscribe((value) => {
    //   if(value != undefined) {
    //     this.shippingPrice = this.form.get("shippingAddress.countryId").value.price + (value == "priority"? 10 : 0);
    //     this.recalculate();
    //   }
    // });

    this.setShipping.subscribe((value) => {
      this.shippingPrice = value;
      this.recalculate();
    });

    this.total = this.CartService.calculateTotal(true,true);


    // if(this.form.get("shippingAddress.countryId").value != undefined && this.form.get("shippingMethodId").value != null) {
    //   this.shippingPrice = this.form.get("shippingAddress.countryId").value.price + (this.form.get("shippingMethodId").value == "priority"? 10 : 0);
    //   this.recalculate();
    // }

    // this.eventsSubscription = this.form.valueChanges.subscribe((value) => {
    //   console.log(value);
    //   if(value.shippingAddress.countryId != undefined && value.shippingMethodId != null) {
    //     this.shippingPrice = value.shippingAddress.countryId.price + (value.shippingMethodId == "priority"? 10 : 0);
    //     this.recalculate();
    //   }
    // });

  }

  recalculate() {
    this.total = this.CartService.calculateTotal(true, true);
    this.total += this.shippingPrice;
  }

  ngOnDestroy() {
    if(this.countryIdSubscription) this.shippingMethodIdSubscription.unsubscribe();
  }

}
