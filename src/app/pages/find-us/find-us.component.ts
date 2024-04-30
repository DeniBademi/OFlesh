import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.component.html',
  styleUrls: ['./find-us.component.scss']
})
export class FindUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
