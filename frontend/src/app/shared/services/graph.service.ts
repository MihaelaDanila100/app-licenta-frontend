import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Edge } from 'src/app/entities/edge';
import { Node } from 'src/app/entities/node';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private addEdgeSbj: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  addEdgeObs = this.addEdgeSbj.asObservable();
  private newNodesSbj: Subject<Node> = new Subject<Node>();
  newNodesObs = this.newNodesSbj.asObservable();
  private newEdgeSbj: Subject<Edge> = new Subject<Edge>();
  newEdgeObs = this.newEdgeSbj.asObservable();

  constructor() { }

  public toggleEdges(value?: any): void {
    if(value){
      if(this.addEdgeSbj.value === value) this.addEdgeSbj.next(false);
      else this.addEdgeSbj.next(value);
    } else this.addEdgeSbj.next(false);
  }

  public addNode(newNode: Node): void {
    this.newNodesSbj.next(newNode);
  }

  public addEdge(edge: Edge): void {
    this.newEdgeSbj.next(edge);
  }
}
