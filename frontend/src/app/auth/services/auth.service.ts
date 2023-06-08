import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../interfaces/login-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { KeyConstants } from 'src/app/shared/data/constants/key-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.API_BASE}/Auth`;

  constructor(private http: HttpClient) { }

  public getToken(loginUser: LoginUser): Observable<any> {
    let body = {
      email: loginUser.email,
      username: "test",
      password: loginUser.password
    };
    // return this.http.post(`${this.url}/Login`, body);
    return of("eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0ZWFjaGVyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoidGVhY2hlciIsImV4cCI6MTY4NjE0MzI1MywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIzNiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMzYifQ.ZDubEUpRFUnm2JbNi_3AWWbF-tbuIJlS0etqeXLUOyghL5JRFyaEeJcojH8bOPmX9PQhuqbZd0aM2P46kKLWYQ");
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
