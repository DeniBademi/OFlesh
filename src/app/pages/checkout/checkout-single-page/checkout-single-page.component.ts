import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { Checkout } from 'src/app/_models/Checkout';
import { GlobalsService } from 'src/app/_services/globals.service';
import { OrderForm } from 'src/app/shared/order.form';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { parse } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-checkout-single-page',
  templateUrl: './checkout-single-page.component.html',
  styleUrls: ['./checkout-single-page.component.scss']
})
export class CheckoutSinglePageComponent implements OnInit, OnDestroy {

  totalAmount: any;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;
  dialog: any;
  elements: any;
  stripe: Stripe;
  shippingMethods: any;

  showStripe = false;
  showPaymentOptions = false;
  selectedPaymentOption: any;
  total: any;
  clientSecret: any;

  setShipping: Subject<number> = new Subject<number>();
  formSubscriptions: any = [];

  priorityOrderPrice = 10;


  retrievedShippingPrice;


  countries = [];


  public bankCtrl: FormControl<any> = new FormControl<any>(null);

  /** control for the MatSelect filter keyword */
  public countryFilterCtrl: FormControl<string> = new FormControl<string>('');

  /** list of countries filtered by search keyword */
  public filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();


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
    public Globals: GlobalsService) { }


  ngOnInit() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      if(!this.CartService.cartItems.getValue().length)
        this.Router.navigate(['/'+this.translate.currentLang+"/home"])

      this.translate.use(this.route.snapshot.paramMap.get("languageCode"))

      this.addFormControlSubscriptions();

      this.DataService.getAll("country").subscribe(value => {
        this.countries = value.slice().sort();
        this.filteredCountries.next(this.countries);
        this.countries.sort((a, b) => a.name.localeCompare(b.name))
        this.setInitialValue();
      })
      this.countryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountries();
      });
  }

  addFormControlSubscriptions() {
          // subscribtion to delete old data if shipping address changes
          let shippingAddressSubscription = this.form.get('shippingAddress').valueChanges.subscribe(value => {
            this.retrievedShippingPrice = 0;
            this.setShippingInOverview(null)
            this.showStripe = false;
            this.form.get('shippingMethodId').setValue(undefined)
            this.form.get('paymentMethod').setValue(undefined)
            this.showPaymentOptions = false;
          });
          this.formSubscriptions.push(shippingAddressSubscription);

          // subscribtion to automatically select the card payment method
          // if the country is not Bulgaria, as it is the only available payment method
          let countrySubscription = this.form.get('shippingAddress.countryId').valueChanges.subscribe(newValue => {

            if(newValue.name != "Bulgaria" && newValue.name != "България"){
              this.form.get('paymentMethod').setValue("card")
              this.form.get('paymentMethod').disable();
              this.showPaymentOptions = false;
              //this.showStripe = true;

            } else {
                this.form.get('paymentMethod').enable();
                this.form.get('paymentMethod').setValue(undefined)
            }
          });
          this.formSubscriptions.push(countrySubscription);

          // subscribtion to print shipping method if value changes
          // and initiate the card element if it is the selected payment method
          let shippingMethodSubscription = this.form.get("shippingMethodId").valueChanges.subscribe(newValue => {

            this.showPaymentOptions = true;
            this.setShippingInOverview(this.retrievedShippingPrice + (newValue=="priority"?this.priorityOrderPrice:0))

            if(this.form.get('paymentMethod').value == "card" && this.form.valid){
              this.showStripe = true;
              this.getClientSecret();
            }
          })
          this.formSubscriptions.push(shippingMethodSubscription);

          let paymentMethodSubscription = this.form.get('paymentMethod').valueChanges.subscribe(x => {

            if(x == "card") {
              // create a copy of the form and discard agreed_to_terms and agreed_to_privacy

              // check if the form is valid
              if(this.form.get("personalDetails").valid && this.form.get("shippingAddress").valid && this.form.get("shippingMethodId").valid){

                this.showStripe = true;
                this.getClientSecret();
              }
            } else {
              this.showStripe = false;

            }
          })
          this.formSubscriptions.push(paymentMethodSubscription);
  }

  ngAfterViewInit(): void {

  }




  async nextStep() {
    let data = {};
    if(this.form.get('paymentMethod').value == "card") {
      await this.makeTransaction();
      return;
    }

    let personalDetails = this.form.get('personalDetails')
    let shippingInfo = this.form.get('shippingAddress')

    data['firstName'] = personalDetails.get("firstName").value;
    data['lastName'] = personalDetails.get("lastName").value;
    data['email'] = personalDetails.get("email").value;
    data['discountCode'] = this.CartService.couponCode;
    data['phoneNumber'] = personalDetails.get("phoneNumber").value;
    data['shippingMethodId'] = this.form.get("shippingMethodId").value
    data['addressLine1'] = shippingInfo.get("addressLine1").value
    data['addressLine2'] = shippingInfo.get("addressLine2").value
    data['city'] = shippingInfo.get("city").value
    data['state'] = shippingInfo.get("state").value
    data['postalCode'] = shippingInfo.get("postalCode").value
    data['country'] = shippingInfo.get("countryId").value.name
    data["paymentMethod"] = this.form.get('paymentMethod').value;
    data['cartJSON'] = JSON.stringify(this.CartService.cartItems.getValue());

    this.DataService.placeOrder(data).subscribe( (value) => {
        //console.log(value)
        this.Router.navigate(['/'+this.translate.currentLang+"/checkout/thank-you"])
    });
  }

  protected setInitialValue() {

    this.filteredCountries
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    if (this.card) {
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }

    this.formSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  protected filterCountries() {
    if (!this.countries) {
      return;
    }
    // get the search keyword
    let search = this.countryFilterCtrl.value;
    if (!search) {
      this.filteredCountries.next(this.countries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the countries
    this.filteredCountries.next(
      this.countries.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }



  async makeTransaction() {
    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: window.location.href+"/thank-you",
        receipt_email: this.form.get("personalDetails.email").value,
        shipping: {
          name: this.form.get("personalDetails.firstName").value + " " + this.form.get("personalDetails.lastName").value,
          phone: this.form.get("personalDetails.phoneNumber").value,
          address: {
            city: this.form.get("shippingAddress.city").value,
            country: this.form.get("shippingAddress.countryId").value.name,
            line1: this.form.get("shippingAddress.addressLine1").value,
            line2: this.form.get("shippingAddress.addressLine2").value,
            postal_code: this.form.get("shippingAddress.postalCode").value,
            state: this.form.get("shippingAddress.state").value,
          },
          carrier: this.form.get("shippingMethodId").value,
        },
        payment_method_data: {
          billing_details: {
            name: this.form.get("personalDetails.firstName").value + " " + this.form.get("personalDetails.lastName").value,
            phone: this.form.get("personalDetails.phoneNumber").value,
            address: {
              city: this.form.get("shippingAddress.city").value,
              country: this.form.get("shippingAddress.countryId").value.name,
              line1: this.form.get("shippingAddress.addressLine1").value,
              line2: this.form.get("shippingAddress.addressLine2").value,
              postal_code: this.form.get("shippingAddress.postalCode").value,
              state: this.form.get("shippingAddress.state").value,
            },
          },
        },

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


  async getClientSecret() {
    this.DataService.getStripeClientSecret({
      'countryId':this.form.get('shippingAddress.countryId').value.id,
      'shippingMethod':this.form.get('shippingMethodId').value,
      'currencyCode': this.translate.currentLang=="bg"?"BGN":"EUR",
      "cartJSON": JSON.stringify(this.CartService.cartItems.getValue()),
      "FirstName": this.form.get('personalDetails.firstName').value,
      "LastName": this.form.get('personalDetails.lastName').value,
      "Email": this.form.get('personalDetails.email').value,
      "PhoneNumber": this.form.get('personalDetails.phoneNumber').value,
      "couponCode": this.CartService.couponCode,
      "City": this.form.get('shippingAddress.city').value,
      "PostalCode": this.form.get('shippingAddress.postalCode').value} ).subscribe(
      (data) => {
        this.clientSecret = data["clientSecret"]
        this.initiateCardElement();
      });
  }

  async initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        Color: "#fff",
        fontFamily: '"Rockwell", sans-serif',
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
     this.stripe = await loadStripe(this.Globals.stripePublicKey)
     this.elements = this.stripe.elements({clientSecret: this.clientSecret});

    // this.card = this.elements.create("card", {style:cardStyle});
    // this.card.mount("#card-info");
    // this.card.addEventListener("change", this.cardHandler);

    const paymentElement = this.elements.create("payment", {style:cardStyle});
    paymentElement.unmount();
    paymentElement.mount("#payment-element");

  }
  onChange({ error }) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
  }

  createOrder(id: any) {

  }

  checkout() {
  }

  calculateShippingPrice() {
    let params = {
      'countryId':this.form.get('shippingAddress.countryId').value.id,
      'currencyCode': this.translate.currentLang=="bg"?"BGN":"EUR",
      "cartJSON": JSON.stringify(this.CartService.cartItems.getValue()),
      'postalCode': this.form.get('shippingAddress.postalCode').value,
      'city': this.form.get('shippingAddress.city').value,
    }

    this.DataService.getDeliveryPrice(params).subscribe(value => {
      this.retrievedShippingPrice = parseFloat(value["price"])
    }, error => {
      this.toastr.error(error.error, "Error")
    });
  }
}
