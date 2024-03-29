import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
// import { Registration } from './models/registration.model';
import { User } from '../../Models/User';
import { Token } from '../../Models/Token';
import { getToken, getTokenType } from './TokenService';
import { Order } from 'src/app/Models/Order';
import { AccountStatus } from 'src/app/Models/AccountStatus';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(login: User): Observable<Token> {
    return this.http.post<Token>(
      environment.serverURL + '/api/user/login',
      login
    );
  }

  register(registration: User): Observable<User> {
    console.log('servis ', registration);
    return this.http.post<User>(
      environment.serverURL + '/api/user/registration',
      registration
    );
  }

  updateProfile(user: User): Observable<User> {
    const header = new HttpHeaders().set(
      'Authorization',
      getTokenType() + getToken()
    );
    const headers = { headers: header };
    return this.http.post<User>(
      environment.serverURL + '/api/user/updateProfile',
      user,
      headers
    );
  }
  verificateUser(id: number, accountStatus: string): Observable<User> {
    const header = new HttpHeaders().set(
      'Authorization',
      getTokenType() + getToken()
    );
    const headers = { headers: header };
    return this.http.post<User>(
      environment.serverURL +
        '/api/user/verificateuser?accountStatus=' +
        accountStatus +
        '&id=' +
        id,
      headers
    );
  }
  getUsers(): Observable<User[]> {
    const token = getToken();
    return this.http.get<User[]>(environment.serverURL + '/api/user/getusers');
  }
  getProfile(): Observable<User> {
    const token = getToken();
    return this.http.get<User>(
      environment.serverURL + '/api/user/getProfile?token=' + token
    );
  }
  checkDeliverStatus(): Observable<Order> {
    const token = getToken();
    return this.http.get<Order>(
      environment.serverURL + '/api/user/checkdeliverstatus?token=' + token
    );
  }
}
