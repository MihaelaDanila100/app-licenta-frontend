import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../interfaces/login-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { KeyConstants } from 'src/app/shared/data/constants/key-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.API_BASE}/Auth`;

  constructor(private http: HttpClient) { }

  public getToken(loginUser: LoginUser) {
    let body = {
      email: loginUser.email,
      password: loginUser.password
    };
    const options = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      'accept': '*/*'
      })
    };
    return this.http.post(`${this.url}/Login`, body, options);
  }

  public setUserRole(role: string){
    localStorage.setItem(KeyConstants.ROLE_KEY, role);
  }

  public getUserRole() {
    return localStorage.getItem(KeyConstants.ROLE_KEY);
  }

  public loginInWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post(`${this.url}/LoginWithGoogle`, JSON.stringify(credentials), {headers: header});
  }
}
