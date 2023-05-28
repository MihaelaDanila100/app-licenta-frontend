import { Injectable } from "@angular/core";
import { GraphService } from "../shared/services/graph.service";
import { ColorService } from "../shared/services/color.service";
import { map } from "rxjs";
import { ShapeActionsService } from "../shared/services/shape-actions.service";
import { ShapeActionsHelper } from "./shape-actions.helper";

@Injectable({
    providedIn:'root'
})
export class GraphHelper {

    constructor(private graphService: GraphService,
        private colorService: ColorService,
        private shapeActionsService: ShapeActionsService,
        private shapeActionsHelper: ShapeActionsHelper) {
        
            this.shapeActionsService.toggleColorsObs.subscribe((res) => {
              this.isColorMode = res;
            });
        }
    
    private isColorMode: boolean = false;

    public colorFillRequest = (node: any) => {
        return this.colorService.colorFill.pipe(
            map((fillColor: any) => {
              node.getNodeDrawing().on("mousedown", () => {
                if(this.isColorMode) {
                  this.shapeActionsHelper.observeFillColor(node.getNodeDrawing(), fillColor);
                  this.shapeActionsService.triggerActionOnCanvas();
                }
              });
              if(this.isColorMode) {
                this.shapeActionsHelper.observeFillSyncColor(node.getNodeDrawing(), fillColor);
                this.shapeActionsService.triggerActionOnCanvas();
              }
            })
          );
    } 

}