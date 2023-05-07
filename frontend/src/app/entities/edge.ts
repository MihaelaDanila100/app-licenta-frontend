import { fabric } from 'fabric';

export class Edge {

    private representation!: fabric.Line;

    constructor(representation: fabric.Line) {
        this.representation = representation;
    }

    public getLine(): fabric.Line {
        return this.representation;
    }

    public setLineCoords(coords: any, leftNode: boolean): any {
        if(!leftNode) {
            this.representation.set({
                x2: coords.x,
                y2: coords.y
            });
        } else {
            this.representation.set({
                x1: coords.x,
                y1: coords.y
            });
        }
    }

}