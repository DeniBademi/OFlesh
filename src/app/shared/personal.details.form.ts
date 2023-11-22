import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

const form = {
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
  phoneNumber: new FormControl(undefined,[
    Validators.required,
    Validators.pattern(/^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/)

  ]),
  discountCode: new FormControl('', []),
  agreed_privacy_policy: new FormControl(false, [
    Validators.requiredTrue
  ]),
  agreed_terms: new FormControl(false, [
    Validators.requiredTrue
  ]),
  };

@Injectable({ providedIn: 'root' })
export class PersonalDetailsForm extends FormGroup {
  constructor() {
    super(form);
  }
}