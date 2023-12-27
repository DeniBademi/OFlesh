import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

const form = {
  personalDetails: new FormGroup({
    firstName: new FormControl('Denis', [
      Validators.required,
    ]),
    lastName: new FormControl('Zahariev', [
      Validators.required,
    ]),
    email: new FormControl('denis.zaharievv@gmail.com', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl('+359878426545',[
      Validators.required,
      Validators.pattern(/^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/)

    ]),
    discountCode: new FormControl('', []),
  }),
  shippingAddress: new FormGroup({
    addressLine1: new FormControl('A', [
      Validators.required,
    ]),
    addressLine2: new FormControl('B', [
    ]),
    countryId: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('Sofia', [
      Validators.required,
    ]),
    state: new FormControl('', []),
    postalCode: new FormControl('1335',[
      Validators.required
    ]),
    }),
    shippingMethodId: new FormControl(undefined, [
        Validators.required
    ]),
    paymentMethod: new FormControl(undefined, [
        Validators.required
    ]),
    agreed_to_terms: new FormControl(false, [
        Validators.requiredTrue
    ]),
    agreed_privacy_policy: new FormControl(false, [
        Validators.requiredTrue
    ]),
  };

@Injectable({ providedIn: 'root' })
export class OrderForm extends FormGroup {
  constructor() {
    super(form);
  }
}