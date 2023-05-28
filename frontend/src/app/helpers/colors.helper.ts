import { Injectable } from "@angular/core";
import { ColorService } from "../shared/services/color.service";
import { map } from "rxjs";
import { ShapeActionsService } from "../shared/services/shape-actions.service";
import { ShapeActionsHelper } from "./shape-actions.helper";

@Injectable({
    providedIn:'root'
})
export class ColorsHelper {
    
    private isColorMode: boolean = false;

    constructor(private colorService: ColorService,
        private shapeActionsService: ShapeActionsService,
        private shapeActionsHelper: ShapeActionsHelper) { 

        this.shapeActionsService.toggleColorsObs.subscribe((res) => {
          this.isColorMode = res;
        });

    }

    public colorFillRequest = (newShape: any) => {
        return this.colorService.colorFill.pipe(
            map((fillColor: any) => {
              newShape.on("mousedown", () => {
                if(this.isColorMode) {
                  this.shapeActionsHelper.observeFillColor(newShape, fillColor);
                  this.shapeActionsService.triggerActionOnCanvas();
                }
              });
              if(this.isColorMode) { 
                this.shapeActionsHelper.observeFillSyncColor(newShape, fillColor);
                this.shapeActionsService.triggerActionOnCanvas();
              }
            })
          );
    } 

    public colorStrokeRequest = (newShape: any) => {
        return this.colorService.colorStroke.pipe(
            map((strokeColor: any) => {
              newShape.on("mousedown", () => {
                if(this.isColorMode) this.shapeActionsHelper.observeStrokeColor(newShape, strokeColor)
              });
              if(this.isColorMode) {
                this.shapeActionsHelper.observeStrokeSyncColor(newShape, strokeColor);
                this.shapeActionsService.triggerActionOnCanvas();
              }
            })
          );
    } 

}