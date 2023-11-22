import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-shipping-information',
  templateUrl: './shipping-information.component.html',
  styleUrls: ['./shipping-information.component.css']
})
export class ShippingInformationComponent implements OnInit {

  shippingInformation = new FormGroup({
    addressLine1: new FormControl('Lulin 170', [
      Validators.required,
    ]),
    addressLine2: new FormControl('', [
      Validators.required,
    ]),
    city: new FormControl('Sofia', [
      Validators.required,
    ]),
    State: new FormControl('', [
    ]),
    PostalCode: new FormControl('1335'),
    ShippingMethodId: new FormControl(undefined)
  });
  

  constructor(private DataService: DataService) { }

  shippingMethods: any;

  ngOnInit() {
    this.DataService.getAll("shippingmethod").subscribe( (value) => {
      this.shippingMethods = value;
      //ddconsole.log(this.shippingMethods)
    })
  }

}
