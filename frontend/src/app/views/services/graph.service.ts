import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Graph } from 'src/app/entities/graph';
import { Node } from 'src/app/entities/node';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graphRefSbj: Subject<Graph> = new Subject<Graph>();
  private graphNodesRefsSbj: Subject<Node> = new Subject<Node>();
  public currentGraphRef = this.graphRefSbj.asObservable();
  public currentNodeRef = this.graphNodesRefsSbj.asObservable();

  constructor() { }

  public addNewGraph(graphRef: Graph): void {
    this.graphRefSbj.next(graphRef);
  }

  public addNewNode(newNode: Node): void {
    this.graphNodesRefsSbj.next(newNode);
  }
}
