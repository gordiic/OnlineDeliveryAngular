import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/Services/UserServices/ProductServices';
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
    console.log(this.products);
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
      //this.products.unshift(product);

      console.log('product: ' + product.ingredients);
      this.productService.addProduct(product).subscribe(
        (data: Product) => {
          if (data === null) {
            this.toastr.error('Proizvod nije dodat.');
          } else {
            console.log(data);
            this.products.unshift(product);
            this.addProductForm.controls['name'].setValue('');
            this.addProductForm.controls['ingredients'].setValue('');
            this.addProductForm.controls['price'].setValue('');
          }
        },
        (error) => {
          this.toastr.error('Nema proizvoda');
        }
      );
      this.alertError = '';
    } else {
      this.alertError = 'Popunite pravilno sva polja za unos novog proizvoda.';
    }
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        if (data === null) {
          this.toastr.error('Nema proizvoda dodatih.');
        } else {
          console.log(data)
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
