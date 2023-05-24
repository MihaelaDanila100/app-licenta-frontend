import { Injectable } from "@angular/core";
import { DashedLine, Line } from "../interfaces/line";
import { ShapesService } from "../shared/services/shapes.service";

@Injectable({
    providedIn:'root'
})
export class EdgesHelper { 
    
    constructor(private shapesService: ShapesService) { }

    public createEdge(pointer: any): any {
        let coords = [
            (pointer?.left || 0) + (pointer?.width || 0) / 2,
            (pointer?.top || 0) + (pointer?.height || 0) / 2,
            (pointer?.left || 0) + (pointer?.width || 0) / 2,
            (pointer?.top || 0) + (pointer?.height || 0) / 2
        ]
        let newLine: Line = {
            left: pointer?.left, 
            top: pointer?.top, 
            points: coords,
            strokeWidth: 2,
            stroke: 'black',
            showControls: false
        }
        let newEdge = this.shapesService.createLine(newLine);
        return newEdge;
    }

    public createEdgeWithCost(pointer: any): any {
        let coords = [
            (pointer?.left || 0) + (pointer?.width || 0) / 2,
            (pointer?.top || 0) + (pointer?.height || 0) / 2,
            (pointer?.left || 0) + (pointer?.width || 0) / 2,
            (pointer?.top || 0) + (pointer?.height || 0) / 2
        ]
        let newLine: Line = {
            left: pointer?.left, 
            top: pointer?.top, 
            points: coords,
            strokeWidth: 2,
            stroke: 'red',
            showControls: false
        }
        let newEdge = this.shapesService.createLine(newLine);
        return newEdge;
    }

    public createOrientedEdge(pointer: any): any {
        let coords = [
            (pointer?.left || 0) + (pointer?.width || 0) / 2,
            (pointer?.top || 0) + (pointer?.height || 0) / 2,
            (pointer?.left || 0) + (pointer?.width || 0) / 2,
            (pointer?.top || 0) + (pointer?.height || 0) / 2
        ]
        let newLine: Line = {
            left: pointer?.left, 
            top: pointer?.top, 
            points: coords,
            strokeWidth: 2,
            stroke: 'black',
            showControls: false
        }
        let newEdge = this.shapesService.createArrow(newLine);
        return newEdge;
    }

    public createDashedEdge(pointer: any): any {
        let coords = [
            (pointer?.left || 0) + (pointer?.width || 0) / 2,
            (pointer?.top || 0) + (pointer?.height || 0) / 2,
            (pointer?.left || 0) + (pointer?.width || 0) / 2,
            (pointer?.top || 0) + (pointer?.height || 0) / 2
        ]
        let newLine: DashedLine = {
            left: pointer?.left, 
            top: pointer?.top, 
            points: coords,
            strokeWidth: 2,
            stroke: 'black',
            showControls: false,
            dashes: [5, 5]
        }
        let newEdge = this.shapesService.createDashedLine(newLine);
        return newEdge;
    }
}