import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.css']
})
export class SideCartComponent implements OnInit {

  constructor(CartService: CartService, public translateService: TranslateService, private router: Router) { }

  ngOnInit() {
  }

}
