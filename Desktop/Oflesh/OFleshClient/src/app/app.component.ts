import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from './_services/modal.service';
import { CartService } from './_services/cart.service';
import { GlobalsService } from './_services/globals.service';
import { Observable } from 'rxjs';
import { BroadcastLineComponent } from './broadcast-line/broadcast-line.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'client';

  @ViewChild(BroadcastLineComponent) broadcastLine:BroadcastLineComponent;

  constructor(public translate: TranslateService,
    private route: ActivatedRoute,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    public router: Router,
    public modalService: ModalService,
    public cartService: CartService,
    public GlobalsService: GlobalsService) {
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'bg', 'el']);
    translate.use('en');

  }
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if(localStorage.getItem('targetTime') == null && localStorage.getItem('discountExpired') != 'true')
      this.modalService.open('modal-wheel-of-fortune')
  }

  handleRouteEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.titleService.setTitle(title);
        gtag('event', 'page_view', {
          page_title: title,
          page_path: event.urlAfterRedirects,
          page_location: this.document.location.href
        })
      }
    });
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }
    if (state && parent && parent.firstChild) {
      data.push(...this.getTitle(state, parent.firstChild));
    }
    return data;
  }

  redirectToFindUs() {
    this.modalService.close();
    this.router.navigate(['/'+this.translate.currentLang+'/find-us']);
  }

  redirectToCatalog() {
    this.modalService.close();
    this.router.navigate(['/'+this.translate.currentLang+'/catalog']);
  }

  startTimer() {
    console.log("start timer");
    this.broadcastLine.startTimer();

  }


}
