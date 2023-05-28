import { Injectable } from "@angular/core";
import { DashedLine, Line } from "../interfaces/line";
import { ShapesService } from "../shared/services/shapes.service";
import { Text } from "../interfaces/text";
import { Subject } from "rxjs";
import { ShapeActionsService } from "../shared/services/shape-actions.service";

@Injectable({
    providedIn:'root'
})
export class EdgesHelper { 
    
    constructor(private shapesService: ShapesService, 
        private shapeActionsService: ShapeActionsService) { }

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
            (pointer?.left || 0) + (pointer?.width || 0) / 2 + 30,
            (pointer?.top || 0) + (pointer?.height || 0) / 2 + 30
        ]
        let newLine: Line = {
            left: pointer?.left, 
            top: pointer?.top, 
            points: coords,
            strokeWidth: 2,
            stroke: 'black',
            showControls: false
        }
        let text: Text = {
            value: 'type here cost...',
            fontStyle: 'bodoni mt',
            left: (pointer?.left || 0) + (pointer?.width || 0) / 2,
            top: (pointer?.top || 0) + (pointer?.height || 0) / 2,
            showControls: false,
            fontSize: 14,
            fontWeight: 'normal',
            fill: 'black',
            opacity: 0.6,
            editable: true
        }
        let edgeText: any = this.shapesService.createText(text);
        edgeText.on("changed", () => {
            edgeText.set('fontSize', 20);
            edgeText.set('opacity', 1);
            edgeText.set('text', edgeText.text.replace("type here cost...",""))
            if(edgeText.text.trim() === "") {
                edgeText.set('text', "type here cost...")
                edgeText.set('fontSize', 14);
                edgeText.set('opacity', 0.6);
            }
            this.shapeActionsService.triggerActionOnCanvas();
        })
        return [this.shapesService.createLine(newLine), edgeText];
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
        return [this.shapesService.createLine(newLine), this.shapesService.createArrow(newLine)];
    }

    public updateOrientedEdge(pointer: any, oldEdge: any): any {
        let coords = [
            oldEdge.x1,
            oldEdge.y1,
            pointer.x,
            pointer.y
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

    public connectEdge(event: any, newEdge: any, coordsPoint: any): any {
      newEdge.set('opacity', 0.4);
      if(event.target) {
        newEdge.set({
          x2: (event.target.left || 0) + ((event.target.width || 0) / 2),
          y2: (event.target.top || 0) + ((event.target.height || 0) / 2)
        });
      } else {
        newEdge.set({
          x2: coordsPoint.x,
          y2: coordsPoint.y
        });
      }
      return newEdge;
    }

    public updateLabelOfCost(symbol: any, newEdge: any): any {
        symbol.set('left', (newEdge?.left || 0) + (newEdge?.width + 20 || 0) / 2)
        symbol.set('top', (newEdge?.top || 0) + (newEdge?.height || 0) / 2)
        return symbol;
    }

    public updateArrowHead(symbol: any, newEdge: any): any {
        symbol.set('left', (newEdge.left || 0) + (newEdge?.width || 0) + 10)
        symbol.set('top', (newEdge.top || 0) + (newEdge?.height || 0))
        return symbol;
    }
}