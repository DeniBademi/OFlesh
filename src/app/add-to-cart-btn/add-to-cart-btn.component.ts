import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-btn',
  templateUrl: './add-to-cart-btn.component.html',
  styleUrls: ['./add-to-cart-btn.component.css']
})
export class AddToCartBtnComponent implements OnInit {


  constructor(private elementRef: ElementRef) { 
    
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/addtocart.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
