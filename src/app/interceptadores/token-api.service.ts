import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenApiService implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenService.token) {
      return next.handle(this.addToken(request, this.tokenService.token));
    }
    return next.handle(request);
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
