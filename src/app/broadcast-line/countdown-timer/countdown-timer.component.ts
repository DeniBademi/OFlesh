import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

const counter = timer(0, 1000);
const now = new Date();

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit {

  target = new Date();

  targetDateTime: Date | undefined;
  timeLeft: string = "";
  isTimerRunning: boolean = false;
  subscription: Subscription | undefined;

  ngOnInit() {

    // exactly after 24 hours
    //this.targetDateTime = new Date(now.getTime() + 60 * 60 * 24 * 1000);

    if(localStorage.getItem('targetTime')!= null) {
      this.targetDateTime = new Date(localStorage.getItem('targetTime')!);
      this.subscription = counter.subscribe(() => {
        this.time();
      });
    }
  }

  time() {
    let timeLeft = this.targetDateTime!.getTime() - new Date().getTime();

    if (timeLeft <= 0) {
      this.timeLeft = "00:00:00";
      this.stopTimer()
      localStorage.setItem("discountExpired", "true")
      return;
    }

    let msec = timeLeft;
    let hh: number | string = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm: number | string = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss: number | string = Math.floor(msec / 1000);
    msec -= ss * 1000;

    if (ss < 10) {
      ss = "0" + ss;
    }
    if (mm < 0) {
      mm = "0" + mm;
    }
    this.timeLeft = hh + ":" + mm + ":" + ss;
  }

  ngOnDestroy() {
    this.subscription!.unsubscribe();
  }

  startTimer() {

    this.isTimerRunning = true;
    localStorage.setItem("targetTime", new Date((new Date()).getTime() + 60 * 60 * 24 * 1000).toISOString()); // 60 * 60 * 24 *
    this.targetDateTime = new Date(localStorage.getItem('targetTime')!);
    this.subscription = counter.subscribe(() => {
      this.time();
    });
  }

  stopTimer() {
    this.isTimerRunning = false;
    localStorage.removeItem('targetTime');
    this.subscription!.unsubscribe();
  }

  resetTimer() {
    this.isTimerRunning = false;
    this.subscription!.unsubscribe();
    localStorage.removeItem('targetTime');
    this.targetDateTime = undefined;
    this.timeLeft = "00:00:00";
  }
}
