import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs';
import { GlobalsService } from './globals.service';

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
