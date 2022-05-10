import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/Order';
import { Product } from 'src/app/Models/Product';
import { deliverPrice } from 'src/app/Models/DeliverPrice';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor() {}

  confirmOrder() {
    if (this.orderForm.valid) {
      if (this.order.products.length > 0) {
        this.alertError = '';
      } else {
        this.alertError = 'Morate nesto poruciti.';
      }
    } else {
      this.alertError = 'Popunite adresu i komentar.';
    }
    //poslati porudzbinu serveru
    console.log(this.order.ToString(this.order));
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
        let p = new Product();
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

  ngOnInit(): void {
    // for (let i = 0; i < 10; i++) {
    //   var p: Product = new Product();
    //   p.name = 'ime' + i;
    //   p.price = i;
    //   p.ingredients.push('luk');
    //   p.ingredients.push('paprika');
    //   p.ingredients.push('meso');
    //   p.ingredients.push('kajmak');
    //   p.id = i;
    //   this.products.push(p);
    // }
  }
}
