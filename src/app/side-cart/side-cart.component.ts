import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { GlobalsService } from '../_services/globals.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.scss'],
})
export class SideCartComponent implements OnInit {

  constructor(public CartService: CartService, 
    public translateService: TranslateService, 
    public GlobalsService: GlobalsService,
    private router: Router) { }

  ngOnInit() {
  }

}
