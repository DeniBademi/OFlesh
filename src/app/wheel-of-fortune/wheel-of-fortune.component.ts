import { Component, ElementRef, OnInit } from '@angular/core';

declare var angVel: any;

@Component({
  selector: 'app-wheel-of-fortune',
  templateUrl: './wheel-of-fortune.component.html',
  styleUrls: ['./wheel-of-fortune.component.scss']
})
export class WheelOfFortuneComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/wheel.js";
    this.elementRef.nativeElement.appendChild(s);
    angVel=1;
  }

  ngAfterViewChecked() {

  }

}
