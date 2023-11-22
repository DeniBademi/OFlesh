import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-thank-you',
  templateUrl: './checkout-thank-you.component.html',
  styleUrls: ['./checkout-thank-you.component.css']
})
export class CheckoutThankYouComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
