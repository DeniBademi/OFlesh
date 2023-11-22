// import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ActivatedRoute, Router } from '@angular/router';
// import {loadStripe} from '@stripe/stripe-js';
// import { Checkout } from 'src/app/_models/Checkout';
// import { DataService } from 'src/app/_services/data.service';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent implements OnInit, OnDestroy, AfterViewInit {
//   @ViewChild('cardInfo') cardInfo: ElementRef | undefined;
  
//     checkoutID: string | null | undefined;
//     checkout: Checkout | undefined;

//     shippingInformation = new FormGroup({
//         addressLine1: new FormControl('Lulin 170', [
//           Validators.required,
//         ]),
//         addressLine2: new FormControl('', [
//           Validators.required,
//         ]),
//         countryId: new FormControl('', [
//         ]),
//         city: new FormControl('Sofia', [
//           Validators.required,
//         ]),
//         state: new FormControl('', []),
//         postalCode: new FormControl('1335'),
//         shippingMethodId: new FormControl(undefined, [
//             Validators.required
//         ])
//       });

//       paymentOptions = new FormControl(undefined, [
//         Validators.required,
//       ])


//     // STRIPE
//     stripe: any;
//     elements: any;
    
//     card: any;
//     cardHandler = this.onChange.bind(this);
//     cardError: string | undefined;
//     shippingMethods: any;
//     showStripe = false;
//     selectedPaymentOption: any;
    
    
//     constructor(private Route: ActivatedRoute, private Router: Router, private DataService: DataService, private cd: ChangeDetectorRef, @Optional() @Inject(MAT_DIALOG_DATA) private data: any, @Optional() private dialogRef: MatDialogRef<CheckoutComponent>) { }


//     ngOnInit() {
//         this.DataService.getAll("shippingmethod").subscribe( (value) => {
//             this.shippingMethods = value;
//             console.log(this.shippingMethods)
//           })
//         this.Route.paramMap.subscribe( paramMap => {
//             this.checkoutID = paramMap.get('id');
//             this.DataService.getById(this.checkoutID!, "checkout").subscribe( checkout => {

//                 if(checkout == undefined)
//                     this.Router.navigate(["not-found"]);;
                
//                 this.checkout = checkout
//                 })
//             });

//         this.shippingInformation.get("shippingMethodId").valueChanges.subscribe(x => {
//             console.log(x)
//             if(["5014454e-a434-4fb7-842b-570b0c80e44d", "b52271b9-7ee0-49ea-8d2c-ce40c5f16f76"].includes(x)){
//                 this.paymentOptions.setValue("card")
//                 this.paymentOptions.disable();
//             } else {
//                 this.paymentOptions.enable();
//                 this.paymentOptions.setValue(undefined)
//             }
//             //this.paymentOptions.disable();
//         })

//         this.paymentOptions.valueChanges.subscribe(x => {
//             console.log(x)
//             if(x == "card") {
//                 this.showStripe = true;
//             } else {
//                 this.showStripe = false;
//             }         
//             //this.paymentOptions.disable();
//         })


        
//     }
    
//     ngOnDestroy() {
//             if (this.card) {
//                 // We remove event listener here to keep memory clean
//                 this.card.removeEventListener('change', this.cardHandler);
//                 this.card.destroy();
//             }
//         }


//     ngAfterViewInit() {
        
//     }

//     initiateCardElement() {
//             // Giving a base style here, but most of the style is in scss file
//             const cardStyle = {
//                 base: {
//                     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//                     fontSmoothing: 'antialiased',
//                     backgroundColor: "#333",
//                     color: "#fff", 
//                     fontSize: '16px',
//                     '::placeholder': {
//                         color: '#aab7c4',
//                     },
//                 },
//                 invalid: {
//                     color: '#fa755a',
//                     iconColor: '#fa755a',
//                 },
//             };
//             this.card = this.elements.create('card', {style: cardStyle});
//             this.card.mount(this.cardInfo!.nativeElement);
//             this.card.addEventListener('change', this.cardHandler);
//     }


//     onChange(error : any) {
//             if (error) {
//                 this.cardError = error.message;
//             } else {
//                 this.cardError = undefined;
//             }
//             this.cd.detectChanges();
//     }
//     async createStripeToken() {
//             const {token, error} = await this.stripe.createToken(this.card);
//             if (token) {
//                 this.onSuccess(token);
//             } else {
//                 this.onError(error);
//             }
//         }
//     onSuccess(token : any) {
//             this.dialogRef.close({token});
//         }
//     onError(error : any) {
//             if (error.message) {
//                 this.cardError = error.message;
//             }
//         }


//     order() {}
// }