import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/Order';
import { Product } from 'src/app/Models/Product';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  orders: Order[] = [];
  constructor() {}

  ngOnInit(): void {
    // for (let i = 0; i < 10; i++) {
    //   let order = new Order();
    //   order.address = 'cirpanova' + i;
    //   order.price = i + 10;
    //   let p1 = new Product();
    //   p1.name = 'sendvic';
    //   let p2 = new Product();
    //   p2.name = 'sendvic';
    //   let p3 = new Product();
    //   p3.name = 'sendvic';
    //   let p4 = new Product();
    //   p4.name = 'sendvic';
    //   order.products.push(p1);
    //   order.products.push(p2);
    //   order.products.push(p3);
    //   order.products.push(p4);
    //   this.orders.push(order);
    // }
  }
}
