import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/_services/globals.service';

@Component({
  selector: 'app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.css']
})
export class NewsletterFormComponent implements OnInit {


  email: string = "";
  emailValidator = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor(public GlobalsService: GlobalsService, public http: HttpClient, public toastr: ToastrService) { }

  ngOnInit() {
  }


  addSubscription() {
    if(this.emailValidator.test(this.email)) {

      let url = this.GlobalsService.baseURL + "newslettersubscription/add"
      this.http.post(url, {}, {
        observe: 'response',
        params: new HttpParams().set("email", this.email)}).subscribe(res => {
        this.toastr.success("Successfully subscribed to our newsletter", "Email subscription")
      })
    } else {
      this.toastr.error("The email address entered is invalid", "Email subscription")
    }
  }

}
function HttpParamOptions(): import("@angular/common/http").HttpParamsOptions | undefined {
  throw new Error('Function not implemented.');
}

