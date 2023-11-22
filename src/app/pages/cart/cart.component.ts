import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { CountryISO, PhoneNumberFormat, SearchCountryField } from "ngx-intl-tel-input";
import { ToastrService } from "ngx-toastr";
import { Currency } from "src/app/_models/Currency";
import { ProductModel } from "src/app/_models/ProductModel";
import { ProductType } from "src/app/_models/ProductType";
import { CartService } from "src/app/_services/cart.service";
import { DataService } from "src/app/_services/data.service";
import { GlobalsService } from "src/app/_services/globals.service";
import { Product } from "../../_models/Product";
import { ActivatedRoute, Router} from "node_modules/@angular/router";
import { PersonalDetailsForm } from "src/app/shared/personal.details.form";
import { TranslateService } from "@ngx-translate/core";



@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {


  personalDetails = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl('',[
      Validators.required,
      Validators.pattern(/^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/)

    ]),
    discountCode: new FormControl('SALE40', []),

  });


  // PHONE NUMBER INPUT
  // separateDialCode = true;
	// SearchCountryField = SearchCountryField;
	// CountryISO = CountryISO;
  // PhoneNumberFormat = PhoneNumberFormat;
	// preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];


  cartItems: { product: any, quantity: number }[] = [];
  cartItemsLength: number = 0;
  discountCode: string ="";
  sum: number = 0;
  total: number = 0;
  discount: number = 0;
  discountType: string = "";

  agreed_terms: any = undefined;
  agreed_privacy_policy: any = undefined;


  constructor(public CartService: CartService,
              public GlobalsService: GlobalsService,
              public DataService: DataService,
              public toastr: ToastrService,
              public translate: TranslateService,
              private route: ActivatedRoute,
              private Router: Router,
              public PersonalDetailsForm: PersonalDetailsForm) {
    this.CartService.cartItems.subscribe((value) => {
      this.cartItems = value;
      //console.log(value)

    });
    this.CartService.cartItemsCount.subscribe((value) => {
      this.cartItemsLength = value;
    });

    // this.cartItems.push({product: new Product(1, "Top Roller", 0, "USD", "", JSON.parse('{"thumbnail":"001_main_gwqm02.jpg",' +
    // '"gallery":["001_1_yl9bpm.png","001_2_cxbbdb.png","001_3_bspmo4.png","001_4_i2lafj.png"]}'),
    // new ProductModel(4,"250mm 5,4 mm"),
    // new ProductType(2, "Spare part"),
    // new Currency(2, "US Dollar", "USD", "Prefix")
    // ), quantity: 1});

    // this.cartItems.push({product: new Product(2, "Bottom Roller", 0, "USD", "", JSON.parse('{"thumbnail":"001_main_gwqm02.jpg",' +
    // '"gallery":["001_1_yl9bpm.png","001_2_cxbbdb.png","001_3_bspmo4.png","001_4_i2lafj.png"]}'),
    // new ProductModel(4,"250mm 5,4 mm"),
    // new ProductType(2, "Spare part"),
    // new Currency(2, "US Dollar", "USD", "Prefix")
    // ), quantity: 1});
   }

   ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });


    this.translate.use(this.route.snapshot.paramMap.get("languageCode"))
    this.sum = this.CartService.calculateTotal();

    this.total = this.sum


   }
   ngAfterContentInit() {
    if(this.DataService.isDiscountActive()) {
    this.PersonalDetailsForm.get('discountCode').setValue(this.discountCode)
    this.discountCode = "SALE40"
    this.validateDiscountCodeSilent();
    }
   }

   validateDiscountCode() {
    if(this.discountCode.length==0) {
      this.toastr.error("Coupon is missing!")
      this.discountType = ""
      this.discount = 0
      return
    }
    let answer = this.DataService.validateCouponCode(this.discountCode).subscribe(
      data => {
      this.toastr.success("Coupon applied successfuly!")
        this.PersonalDetailsForm.get('discountCode').setValue(this.discountCode)
        this.discount = data.body["discount"]
        if(data.body["isPercentage"]) {
          this.total = this.sum * (100 - this.discount)/100
          this.discountType = "p"
        } else {
          this.total = this.sum - this.discount;
          this.discountType = "a"
        }
    },
    error => this.toastr.error(error.error))
   }

   validateDiscountCodeSilent() {

    let answer = this.DataService.validateCouponCode(this.discountCode).subscribe(
      data => {
        this.PersonalDetailsForm.get('discountCode').setValue(this.discountCode)
        this.discount = data.body["discount"]
        if(data.body["isPercentage"]) {
          this.total = this.sum * (100 - this.discount)/100
          this.discountType = "p"
        } else {
          this.total = this.sum - this.discount;
          this.discountType = "a"
        }
    },
    error => this.toastr.error(error.error))
   }


   refreshTotal() {
    this.sum = this.CartService.calculateTotal();
    if(this.discountType=="p") {
      this.total = this.sum * (100 -this.discount)/100
    } else if (this.discountType=="a") {
      this.total = this.sum - this.discount;

    }

   }

   addItem(item: Product) {
      this.CartService.addItem(item);
      this.refreshTotal();
    }

   removeItem(item: Product) {
    this.CartService.removeItem(item);
    this.refreshTotal();
   }


   checkout() {
    let data: any = {};

    data.CartJSON = JSON.stringify(this.cartItems);
    data.FirstName = this.PersonalDetailsForm.value.firstName;
    data.LastName = this.PersonalDetailsForm.value.lastName;
    data.Email = this.PersonalDetailsForm.value.email;
    data.PhoneNumber = this.PersonalDetailsForm.value.phoneNumber//!["internationalNumber"];

    if(this.PersonalDetailsForm.value.discountCode.length>0){
      //console.log(data.DiscountCode)
      data.DiscountCode = this.PersonalDetailsForm.value.discountCode!;
    }

    this.DataService.checkout(data).subscribe( (value: any) => {
      //console.log(value)
      let checkoutID = value['id'];
      this.Router.navigate(['/'+this.translate.currentLang+'/checkout/'+ checkoutID+ '/shipping-address']);

    },
    error => this.toastr.error(error.error))
   }

   checkoutState() {
    return this.PersonalDetailsForm.valid && this.agreed_terms===undefined && this.agreed_privacy_policy

  }
}
