import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { getToken, getTokenType } from './UserServices/TokenService';
@Injectable({
  providedIn: 'root',
})
export class TokeninterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: getTokenType() + getToken(),
      },
    });
    return next.handle(tokenizedReq);
  }
}
