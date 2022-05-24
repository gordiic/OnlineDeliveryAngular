import { Component, OnInit } from '@angular/core';
import {
  Navigation,
  NavigationCancel,
  NavigationEnd,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/Models/Order';
import { Timer } from 'src/app/Models/Timer';
import { OrderService } from 'src/app/Services/UserServices/OrderServices';
import { ProductService } from 'src/app/Services/UserServices/ProductServices';
import { timer, Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-currentdelivery',
  templateUrl: './currentdelivery.component.html',
  styleUrls: ['./currentdelivery.component.css'],
})
export class CurrentdeliveryComponent implements OnInit {
  order: Order = new Order();
  timer: Timer = new Timer();
  subscription: Subscription = new Subscription();
  getTime(str: string) {
    // str = '5/23/2022 6:45:13 PM';
    //this.order.deliverTime = 20;
    const myArray = str.split(' ');
    const date = myArray[0].split('/');
    const day = Number(date[1]);
    const month = Number(date[0]);
    const year = Number(date[2]);
    console.log('day ' + day + ' month ' + month + ' year ' + year);
    const time = myArray[1].split(':');
    const hours = Number(
      myArray[2] === 'PM' ? Number(time[0]) + 12 : Number(time[0])
    );
    const minutes = Number(time[1]);
    const seconds = Number(time[2]);
    console.log('sati ' + hours + ' minuti ' + minutes + ' sekunde ' + seconds);
    return new Date(year, month, day, hours, minutes, seconds);
  }
  sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  startTimer() {
    //5/23/2022 5:08:13 PM
    console.log(this.order.acceptanceTime);
    let date: Date = this.getTime(this.order.acceptanceTime);
    console.log('Datum: ' + date);
    let nowDate: Date = new Date();
    console.log('prije ifa');
    console.log(nowDate.getHours(), date.getHours());
    console.log(this.order.deliverTime);
    if (nowDate.getHours() === date.getHours()) {
      this.order.deliverTime -= nowDate.getMinutes() - date.getMinutes();
    } else if (nowDate.getHours() > date.getHours()) {
      console.log('usao');
      this.order.deliverTime -= 60 - date.getMinutes();
      this.order.deliverTime -= nowDate.getMinutes();
    }
    if (this.order.deliverTime <= 0) {
      this.router.navigateByUrl('/neworders');
    }
    console.log('preostalo vrijeme: ', this.order.deliverTime);
    this.timer.minutes = this.order.deliverTime;
    //while (true) {
    // this.subscription = interval(1000).subscribe((x) => {
    //   if (this.timer.seconds - 1 <= -1) {
    //     this.timer.seconds = 59;
    //     this.timer.minutes -= 1;
    //   }
    //   if (this.timer.minutes === 0) {
    //     console.log('kraj');
    //   }
    // });

    let interval = setInterval(() => {
      if (this.timer.seconds > 0) {
        this.timer.seconds--;
      } else {
        if (this.timer.minutes === 0 && this.timer.seconds === 0) {
          clearInterval(interval);
          this.toastr.success('Delivery finished.');
          this.router.navigateByUrl('/user');
        } else {
          this.timer.seconds = 59;
          this.timer.minutes--;
        }
      }
    }, 100);
  }
  // }

  // this.everySecond.subscribe(() => {
  //   if (this.timer.seconds - 1 <= -1) {
  //     this.timer.seconds = 59;
  //     this.timer.minutes -= 1;
  //   }
  //   if (this.timer.minutes === 0) {
  //     console.log('kraj');
  //     return;
  //   }
  // });

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {
    let nav: Navigation | null = this.router.getCurrentNavigation();
    if (nav !== null) {
      if (nav.extras && nav.extras.state && nav.extras.state['order']) {
        this.order = nav.extras.state['order'] as Order;
        console.log(this.order);
        this.startTimer();
      }
    }
  }

  ngOnInit(): void {
    //this.startTimer();
    // this.orderService.getcurrentOrder().subscribe(          ovo ne treba
    //   (data: Order) => {
    //     console.log(data);
    //     if (data === null) {
    //       this.toastr.error('Nema porudzbine koju ste prihvatili.');
    //     } else {
    //       this.order = data;
    //       this.startTimer();
    //     }
    //   },
    //   (error) => {
    //     this.toastr.error('Desila se neka greska.');
    //   }
    // );
  }
}
