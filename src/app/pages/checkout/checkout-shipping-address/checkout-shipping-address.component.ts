import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {loadStripe} from '@stripe/stripe-js';
import { OrderForm } from 'src/app/shared/order.form';
import { Checkout } from 'src/app/_models/Checkout';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { GlobalsService } from 'src/app/_services/globals.service';
import { BehaviorSubject, Observable, ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-checkout-shipping-address',
  templateUrl: './checkout-shipping-address.component.html',
  styleUrls: ['./checkout-shipping-address.component.css']
})
export class CheckoutShippingAddressComponent implements OnInit {
  @ViewChild('cardInfo') cardInfo: ElementRef | undefined;
  
    checkoutID: string | null | undefined;
    checkout: Checkout | undefined;
    cartItems: any;
    total: any;
    discount: any = 0;



    countries = [];

    public bankCtrl: FormControl<any> = new FormControl<any>(null);

    /** control for the MatSelect filter keyword */
    public countryFilterCtrl: FormControl<string> = new FormControl<string>('');

    /** list of countries filtered by search keyword */
    public filteredCountries: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    
    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
    protected _onDestroy = new Subject<void>();

    constructor(private Route: ActivatedRoute, 
      private Router: Router, 
      private DataService: DataService, 
      public form: OrderForm,
      public translateService: TranslateService,
      public CartService: CartService,
      public route: ActivatedRoute,
      public GlobalsService: GlobalsService) { 
      }


    ngOnInit() {
      window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });

      this.translateService.use(this.route.snapshot.paramMap.get("languageCode"))
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
            //console.log(this.form.controls)
      })

      // this.bankCtrl.setValue(this.countries[10]);

      // // load the initial bank list
      // this.filteredCountries.next(this.countries.slice());

      this.DataService.getAll("country").subscribe(value => {
        this.countries = value.slice();
        
        
        this.filteredCountries.next(this.countries);
      })
      this.countryFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCountries();
      });
        
    }

    ngAfterViewInit() {
      this.setInitialValue();
    }
    
    ngOnDestroy() {
      this._onDestroy.next();
      this._onDestroy.complete(); 
    }
  
  /**
   * Write code on Method
   *
   * method logical code
   */
  protected setInitialValue() {
    this.filteredCountries
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredCountries are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }
  
  /**
   * Write code on Method
   *
   * method logical code
   */
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




    nextStep(){
      //console.log(this.form.get("shippingAddress.countryId"))
      const cartItems = JSON.parse(this.checkout["cartJSON"])
      if(cartItems.length == 1 && cartItems[0].product.id == "d547ea73-101d-4b62-83eb-92d3c45f54b2" && this.form.get('shippingAddress.countryId').value.name != "Bulgaria") {
        this.form.get('shippingAddress.countryId').value.price = 9.7809
      }

      this.Router.navigate(['/'+this.translateService.currentLang+'/checkout/'+ this.checkoutID + '/shipping-method']);
    }
}