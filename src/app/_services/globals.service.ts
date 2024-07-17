import { Injectable } from '@angular/core';
import { Product } from '../_models/Product';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  baseURL = "https://localhost:5001/"
  //baseURL = "https://api.oflesh.com/"
  // clientBaseURL = "http://213.124.166.84:4200/"

  productPhotosMediaURLs = "https://res.cloudinary.com/dvkjlgu83/image/upload/v1701946895/product-photos-oflesh/"
  productDesignImagesURLs = "https://res.cloudinary.com/dvkjlgu83/image/upload/v1677171170/design/"

  processing_fee = 2;

  stripePublicKey = "pk_live_51OLB0fHxoFbSYRPaPDZbqTtO6h4Y6XazXhtqRq1mRBHZViCA9DITo93WAj9wk9nbEWJMK3bHhNDQRADzlVTcjoHw00YXhBstUe"
  //stripePublicKey = "pk_test_51OLB0fHxoFbSYRPa7e4TDoCvq7yyprp746MujJyE2tARffODpEg7UQA6VvHJY7l6M7p985SAjRaJxrVnYgD7amaL008edOZDhP"


constructor() { }

}
