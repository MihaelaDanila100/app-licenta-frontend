import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { ColorService } from "../shared/services/color.service";

@Injectable({
    providedIn:'root'
})
export class ShapeActionsHelper { 

    private isFillSync: boolean = false;
    private isStrokeSync: boolean = false;
    
    constructor(private colorService: ColorService) {
        this.colorService.syncColorFill.subscribe((res: boolean) => {
            this.isFillSync = res;
        });
        this.colorService.syncColorStroke.subscribe((res) => {
            this.isStrokeSync = res;
        });
    }

    public observeFillColor(shapeRef: any, fillColor: any): void {
        if(!shapeRef._objects) shapeRef.set('fill', fillColor);
        else shapeRef._objects[0].set('fill', fillColor);
    }

    public observeFillSyncColor(shapeRef: any, fillColor: any): void {
        if(this.isFillSync) this.observeFillColor(shapeRef, fillColor);
    }

    public observeStrokeColor(shapeRef: any, strokeColor: any): void {
        if(!shapeRef._objects) shapeRef.set('stroke', strokeColor);
        else shapeRef._objects[0].set('stroke', strokeColor);
    }

    public observeStrokeSyncColor(shapeRef: any, strokeColor: any): void {
        if(this.isStrokeSync) this.observeStrokeColor(shapeRef, strokeColor);
    }
    
}
