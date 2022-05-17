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
import { Order } from 'src/app/Models/Order';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  addOrder(order: Order): Observable<Order> {
    console.log(order);
    const header = new HttpHeaders().set(
      'Authorization',
      getTokenType() + getToken()
    );
    const headers = { headers: header };
    return this.http.post<Order>(
      environment.serverURL + '/api/order/addorder',
      order,
      headers
    );
  }

  getUserOrders(): Observable<Order[]> {
    const token = getToken();
    return this.http.get<Order[]>(
      environment.serverURL + '/api/order/getuserorders?token=' + token
    );
  }

  getNewOrders(): Observable<Order[]> {
    const header = new HttpHeaders().set(
      'Authorization',
      getTokenType() + getToken()
    );
    const headers = { headers: header };
    return this.http.post<Order[]>(
      environment.serverURL + '/api/order/getneworders',
      headers
    );
  }

  acceptOrder(id: number): Observable<Order> {
    const token = getToken();
    return this.http.get<Order>(
      environment.serverURL +
        '/api/order/acceptorder?id=' +
        id +
        '&token=' +
        token
    );
  }
}
