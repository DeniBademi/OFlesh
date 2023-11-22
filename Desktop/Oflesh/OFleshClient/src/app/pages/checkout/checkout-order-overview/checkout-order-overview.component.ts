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
  private eventsSubscription: any;

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

    this.cartItems = JSON.parse(this.checkout["cartJSON"])
    this.sum = this.CartService.calculateTotalJSON(this.cartItems);
    this.total = this.sum;
    console.log(this.checkout.coupon)
    if(this.checkout.coupon != undefined) {
      if(this.checkout.coupon.isPercentage) {
        this.total = this.sum * (100 - this.checkout.coupon.discount)/100
      } else {
        this.total = this.sum - this.checkout.coupon.discount;
      }
    }

    if( this.form.get("shippingAddress.countryId").value != undefined && this.form.get("shippingMethodId").value != null) {
      this.shippingPrice = this.form.get("shippingAddress.countryId").value.price + (this.form.get("shippingMethodId").value == "priority"? 10 : 0);
      this.recalculate();
    }

    this.eventsSubscription = this.form.valueChanges.subscribe((value) => {
      if( value.shippingAddress.countryId != undefined && value.shippingMethodId != null) {
        this.shippingPrice = value.shippingAddress.countryId.price + (value.shippingMethodId == "priority"? 10 : 0);
        this.recalculate();
      }
      
    });

  }

  recalculate() {
    this.sum = this.CartService.calculateTotalJSON(this.cartItems);
    this.total = 0;
    if(this.checkout.coupon != undefined) {
      if(this.checkout.coupon.isPercentage) {
        this.total = this.sum * (100 - this.checkout.coupon.discount)/100
      } else {
        this.total = this.sum - this.checkout.coupon.discount;
      }
    } else {
      this.total += this.sum;
    }
    this.total += this.shippingPrice
    console.log(this.checkout.coupon)
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

}
