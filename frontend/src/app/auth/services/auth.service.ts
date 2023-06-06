import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../interfaces/login-user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.API_BASE}/Auth`;

  constructor(private http: HttpClient) { }

  public getToken(loginUser: LoginUser): Observable<any> {
    let body = {
      email: loginUser.email,
      password: loginUser.password
    };
    console.log("hellooo ", body)
    return this.http.post(`${this.url}/Login`, body);
  }
}
