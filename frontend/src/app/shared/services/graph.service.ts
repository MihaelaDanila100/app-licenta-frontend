import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private addEdgeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  addEdgeObs = this.addEdgeSbj.asObservable();

  constructor() { }

  public toggleEdges(): void {
    this.addEdgeSbj.next(!this.addEdgeSbj.value);
  }
}
