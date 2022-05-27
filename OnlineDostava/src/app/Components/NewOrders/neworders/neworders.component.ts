import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/Models/Order';
import { OrderService } from 'src/app/Services/UserServices/OrderServices';
import { ProductService } from 'src/app/Services/UserServices/ProductServices';
import { UserService } from 'src/app/Services/UserServices/UserServices';

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
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.checkDeliverStatus().subscribe(
      (data: Order) => {
        if (data === null) {
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
        } else {
          console.log('usao');
          this.router.navigate(['/currentdel'], {
            state: { order: data },
          });
        }
      },
      (error) => {
        this.toastr.error('Desila se neka greska.');
      }
    );
  }
}
