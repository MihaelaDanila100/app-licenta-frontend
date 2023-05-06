import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class MenuObservablesHelper { 

    private drawingEdgesModeSbj: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
    public drawingEdgesMode = this.drawingEdgesModeSbj.asObservable();

    constructor() {}

    public toggleEdgesMode(): void {
        this.drawingEdgesModeSbj.next(!this.drawingEdgesModeSbj.value);
    }

}