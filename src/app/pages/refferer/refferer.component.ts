import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-refferer',
  templateUrl: './refferer.component.html',
  styleUrls: ['./refferer.component.css']
})
export class ReffererComponent implements OnInit {

  couponCode: string;

  constructor(private titleService:Title,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private CartService: CartService,
    private DataService: DataService) {

    let code = this.route.snapshot.paramMap.get('id');

    this.validateCouponCode(code).then((isValid) => {
      if (!isValid)
        this.router.navigate(['/'+this.translate.currentLang+"/home"])
      else {
        titleService.setTitle("Oflesh - "+ code.toUpperCase())
        this.router.navigate(['/'+this.translate.currentLang+"/catalog/"+code])
      }
   });
  }

  ngOnInit() {
  }


  async validateCouponCode(code: string): Promise<boolean> {

    if (code == null || code == '') return false;
    if (code.length < 5) return false;

    return true;
    this.DataService.validateCouponCode(this.couponCode).subscribe(
      (data) => {
        this.CartService.couponCode = this.couponCode;
        this.CartService.couponData = data.body;
        this.CartService.calculateTotal();

      },
      (error) => {
       // console.log(error);
      }
    );
  }

}
