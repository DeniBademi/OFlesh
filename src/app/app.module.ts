import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { FindUsComponent } from './pages/find-us/find-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { ProductListComponent } from './product-list/product-list.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductFiltersComponent } from './product-filters/product-filters.component';
// import { NgParticlesModule } from "ng-particles";
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { NewsletterFormComponent } from './shared/newsletter-form/newsletter-form.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { GalleryModule } from 'ng-gallery';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { RouterModule } from '@angular/router';
import { ShippingInformationComponent } from './shipping-information/shipping-information.component';
import { CheckoutPaymentComponent } from './pages/checkout/checkout-payment/checkout-payment.component';
import { CheckoutOrderOverviewComponent } from './pages/checkout/checkout-order-overview/checkout-order-overview.component';
import { CheckoutSinglePageComponent } from './pages/checkout/checkout-single-page/checkout-single-page.component';
import {LocalizeRouterModule} from '@gilsdav/ngx-translate-router';
import {LocalizeRouterHttpLoader} from '@gilsdav/ngx-translate-router-http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { AboutComponent } from './pages/about/about.component';
import { LanguageInterceptor } from './language.interceptor';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ConvertPipe } from './_pipes/convert.pipe';
import { FeaturedCardComponent } from './shared/featured-card/featured-card.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { ModalComponent } from './shared/modal/modal.component';
import { WheelOfFortuneComponent } from './wheel-of-fortune/wheel-of-fortune.component';
import { BroadcastLineComponent } from './broadcast-line/broadcast-line.component';
import { CountdownTimerComponent } from './broadcast-line/countdown-timer/countdown-timer.component';
import { ModelsComponent } from './pages/models/models.component';
import { CookiePolicyComponent } from './pages/cookie-policy/cookie-policy.component';
import { LiveChatWidgetModule } from '@livechat/widget-angular'
import { SideCartComponent } from './side-cart/side-cart.component';
import { ReffererComponent } from './pages/refferer/refferer.component';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';
import { HomeBanner2Component } from './home-banner2/home-banner2.component';


const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: "localhost"
  },
  position: "bottom-right",
  theme: "edgeless",
  palette: {
    popup: {
      background: "#000000",
      text: "#ffffff",
      link: "#ffffff"
    },
    button: {
      background: "#983869",
      text: "#ffffff",
      border: "transparent"
    }
  },
  type: "info",
  content: {
    message: "This website uses cookies to ensure you get the best experience on our website.",
    dismiss: "Got it!",
    deny: "Decline",
    link: "Learn more",
    href: "https://cookiesandyou.com",
    policy: "Cookie Policy",
    header: "Cookies used on the website!",
    allow: "Allow cookies"
  }
}


@NgModule({
  declarations: [
      AppComponent,
      NavBarComponent,
      ProductCardComponent,
      AboutComponent,
      FooterComponent,
      HomeComponent,
      CartComponent,
      ContactComponent,
      ProductCardComponent,
      ProductCatalogComponent,
      ProductListComponent,
      ProductFiltersComponent,
      HomeBannerComponent,
      NewsletterFormComponent,
      ProductDetailsComponent,
      ShippingInformationComponent,
      CheckoutPaymentComponent,
      CheckoutOrderOverviewComponent,
      FooterComponent,
      NewsletterFormComponent,
      FeaturedCardComponent,
      ModalComponent,
      FindUsComponent,
      ConvertPipe,
      PrivacyPolicyComponent,
      TermsAndConditionsComponent,
      WheelOfFortuneComponent,
      BroadcastLineComponent,
      CountdownTimerComponent,
      ModelsComponent,
      CookiePolicyComponent,
      SideCartComponent,
      CheckoutSinglePageComponent,
      ReffererComponent,
      HomeBanner2Component
      // HomeBanner2Component
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    GalleryModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    LiveChatWidgetModule,
    NgcCookieConsentModule.forRoot(cookieConfig),

    // RxTranslateModule.forRoot({filePath:'assets/i18n/{{language-code}}.json',isCache:true}),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
    LocalizeRouterModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}