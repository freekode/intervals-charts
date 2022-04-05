import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable()
export class IntervalsAuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addBasicAuth(request));
  }

  private addBasicAuth(request: HttpRequest<unknown>) {
    var token = btoa(`${environment.intervalsAuth.login}:${environment.intervalsAuth.password}`)

    return request.clone({
      setHeaders: {
        Authorization: `Basic ${token}`
      }
    })
  }
}
