import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

// import { Registration } from './models/registration.model';
import { User } from '../../Models/User';
import { Token } from '../../Models/Token';
import { Product } from 'src/app/Models/Product';
import { getToken, getTokenType } from './TokenService';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.serverURL + '/api/product/getproducts'
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      environment.serverURL + '/api/product/addproduct',
      product
    );
  }
}
