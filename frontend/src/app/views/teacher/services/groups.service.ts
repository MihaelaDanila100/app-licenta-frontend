import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../interfaces/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private url: string = `${environment.API_BASE}/Groups`

  constructor(private http: HttpClient) { }

  public getAllGroups(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  public editGroup(group: Group): Observable<any> {
    let body = {
      name: group.name
    };
    return this.http.put(`${this.url}/${group.id}`, body);
  }
}
