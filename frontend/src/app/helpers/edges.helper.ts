import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class EdgesHelper { 

    constructor() { }

    public createEdges(event: any) {
        console.log("eu acum voi crea o muchie ", event)
    }

    public updateEdgeOpacity(event: any) {
        console.log("eu acum voi actualizaopacitatea ", event)
    }

    public finishEdge(event: any) {
        console.log("eu acum voi finaliza muchia ", event)
    }

    public moveEdge(event: any) {
        console.log("eu acum contruiesc muchia ", event);
    }

}