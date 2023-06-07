import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private url: string = `${environment.API_BASE}/Groups`

  constructor(private http: HttpClient) { }

  public getAllGroups(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
}
