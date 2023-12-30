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

  //stripePublicKey = "pk_test_51MuGi1BAZhA0rlRn9ZAiDgRRfVhJ9F0j5KD62362DJQhM1T6SUjwT5m3ObdVrpYfJWD1C7BLi95dYm4Xks4XzZ3p00qELKSmiJ"
  stripePublicKey = "pk_test_51OLB0fHxoFbSYRPa7e4TDoCvq7yyprp746MujJyE2tARffODpEg7UQA6VvHJY7l6M7p985SAjRaJxrVnYgD7amaL008edOZDhP"




constructor() { }

}
