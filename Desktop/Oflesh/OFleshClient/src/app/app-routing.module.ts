import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { FindUsComponent } from './pages/find-us/find-us.component';
import { CheckoutPaymentComponent } from './pages/checkout/checkout-payment/checkout-payment.component';
import { CheckoutShippingAddressComponent } from './pages/checkout/checkout-shipping-address/checkout-shipping-address.component';
import { CheckoutShippingMethodComponent } from './pages/checkout/checkout-shipping-method/checkout-shipping-method.component';
import { CheckoutThankYouComponent } from './pages/checkout/checkout-thank-you/checkout-thank-you.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {path: '', redirectTo: "en/home", pathMatch: "full"},
  {path: ':languageCode/home', component: HomeComponent, data: { title: 'Homepage' }},
  {path: ':languageCode/about', component: AboutComponent, data: { title: 'About' }},
  {path: ':languageCode/catalog', component: ProductCatalogComponent, data: { title: 'Catalog' }},
  {path: ':languageCode/contact', component: ContactComponent, data: { title: 'Contact' }},
  {path: ':languageCode/cart', component: CartComponent, data: { title: 'Cart' }},
  {path: ':languageCode/checkout/:id/shipping-address', component: CheckoutShippingAddressComponent},
  {path: ':languageCode/checkout/:id/shipping-method', component: CheckoutShippingMethodComponent},
  {path: ':languageCode/checkout/:id/payment', component: CheckoutPaymentComponent},
  {path: ':languageCode/checkout/:id/thank-you', component: CheckoutThankYouComponent},
  {path: ':languageCode/product/:id', component: ProductDetailsComponent},
  {path: ':languageCode/terms-and-conditions', component: TermsAndConditionsComponent},
  {path: ':languageCode/privacy-policy', component: PrivacyPolicyComponent},
  {path: ':languageCode/find-us', component: FindUsComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
