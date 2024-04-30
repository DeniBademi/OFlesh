import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/_services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./css/default.scss', './css/mediaqueries.scss', './contact.component.scss']
})
export class ContactComponent implements OnInit {


  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.required,
    ]),
    phonenumber: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    message: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private DataService: DataService, private toastr: ToastrService, private translate: TranslateService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.translate.use(this.route.snapshot.paramMap.get("languageCode"))

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  sendMessage() {
    this.DataService.sendMessage(this.form.value).subscribe(
    value => {
      this.toastr.success("We received your message!", "Thank you")
    },
    error => {
      this.toastr.error("Something went wrong. Please, try again later.")
    })
  }

}
