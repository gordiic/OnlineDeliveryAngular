import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/Order';
import { Product } from 'src/app/Models/Product';
import { deliverPrice } from 'src/app/Models/DeliverPrice';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderProduct } from 'src/app/Models/OrderProduct';
import { ProductService } from 'src/app/Services/UserServices/ProductServices';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/Services/UserServices/OrderServices';
@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css'],
})
export class NeworderComponent implements OnInit {
  deliverPrice: number = deliverPrice;
  alertError: string = '';
  orderForm = new FormGroup({
    address: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });
  products: Product[] = [];
  order: Order = new Order();

  confirmOrder() {
    if (this.orderForm.valid) {
      if (this.order.products.length > 0) {
        this.order.address = this.orderForm.controls['address'].value;
        this.order.comment = this.orderForm.controls['comment'].value;
        this.order.price += deliverPrice;
        this.orderService.addOrder(this.order).subscribe(
          (data: Order) => {
            console.log(data);
            if (data === null) {
              this.toastr.error('Neuspjesno poslata porudzbina.');
            } else {
              this.toastr.success('Porudzbina je na cekanju.');
            }
          },
          (error) => {
            this.toastr.error('Desila se neka greska pri konekciji.');
          }
        );
        this.orderForm.controls['address'].setValue('');
        this.orderForm.controls['comment'].setValue('');
        this.order = new Order();
        this.alertError = '';
      } else {
        this.alertError = 'Morate nesto poruciti.';
      }
    } else {
      this.alertError = 'Popunite adresu i komentar.';
    }
    //poslati porudzbinu serveru
    //console.log(this.order.ToString(this.order));
  }

  addProduct(id: Number) {
    console.log(id);
    for (let j = 0; j < this.order.products.length; j++) {
      if (this.order.products[j].id === id) {
        return;
      }
    }
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        let p = new OrderProduct();
        p.id = this.products[i].id;
        p.amount = 1;
        p.ingredients = this.products[i].ingredients;
        p.name = this.products[i].name;
        p.price = this.products[i].price;
        this.order.products.unshift(p);
        this.order.price += p.price;
      }
    }
  }

  decAmount(id: number) {
    for (let i = 0; i < this.order.products.length; i++) {
      if (this.order.products[i].id === id) {
        if (this.order.products[i].amount === 1) {
          this.order.price -= this.order.products[i].price;
          this.order.products.splice(i, 1);
          return;
        } else {
          this.order.products[i].amount = this.order.products[i].amount - 1;
          this.order.price -= this.order.products[i].price;

          return;
        }
      }
    }
  }
  incAmount(id: Number) {
    for (let i = 0; i < this.order.products.length; i++) {
      if (this.order.products[i].id === id) {
        this.order.products[i].amount = this.order.products[i].amount + 1;
        this.order.price = this.order.price + this.order.products[i].price;

        return;
      }
    }
  }
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        console.log(data);
        if (data === null) {
          this.toastr.error('Nema proizvoda na stanju.');
        } else {
          for (let i = 0; i < data.length; i++) {
            this.products.push(data[i]);
          }
        }
      },
      (error) => {
        this.toastr.error('Desila se neka greska.');
      }
    );
  }
}
