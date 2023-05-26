import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Edge } from 'src/app/entities/edge';
import { Graph } from 'src/app/entities/graph';
import { Node } from 'src/app/entities/node';
import { fabric } from 'fabric';

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

  public copyGraphJSON(graph: Graph): any {
    let graphCopy: any = {}
    graphCopy.numberOfNodes = graph.numberOfNodes;
    graphCopy.isOriented = graph.isOriented;
    graphCopy.nodesList = graph.nodesList.map((node) => this.copyNodeJSON(node));
    graphCopy.adjacency_list = graph.adjacency_list.map((edgesList) => {
      return edgesList.map((edge: any) => {
        if(edge != false) return this.copyEdgeRepresentationJSON(edge);
        return false;
      });
    });
    console.log("EDGES LIST ", graphCopy)
    return JSON.stringify(graphCopy);
  }

  private copyNodeJSON(node: Node): any {
    let nodeRepresentation = JSON.stringify(`<svg>${node.getNodeDrawing().toSVG()}</svg>`)
    let newNode: any = {
      label: node.getNodeLabel(),
      representation: nodeRepresentation,
      indexInGraph: node.getIndexOfNode()
    }
    return newNode;
  }

  private copyEdgeRepresentationJSON(edge: any): any {
    return JSON.stringify(`<svg>${edge.toSVG()}</svg>`)
  }
}
