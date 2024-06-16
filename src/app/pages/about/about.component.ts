import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', './css/mediaqueries.scss', './css/default.scss']
})
export class AboutComponent implements OnInit {

  constructor(private route: ActivatedRoute, private meta: Meta, private translate:TranslateService) { }

  ngOnInit() {
    this.translate.use(this.route.snapshot.paramMap.get("languageCode"))

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.meta.updateTag({ name: 'description', content: 'About us' });
    this.meta.updateTag({ name: 'keywords', content: 'about us, oflesh, oflesh.com, oflesh store' });
    this.meta.updateTag({ name: 'author', content: 'Oflesh' });
    this.meta.updateTag({ property: 'og:title', content: 'About us' });
    this.meta.updateTag({ property: 'og:description', content: 'About our company, our mission and our vision' });
  }

}
