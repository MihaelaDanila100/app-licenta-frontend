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
  private graphGraphicObjects: Subject<any> = new Subject<any>();
  public currentGraphRef = this.graphRefSbj.asObservable();
  public currentNodeRef = this.graphNodesRefsSbj.asObservable();
  public currentGraphicObjects = this.graphGraphicObjects.asObservable();

  constructor() { }

  public addNewGraph(graphRef: Graph): void {
    this.graphRefSbj.next(graphRef);
  }

  public addNewNode(newNode: Node): void {
    this.graphNodesRefsSbj.next(newNode);
    this.graphGraphicObjects.next(newNode.getNodeDrawing());
  }

  public selectNodeRepresentation(node: fabric.Group): void {
    this.graphGraphicObjects.next(node);
  }
}
