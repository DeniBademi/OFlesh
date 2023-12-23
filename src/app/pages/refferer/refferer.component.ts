import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-refferer',
  templateUrl: './refferer.component.html',
  styleUrls: ['./refferer.component.css']
})
export class ReffererComponent implements OnInit {

  constructor(private titleService:Title, private router: Router, private translate: TranslateService ) {
    titleService.setTitle("Oflesh - Andjela")
    this.router.navigate(['/'+this.translate.currentLang+"/catalog/andjela"])
   }

  ngOnInit() {
  }

}
