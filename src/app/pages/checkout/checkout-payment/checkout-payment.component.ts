import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkout } from 'src/app/_models/Checkout';
import { DataService } from 'src/app/_services/data.service';
import { OrderForm } from 'src/app/shared/order.form';
import { CartService } from 'src/app/_services/cart.service';
import { Observable, Subject, Subscription } from 'rxjs';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/_services/globals.service';
import { TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit {
  @ViewChild('cardInfo') cardInfo: ElementRef | undefined;
  
  checkoutID: string | null | undefined;
  checkout: Checkout | undefined;

  totalAmount: any;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;
  dialog: any;
  elements: any;
  stripe: Stripe;
  shippingMethods: any;
    
  showStripe = false;
  showPaymentOptions = true;
  selectedPaymentOption: any;
  total: any;
  clientSecret: any;

  setShipping: Subject<number> = new Subject<number>();

  setShippingInOverview(value:number) {
    //console.log(value)
    this.setShipping.next(value);
  }
  
  
  constructor(private Route: ActivatedRoute, 
    private Router: Router, 
    private DataService: DataService,
    private CartService: CartService,
    public form: OrderForm,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private Globals: GlobalsService) { }


  ngOnInit() {
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
      
      this.translate.use(this.route.snapshot.paramMap.get("languageCode"))

      //Get shipping methods
      // this.DataService.getAll("shippingmethod").subscribe( (value) => {
      //     this.shippingMethods = value;

      //   })


      //seed page with data from the checkout entity
      this.Route.paramMap.subscribe( paramMap => {
          this.checkoutID = paramMap.get('id');
          this.DataService.getById(this.checkoutID!, "checkout").subscribe( checkout => {

              if(checkout == undefined)
                  this.Router.navigate(["not-found"]);;
              
              this.checkout = checkout
              //console.log(this.checkout)
              let cartItems = JSON.parse(this.checkout["cartJSON"])
                this.total = this.CartService.calculateTotalJSON(cartItems);
              })
          });


      
      let shippingMethodId = this.form.get("shippingMethodId").value;
      let shippingPrice = this.form.get('shippingAddress.countryId').value.price
      //console.log(shippingMethodId)
      //console.log(shippingPrice)
      this.setShippingInOverview(shippingPrice + (shippingMethodId=="priority"?10:0))
      if(this.form.get('shippingAddress.countryId').value.name != "Bulgaria" && this.form.get('shippingAddress.countryId').value.name != "България"){
        this.form.get('paymentMethod').setValue("card")
        this.form.get('paymentMethod').disable();
        this.showPaymentOptions = false;
        this.showStripe = true;
      } else {
          this.form.get('paymentMethod').enable();
          this.form.get('paymentMethod').setValue(undefined)
      }
      

      this.form.get('paymentMethod').valueChanges.subscribe(x => {
        this.showStripe = x == "card";        
          //this.paymentOptions.disable();
      })

      this.DataService.getStripeClientSecret({
        'checkoutId':this.checkoutID,
        'countryId':this.form.get('shippingAddress.countryId').value.id,
        'shippingMethod':shippingMethodId,
        'currencyCode': this.translate.currentLang=="bg"?"BGN":"EUR"}).subscribe(
        (data) => {
          this.clientSecret = data["clientSecret"]
          this.initiateCardElement();
        }
      )
  }



  async nextStep() {
    let data = {};
    if(this.form.get('paymentMethod').value == "card") {
      await this.makeTransaction();
      return;
    }
    
    let shippingInfo = this.form.get('shippingAddress')
    data['checkoutId'] = this.checkout.id;
    data['shippingMethodId'] = this.form.get("shippingMethodId").value
    data['addressLine1'] = shippingInfo.get("addressLine1").value
    data['addressLine2'] = shippingInfo.get("addressLine2").value
    data['city'] = shippingInfo.get("city").value
    data['state'] = shippingInfo.get("state").value
    data['postalCode'] = shippingInfo.get("postalCode").value
    data['country'] = shippingInfo.get("countryId").value.name
    data["paymentMethod"] = this.form.get('paymentMethod').value;
    data["checkoutId"] = this.checkoutID;

    this.DataService.placeOrder(data).subscribe( (value) => {
        //console.log(value)
        this.Router.navigate(['/'+this.translate.currentLang+"/checkout/"+this.checkoutID+"/thank-you"])
    });
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  async makeTransaction() {
    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: window.location.href.replace("payment", "thank-you"),
        receipt_email: "denis.zaharievv@gmail.com",
        shipping: {
          address: {
            city: this.form.get("shippingAddress.city").value,
            country: this.form.get("shippingAddress.countryId").value.name,
            line1: this.form.get("shippingAddress.addressLine1").value,
            line2: this.form.get("shippingAddress.addressLine2").value,
            postal_code: this.form.get("shippingAddress.postalCode").value,
            state: this.form.get("shippingAddress.state").value,
          },
          name: this.checkout.customer["firstName"] + " " + this.checkout.customer["lastName"],
          carrier: this.form.get("shippingMethodId").value
        }
      }
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      this.toastr.error(error.message, "Payment error");
    } else {
      this.toastr.error("An unexpected error occurred.", "Payment error");
    }
  }

  async checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
  
    if (!clientSecret) {
      return;
    }
  
    const { paymentIntent } = await this.stripe.retrievePaymentIntent(clientSecret);
  
    switch (paymentIntent.status) {
      case "succeeded":
        //console.log("Payment succeeded!");
        break;
      case "processing":
        //console.log("Your payment is processing.");
        break;
      case "requires_payment_method":
        //console.log("Your payment was not successful, please try again.");
        break;
      default:
        //console.log("Something went wrong.");
        break;
    }
  }


  async initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        Color: "#fff",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        color: "white",
        fontSize: "16px",
        "::placeholder": {
          color: "#d1d1d1",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    };
     //this.stripe = await loadStripe('pk_test_51KUEGcE2HlANu4Kr1gkhviY29YvdUIw6XVNHi7KyaatBfBY8ztFXDtiXT2BdLjLP918VXdsV8a72xMgFFOjgwxkf00Nu2bgDBv')
     this.stripe = await loadStripe(this.Globals.stripePublicKey)
     //console.log(this.clientSecret)
     this.elements = this.stripe.elements({clientSecret: this.clientSecret});
    // this.card = this.elements.create("card", {style:cardStyle});
    // this.card.mount("#card-info");
    // this.card.addEventListener("change", this.cardHandler);

    const paymentElement = this.elements.create("payment", {style:cardStyle});
    paymentElement.mount("#payment-element");
  }
  onChange({ error }) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
  }

  getTotal() {}

  createOrder(id: any) {
  }
}