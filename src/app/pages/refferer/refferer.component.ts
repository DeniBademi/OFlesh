import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-refferer',
  templateUrl: './refferer.component.html',
  styleUrls: ['./refferer.component.scss']
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
      titleService.setTitle("Oflesh - "+ code.toUpperCase())

      if (!isValid)
        this.router.navigate(['/'+this.translate.currentLang+"/home"])
      else {
        // titleService.setTitle("Oflesh - "+ code.toUpperCase())
        this.router.navigate(['/'+this.translate.currentLang+"/catalog/"+code])
      }
   });
  }

  ngOnInit() {
  }


  validateCouponCode(code: string): Promise<boolean> {
    if (code == null || code == '') return Promise.resolve(false);
    if (code.length < 5) return Promise.resolve(false);

    console.log(code);
    this.DataService.validateCouponCode(code).subscribe(
      (data) => {
        this.CartService.couponCode = code;
        this.CartService.couponData = data.body;
        this.CartService.calculateTotal();
        return Promise.resolve(true);
      },
      (error) => {
       // console.log(error);
        return Promise.resolve(false);
      }
    );
    return Promise.resolve(false);
  }

}
