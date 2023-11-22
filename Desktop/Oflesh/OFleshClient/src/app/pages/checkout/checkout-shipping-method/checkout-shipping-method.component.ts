import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OrderForm } from 'src/app/shared/order.form';
import { Checkout } from 'src/app/_models/Checkout';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { GlobalsService } from 'src/app/_services/globals.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-checkout-shipping-method',
  templateUrl: './checkout-shipping-method.component.html',
  styleUrls: ['./checkout-shipping-method.component.css']
})
export class CheckoutShippingMethodComponent implements OnInit {
  shippingMethods: any;
  checkoutID: string;
  checkout: any;
  cartItems: any;
  total: number;

  priorityOrderPrice = 10; //bgn
  screwsPrice = 9.76; //bgn

  setShipping: Subject<number> = new Subject<number>();

  setShippingInOverview(value:number) {
    this.setShipping.next(value);
  }

  constructor(private Route: ActivatedRoute,
    private Router: Router, 
    private DataService: DataService, 
    public form: OrderForm,
    public translate: TranslateService,
    public CartService: CartService,
    public route: ActivatedRoute,
    public GlobalsService: GlobalsService) { }

  ngOnInit() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
    
    const language = this.route.snapshot.paramMap.get("languageCode")
    this.translate.use(language)
    
    if(this.form.get('shippingAddress.countryId').value.name == undefined)
      this.Router.navigate(['/not-found'])
    
    

    // this.DataService.getAll("shippingmethod").subscribe( (value) => {
    //   this.shippingMethods = value;
    //   console.log(this.shippingMethods)
    // })

    this.Route.paramMap.subscribe( paramMap => {
      this.checkoutID = paramMap.get('id');
      this.DataService.getById(this.checkoutID!, "checkout").subscribe( checkout => {

          if(checkout == undefined)
              this.Router.navigate(["not-found"]);;
          
          this.checkout = checkout
          //console.log(this.checkout)

          this.cartItems = JSON.parse(this.checkout["cartJSON"])
          this.total = this.CartService.calculateTotalJSON(this.cartItems);
          //console.log(this.form.get('shippingAddress').valid)

      });
    })
    this.form.valueChanges.subscribe(val => {
      //console.log(val['shippingAddress']['countryId'].price)
      this.setShippingInOverview(val['shippingAddress']['countryId'].price + (val['shippingMethodId']=="priority"?this.priorityOrderPrice:0))
    })
  }

  nextStep() {
    this.Router.navigate(['/'+this.translate.currentLang+'/checkout/'+ this.checkoutID + '/payment']);
  }

}
