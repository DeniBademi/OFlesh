import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

const form = {
  personalDetails: new FormGroup({
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
      // Validators.pattern(/^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/)

    ]),
    discountCode: new FormControl('', []),
  }),
  shippingAddress: new FormGroup({
    addressLine1: new FormControl('', [
      Validators.required,
    ]),
    addressLine2: new FormControl('', [
    ]),
    countryId: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required,
    ]),
    state: new FormControl('', []),
    postalCode: new FormControl('',[
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