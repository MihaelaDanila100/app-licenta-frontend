import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Node } from 'src/app/entities/node';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private addEdgeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  addEdgeObs = this.addEdgeSbj.asObservable();
  private newNodesSbj: Subject<Node> = new Subject<Node>();
  newNodesObs = this.newNodesSbj.asObservable();

  constructor() { }

  public toggleEdges(): void {
    this.addEdgeSbj.next(!this.addEdgeSbj.value);
  }

  public addNode(newNode: Node): void {
    this.newNodesSbj.next(newNode);
  }
}
