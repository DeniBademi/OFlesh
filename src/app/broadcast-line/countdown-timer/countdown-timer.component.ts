import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable, Subscription, timer } from 'rxjs';

const counter = timer(0, 1000);
const now = new Date();

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {

  @Input() endTime: Date = new Date("2024-09-16T00:00:00");  // Input property for the end time of the timer
  private subscription: Subscription = new Subscription();
  displayTime: string = '00:00:00:00'; // Display time in dd:hh:mm:ss format

  ngOnInit() {
    this.updateDisplayTime();
    this.subscription = interval(1000).subscribe(() => this.updateDisplayTime());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateDisplayTime() {
    const now = new Date().getTime();
    const endTime = new Date(this.endTime).getTime();
    const timeDiff = endTime - now;

    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      this.displayTime = `${this.pad(days)}:${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    } else {
      this.displayTime = '00:00:00:00';
    }
  }

  private pad(time: number): string {
    return time < 10 ? '0' + time : time.toString();
  }
}