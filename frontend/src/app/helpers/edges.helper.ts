import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Edge } from "../entities/edge";
import { Line } from 'src/app/interfaces/line';
import { ShapesService } from 'src/app/shared/services/shapes.service';

@Injectable({
    providedIn:'root'
})
export class EdgesHelper { 

    constructor(private shapesService: ShapesService) { }

    private isNewEdge: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isNewEdgeObs = this.isNewEdge.asObservable();
    private currentNewEdge!: Edge | null;

    public createNewEdge(newNode: any, canvasRef: fabric.Canvas) {
        if(!this.currentNewEdge) {
            this.isNewEdge.next(true);
            this.currentNewEdge = new Edge(this.createEdge(newNode, canvasRef));
        } 
    }

    public updateEdgeOpacity() {
        this.currentNewEdge?.getLine().set('opacity', 1);
    }

    public finishEdge(object: any, canvasRef: fabric.Canvas) {    
        let coords = [
            (object?.left || 0) + (object?.width || 0) / 2,
            (object?.top || 0) + (object?.height || 0) / 2
        ]
        this.currentNewEdge?.getLine().set({
            x2: coords[0],
            y2: coords[1]
        });
        canvasRef.renderAll();
        this.currentNewEdge = null;
        this.isNewEdge.next(false);
    }

    public moveEdge(event: any, canvasRef: fabric.Canvas) {
        let coordsPoint = canvasRef.getPointer(event.e);
        this.currentNewEdge?.getLine().set({
            x2: coordsPoint.x,
            y2: coordsPoint.y
        });
    }

    public moveNodeWithEdge(event: any): void {
        console.log("ne muatam simultan")
    }

    public creatingNewEdge(): any {
        return this.currentNewEdge;
    }

    private createEdge(object: any, whiteBoardRef: fabric.Canvas): any {
      let coords = [
        (object?.left || 0) + (object?.width || 0) / 2,
        (object?.top || 0) + (object?.height || 0) / 2,
        (object?.left || 0) + (object?.width || 0) / 2,
        (object?.top || 0) + (object?.height || 0) / 2
      ]
      let newLine: Line = {
        left: object?.left, 
        top: object?.top, 
        points: coords,
        strokeWidth: 2,
        stroke: 'black',
        opacity: 0.7,
        showControls: false
      }
      let newEdge = this.shapesService.createLine(newLine);
      whiteBoardRef.add(newEdge);
      newEdge.sendToBack();
      return newEdge;
    }

}