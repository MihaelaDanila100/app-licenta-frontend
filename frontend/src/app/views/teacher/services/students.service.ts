import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private url = `${environment.API_BASE}/Students`;

  constructor(private http: HttpClient) { }

  public getAllStudents(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  public getStudentsForGroup(groupId: string): Observable<any> {
    return this.http.get(`${this.url}/for-group?groupId=${groupId}`);
  }
}
