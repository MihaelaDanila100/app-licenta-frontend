import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { ColorService } from "../shared/services/color.service";

@Injectable({
    providedIn:'root'
})
export class ShapeActionsHelper { 

    private isFillSync: boolean = false;
    private subscriptions: Subscription = new Subscription();
    
    constructor(private colorService: ColorService) {
        this.colorService.syncColorFill.subscribe((res: boolean) => {
            this.isFillSync = res;
        });
    }

    public observeFillColor(shapeRef: any, fillColor: any): void {
        if(!shapeRef._objects) shapeRef.set('fill', fillColor);
        else shapeRef._objects[0].set('fill', fillColor);
    }

    public observeFillSyncColor(shapeRef: any, fillColor: any): void {
        if(this.isFillSync) {
            if(!shapeRef._objects) shapeRef.set('fill', fillColor);
            else shapeRef._objects[0].set('fill', fillColor);
        }
    }
    
}
