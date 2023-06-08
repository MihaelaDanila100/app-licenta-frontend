import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { fabric } from 'fabric';
import { Node } from 'src/app/entities/node';
import { Graph } from 'src/app/entities/graph';
import { ActiveShapesService } from './active-shapes.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private exportFileSbj: Subject<any> = new Subject<any>();
  public exportFileObs = this.exportFileSbj.asObservable();
  private filesSbj: Subject<any> = new Subject<any>();
  public filesObs = this.filesSbj.asObservable();
  public destoryGraphRelatedObjects$: Subject<void> = new Subject<void>();

  constructor(private activeShapesService: ActiveShapesService) { }

  public updateExportFile(fileMode: string) {
    this.exportFileSbj.next(fileMode);
  }

  public updateImportedFile(file: any) {
    this.filesSbj.next(file);
  }

  public uploadGraphFromJSON(fileString: any) {
    let uploadedFile = JSON.parse(fileString);
    let nodesNumber = uploadedFile.numberOfNodes;
    let isOriented = uploadedFile.isOriented;
    let nodesList: Node[] = [];
    let adjacencyList: any[] = [];
    uploadedFile.nodesList.forEach((node: any) => {
      let representationString = JSON.parse(node.representation)
      fabric.loadSVGFromString(representationString, (objects, options) => {
        let nodeRepresentation: any = fabric.util.groupSVGElements(objects, options);
        nodesList.push(new Node(node.label, 0, nodeRepresentation, node.indexInGraph))
      })
    });
    uploadedFile.adjacency_list.forEach((edgesList: any[]) => {
      let edgeListCopy: any[] = [];
      edgesList.forEach((edge) => {
        if(edge == false) edgeListCopy.push(false);
        else {
          let edgeRepresentationString = JSON.parse(edge)
          fabric.loadSVGFromString(edgeRepresentationString, (objects, options) => {
            let edgeRepresentation: any = fabric.util.groupSVGElements(objects, options);
            edgeListCopy.push(edgeRepresentation);
          });
        }
      });
      adjacencyList.push(edgeListCopy);
    });
    let constructedGraph = new Graph(nodesList, isOriented)
    constructedGraph.updateAdjacencyList(adjacencyList)
    return constructedGraph;
  }

  public uploadFileFromSVG(canvasSVG: string): void {
    fabric.loadSVGFromString(canvasSVG, (results) => {
      console.log("please ", results)
      results.forEach((canvasObject) => {
        this.activeShapesService.addShapeToWhiteboard(canvasObject);
      })
    });
  }

  public killNonGraphObjects(): void {
    this.destoryGraphRelatedObjects$.next();
  }
}
