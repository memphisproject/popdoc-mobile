import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor( private store: Store<fromApp.AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authData: {
        id: string,
        name: string,
        token: string,
        email: string
    } = JSON.parse(localStorage.getItem('authData'));

    if (authData && authData.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authData.token}`
        }
      });
    }

    return next.handle(request);
  }
}
