import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

const form = {
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
    ])
  };

@Injectable({ providedIn: 'root' })
export class OrderForm extends FormGroup {
  constructor() {
    super(form);
  }
}