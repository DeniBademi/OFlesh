import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { BehaviorSubject } from 'rxjs';
declare var onWheelResult: any;
declare var angVel: any;

@Component({
  selector: 'app-wheel-of-fortune',
  templateUrl: './wheel-of-fortune.component.html',
  styleUrls: ['./wheel-of-fortune.component.scss']
})
export class WheelOfFortuneComponent implements OnInit {
  result: string | null = null;

  rewardGuids = {
    '10%': 'SDABHA',
    '15%': 'KBYIVA',
    '20%': 'DSADVT',
    '40%': 'GTYYES',
    'gift': 'SDVRTY'
  }

  //make an observable to pass the rewardGuids to the cart service
  @Output() rewardGuids$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  @Output() rewardStateChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elementRef: ElementRef, private cart: CartService) { }

  ngOnInit() {
    this.loadWheelScript(() => {
      // Assign Angular method to the global callback
      onWheelResult = this.handleWheelResult.bind(this);
    });
  }

  private loadWheelScript(callback: () => void) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '../assets/js/wheel.js';
    script.onload = callback;
    this.elementRef.nativeElement.appendChild(script);
  }

  handleWheelResult(randNum: number) {
    // Save the result or perform any action


    if (randNum > 0.66) {
      return;
    }

    if(randNum < 0.30){
      this.result = '10%';
    }
    else if(randNum < 0.40){
        this.result = '15%';
    }
    else if(randNum < 0.45){
        this.result = '20%';
    }
    else if(randNum < 0.46){
        this.result = '40%';
    }
    else if(randNum < 0.66){
        this.result = 'gift';
    }

    this.rewardGuids$.next(this.rewardGuids[this.result]);
    this.rewardStateChange.emit(this.rewardGuids[this.result]);
  }


}
