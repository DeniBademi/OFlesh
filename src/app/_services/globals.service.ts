import { Injectable } from '@angular/core';
import { Product } from '../_models/Product';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  baseURL = "https://localhost:5001/"
  //baseURL = "https://ofleshserver.azurewebsites.net/"
  // clientBaseURL = "http://213.124.166.84:4200/"

  productPhotosMediaURLs = "https://res.cloudinary.com/dvkjlgu83/image/upload/v1701946895/product-photos-oflesh/"
  productDesignImagesURLs = "https://res.cloudinary.com/dvkjlgu83/image/upload/v1677171170/design/"

  //stripePublicKey = "pk_test_51MuGi1BAZhA0rlRn9ZAiDgRRfVhJ9F0j5KD62362DJQhM1T6SUjwT5m3ObdVrpYfJWD1C7BLi95dYm4Xks4XzZ3p00qELKSmiJ"
  stripePublicKey = "pk_live_51MuGi1BAZhA0rlRnKh5ouoqDaBiS7YBIr7MjXtxVWrvarUvCIlI71l7eU6P9P4PUAyr966Ebwjh6miUpDzvuLhT500nRdEpzgw"

  machines : any;



constructor() { }

}
