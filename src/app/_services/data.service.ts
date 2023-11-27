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

  database = [
    new Product(
        "75E4EB9E-DD36-4F50-A50D-3711EE6DC679",
        "Ofleshy Andjela Tasheva",
        150,
        null,
        "The Collection of „Andjela Tasheva“ Ofleshy is an exceptional quality male \
        masturbator, designed with the ability to take you close to your beloved star. Oozing intimacy, \
        this product delivers unparalleled pleasure and realism. Made of high quality TPE material that \
        is safe for the skin, it offers a soft and realistic experience. Since it is manually operated, you \
        can control the pace, strength and intensity of your pleasure by customizing it to your \
        preference. A gift in the collection of &quot;Andjela Tasheva&quot; Ofleshy. Lubricant is Created with care \
        and attention to the safety and sensitivity of your skin, it is water-based and will turn your \
        intimate moments into pleasure.",
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
        "/Catalog/Andjela_Tasheva/Manual"
      ),
      new Product(
        "75E4EB9E-DD36-4F50-A50D-3711EE6DC631",
        "Autofleshy Andjela Tasheva",
        150,
        null,
        "Autofleshy Andjela Tasheva is an incredible quality electric male masturbator cup that gives \
        you the ability to reach new heights of pleasure. With its 10 frequency vibrations, this \
        product takes the feeling of intimacy to another level and lets you feel close to your \
        favorite star. Combining an extremely soft TPE structural material with an intelligently \
        designed suction action, this masturbator offers a realistic sensation and immersion in \
        the moment itself. Its electronic control gives you the ability to choose the strength and \
        speed of vibration to enjoy intimate play that suits your desires. A gift in the collection of \
        &quot;Andjela Tasheva&quot; Autofleshy. Lubricant is Created with care and attention to the safety \
        and sensitivity of your skin, it is water-based and will turn your intimate moments into \
        pleasure.",
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
        "/Catalog/Andjela_Tasheva/Electric"
      ),
      // new Product(
      //   "75E4EB9E-DD36-4F50-A50D-3711EE6DC673",
      //   "Manual Fleshlight of Daniela",
      //   150,
      //   null,
      //   "Our hexagon roller that leaves the perfect honeycomb pattern on each sheet.",
      //   {'thumbnail':'5.4%D0%BC%D0%BC/Main_xtg2fj.jpg','gallery':['5.4%D0%BC%D0%BC/2_sccwvj.jpg','5.4%D0%BC%D0%BC/3_vqw97g.jpg','5.4%D0%BC%D0%BC/4_gl72vu.jpg','5.4%D0%BC%D0%BC/5_z9h0xg.jpg']},
      //   new ProductModel(
      //     "e752ef04-304f-49f2-b1ff-166309ea34fd",
      //     "5,4 mm"
      //   ),
      //   new ProductType(
      //     "d9e9e846-7a39-4aec-b065-88b9e22ff526",
      //     "Machine"
      //   ),
      //   null,
      //   "/Catalog/Daniela/Manual"
      // ),
      // new Product(
      //   "75E4EB9E-DD36-4F50-A50D-3711EE6DC671",
      //   "Electric Fleshlight of Daniela",
      //   150,
      //   null,
      //   "Our hexagon roller that leaves the perfect honeycomb pattern on each sheet.",
      //   {'thumbnail':'5.4%D0%BC%D0%BC/Main_xtg2fj.jpg','gallery':['5.4%D0%BC%D0%BC/2_sccwvj.jpg','5.4%D0%BC%D0%BC/3_vqw97g.jpg','5.4%D0%BC%D0%BC/4_gl72vu.jpg','5.4%D0%BC%D0%BC/5_z9h0xg.jpg']},
      //   new ProductModel(
      //     "e752ef04-304f-49f2-b1ff-166309ea34fd",
      //     "5,4 mm"
      //   ),
      //   new ProductType(
      //     "d9e9e846-7a39-4aec-b065-88b9e22ff526",
      //     "Machine"
      //   ),
      //   null,
      //   "/Catalog/Daniela/Electric"
      // )
        ]

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

  getProductsForCategory(currentCategoryRoute: string, features){

    return this.http.get(this.GlobalsService.baseURL+'product/getAll').pipe(
    map((response: any) => {

        if(features.length == 0)
          return response.filter(x => x.categoryRoute.toLowerCase().indexOf(currentCategoryRoute) > -1)
          .filter(x => features);

        let output = [];
        for(let i=0;i<features.length;i++)
          output.push(...response.filter(x => x.categoryRoute.toLowerCase().indexOf(currentCategoryRoute+"/"+features[i]) > -1))

        return output;
      }))
  }

  getProductByIdLocal(id: string) {
    return this.database.find(x => x.id == id);
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
