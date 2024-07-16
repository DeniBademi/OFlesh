import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout-thank-you',
  templateUrl: './checkout-thank-you.component.html',
  styleUrls: ['./checkout-thank-you.component.scss']
})
export class CheckoutThankYouComponent implements OnInit {

  constructor(public translate: TranslateService, private route: ActivatedRoute) { }

  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.translate.use(this.route.snapshot.paramMap.get("languageCode"));


    (window as any).System.import('../../../assets/js/googleadsevent.js')
  }

}
