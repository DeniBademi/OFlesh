import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from './_services/modal.service';
import { CartService } from './_services/cart.service';
import { GlobalsService } from './_services/globals.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { BroadcastLineComponent } from './broadcast-line/broadcast-line.component';
import AOS from "aos";
import { EventHandlerPayload } from '@livechat/widget-angular'
// import { useKlaviyo } from '@frontend-sdk/klaviyo'
import { NgcCookieConsentService } from 'ngx-cookieconsent';

declare let gtag: Function;
// import setRandomProb from '../assets/js/wheel.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'client';

  wheelResult: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  @ViewChild(BroadcastLineComponent) broadcastLine:BroadcastLineComponent;

  constructor(public translate: TranslateService,
    private route: ActivatedRoute,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    public router: Router,
    public modalService: ModalService,
    public cartService: CartService,
    public GlobalsService: GlobalsService,
    private cookieService: NgcCookieConsentService) {
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'bg']);
    translate.use('en');

  }
  ngOnInit(): void {
    // setRandomProb(99)
  }

  ngAfterViewInit() {
    // this.modalService.open('modal-wheel-of-fortune')
    this.modalService.open('age_verification')

    if (localStorage.getItem('usedWheel') == null) {
      this.modalService.open('modal-wheel-of-fortune')

    }

    AOS.init();
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

  }

  handleNewEvent(event: EventHandlerPayload<'onNewEvent'>) {
    //console.log('LiveChatWidget.onNewEvent', event)
  }

  onWheelResult(result) {
    // Save the result or perform any action

    this.wheelResult.next(result);
    localStorage.setItem('usedWheel', 'true');
    // console.log(this.wheelResult.value);

    // this.cartService.rewardGuids$.next(this.cartService.rewardGuids[this.reward]);
  }

  copyCode(){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.wheelResult.value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


}
