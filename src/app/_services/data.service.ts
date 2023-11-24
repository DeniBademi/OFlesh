import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs';
import { GlobalsService } from './globals.service';
import { ProductModel } from '../_models/ProductModel';
import { Product } from '../_models/Product';
import { ProductType } from '../_models/ProductType';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  typesLoaded: boolean = false;

  constructor(private http: HttpClient, private GlobalsService: GlobalsService, private toastr: ToastrService) { }


  wakeUpServer() {
    return this.http.get(this.GlobalsService.baseURL+'weatherforecast').pipe(
      map((response: any) => {
        const types = response;
        return types;
      }))
  }

  getTypes(){
    return this.http.get(this.GlobalsService.baseURL+'producttype/getAll').pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    )
  }

  getAll(route: string){
    return this.http.get(this.GlobalsService.baseURL+route+'/getAll').pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    )
  }

  getModels(){
    return this.http.get(this.GlobalsService.baseURL+'productmodel/getAll').pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    )
  }

  getProductsLocal(currentCategoryRoute: string, features): Product[] {
    console.log(features)
    let database = [
      new Product(
          "75E4EB9E-DD36-4F50-A50D-3711EE6DC679",
          "Manual Fleshlight of Angela",
          150,
          null,
          "Our hexagon roller that leaves the perfect honeycomb pattern on each sheet.",
          {'thumbnail':'5.4%D0%BC%D0%BC/Main_xtg2fj.jpg','gallery':['5.4%D0%BC%D0%BC/2_sccwvj.jpg','5.4%D0%BC%D0%BC/3_vqw97g.jpg','5.4%D0%BC%D0%BC/4_gl72vu.jpg','5.4%D0%BC%D0%BC/5_z9h0xg.jpg']},
          new ProductModel(
            "e752ef04-304f-49f2-b1ff-166309ea34fd",
            "5,4 mm"
          ),
          new ProductType(
            "d9e9e846-7a39-4aec-b065-88b9e22ff526",
            "Machine"
          ),
          null,
          "/Catalog/Angela/Manual"
        ),
        new Product(
          "75E4EB9E-DD36-4F50-A50D-3711EE6DC631",
          "Electric Fleshlight of Angela",
          150,
          null,
          "Our hexagon roller that leaves the perfect honeycomb pattern on each sheet.",
          {'thumbnail':'5.4%D0%BC%D0%BC/Main_xtg2fj.jpg','gallery':['5.4%D0%BC%D0%BC/2_sccwvj.jpg','5.4%D0%BC%D0%BC/3_vqw97g.jpg','5.4%D0%BC%D0%BC/4_gl72vu.jpg','5.4%D0%BC%D0%BC/5_z9h0xg.jpg']},
          new ProductModel(
            "e752ef04-304f-49f2-b1ff-166309ea34fd",
            "5,4 mm"
          ),
          new ProductType(
            "d9e9e846-7a39-4aec-b065-88b9e22ff526",
            "Machine"
          ),
          null,
          "/Catalog/Angela/Electric"
        ),
        new Product(
          "75E4EB9E-DD36-4F50-A50D-3711EE6DC673",
          "Manual Fleshlight of Daniela",
          150,
          null,
          "Our hexagon roller that leaves the perfect honeycomb pattern on each sheet.",
          {'thumbnail':'5.4%D0%BC%D0%BC/Main_xtg2fj.jpg','gallery':['5.4%D0%BC%D0%BC/2_sccwvj.jpg','5.4%D0%BC%D0%BC/3_vqw97g.jpg','5.4%D0%BC%D0%BC/4_gl72vu.jpg','5.4%D0%BC%D0%BC/5_z9h0xg.jpg']},
          new ProductModel(
            "e752ef04-304f-49f2-b1ff-166309ea34fd",
            "5,4 mm"
          ),
          new ProductType(
            "d9e9e846-7a39-4aec-b065-88b9e22ff526",
            "Machine"
          ),
          null,
          "/Catalog/Daniela/Manual"
        ),
        new Product(
          "75E4EB9E-DD36-4F50-A50D-3711EE6DC671",
          "Electric Fleshlight of Daniela",
          150,
          null,
          "Our hexagon roller that leaves the perfect honeycomb pattern on each sheet.",
          {'thumbnail':'5.4%D0%BC%D0%BC/Main_xtg2fj.jpg','gallery':['5.4%D0%BC%D0%BC/2_sccwvj.jpg','5.4%D0%BC%D0%BC/3_vqw97g.jpg','5.4%D0%BC%D0%BC/4_gl72vu.jpg','5.4%D0%BC%D0%BC/5_z9h0xg.jpg']},
          new ProductModel(
            "e752ef04-304f-49f2-b1ff-166309ea34fd",
            "5,4 mm"
          ),
          new ProductType(
            "d9e9e846-7a39-4aec-b065-88b9e22ff526",
            "Machine"
          ),
          null,
          "/Catalog/Daniela/Electric"
        )
    ]

    if(features.length == 0)
      return database.filter(x => x.categoryRoute.toLowerCase().indexOf(currentCategoryRoute) > -1)
      .filter(x => features);

    let output = [];
    for(let i=0;i<features.length;i++)
      output.push(...database.filter(x => x.categoryRoute.toLowerCase().indexOf(currentCategoryRoute+"/"+features[i]) > -1))

    return output;
  }

  getProductByIdFull(id: number) {
    return this.http.get(this.GlobalsService.baseURL+'product/getByIdFull/'+id).pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    )
  }

  getById(id: string, route: string) {
    return this.http.get(this.GlobalsService.baseURL+route+'/getById/'+id).pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    )
  }

  getByIdFull(id: string, route: string) {
    return this.http.get(this.GlobalsService.baseURL+route+'/getByIdFull/'+id).pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    )
  }

  validateCouponCode(code: string) {
    return this.http.get(this.GlobalsService.baseURL+'coupon/validate',
    {params: new HttpParams().set("Code", code),
      observe: "response"})
  }

  checkout(data : any) {
    return this.http.post(this.GlobalsService.baseURL+'checkout/add', data)
  }

  placeOrder(data: any) {
    return this.http.post(this.GlobalsService.baseURL +'order/add', data);
  }

  sendMessage(data: any) {
    return this.http.post(this.GlobalsService.baseURL +'contactmessage/add', data);
  }

  getStripeClientSecret(data) {
    return this.http.post(this.GlobalsService.baseURL +'stripe/create-payment-intent', data);
  }

  isDiscountActive() {
    try {
      return new Date(localStorage.getItem('targetTime')!).getTime() - new Date().getTime() > 0
    } catch (error) {
      return false;
    }
  }
}
