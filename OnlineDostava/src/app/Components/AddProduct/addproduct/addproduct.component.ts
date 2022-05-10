import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/Product';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  alertError: string = '';
  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    ingredients: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
  products: Product[] = [];

  onAddProduct() {
    if (this.addProductForm.valid) {
      let product = new Product();
      product.name = this.addProductForm.controls['name'].value;
      // let ingreds =
      //   this.addProductForm.controls['ingredients'].value.split(' ');
      // for (let i of ingreds) {
      //   product.ingredients.push(i);
      // }
      product.ingredients = this.addProductForm.controls['ingredients'].value;
      product.price = this.addProductForm.controls['price'].value;
      this.products.unshift(product);

      console.log('product: ' + product.ingredients);
      this.alertError = '';
    } else {
      this.alertError = 'Popunite pravilno sva polja za unos novog proizvoda.';
    }
  }

  constructor(private router: Router) {}

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
