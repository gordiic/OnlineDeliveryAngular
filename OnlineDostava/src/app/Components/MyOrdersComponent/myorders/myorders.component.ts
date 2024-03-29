import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/Models/Order';
import { Product } from 'src/app/Models/Product';
import { OrderService } from 'src/app/Services/UserServices/OrderServices';
import { ProductService } from 'src/app/Services/UserServices/ProductServices';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  orders: Order[] = [];
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe(
      (data: Order[]) => {
        console.log(data);
        if (data === null) {
          this.toastr.error('Nema porudzbina.');
        } else {
          for (let i = 0; i < data.length; i++) {
            this.orders.push(data[i]);
          }
        }
      },
      (error) => {
        this.toastr.error('Desila se neka greska.');
      }
    );
  }
}
