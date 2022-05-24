import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/Models/Order';
import { OrderService } from 'src/app/Services/UserServices/OrderServices';
import { ProductService } from 'src/app/Services/UserServices/ProductServices';

@Component({
  selector: 'app-neworders',
  templateUrl: './neworders.component.html',
  styleUrls: ['./neworders.component.css'],
})
export class NewordersComponent implements OnInit {
  orders: Order[] = [];

  sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  onAccept(id: number) {
    this.orderService.acceptOrder(id).subscribe(
      (data: Order) => {
        if (data === null) {
          this.toastr.error('Neuspjesno prihvatanje.');
        } else {
          console.log('usao1');

          //this.sleep(3000).then(() => {
          console.log('usao');
          this.router.navigate(['/currentdel'], { state: { order: data } });
          //});
        }
      },
      (error) => {
        this.toastr.error('Desila se neka greska.');
      }
    );
    console.log(id);
  }

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.orderService.getNewOrders().subscribe(
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
