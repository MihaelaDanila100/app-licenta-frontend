import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { KeyConstants } from 'src/app/shared/data/constants/key-constants';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!this.tokenService.getToken()) {
      return next.handle(request);  
    }
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.tokenService.getToken()
    });
    const clone = request.clone({
      headers: headers
    });
    return next.handle(clone).pipe(
      catchError(err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            return this.handleUnauthorized(request, next);
          }
          return this.handleError(err);
        } else {
          throw new Observable<HttpErrorResponse>(err);
        }
      })
    );
  }

  public handleUnauthorized(req: HttpRequest<any>, next: HttpHandler): Observable<any>{
    this.router.navigateByUrl('auth/not-authenticated');
    return new Observable<HttpErrorResponse>();
  }

  public handleError(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if(error.error instanceof ErrorEvent) {
      console.log("An error occured ", error.error.message);
    } else {
      if(error.status == 403) {
        this.router.navigateByUrl('auth/not-authorized');
        return throwError("Not authorized!");
      }
      if(error.status == 404) {
        this.router.navigateByUrl('auth/not-found');
        return throwError("Could not find resource!");
      }
    }
    return throwError(error.message);
  }
}
