import { Node } from "./node";
import { fabric } from 'fabric';

export class Edge {

    private representation!: fabric.Line;
    private additionalSymbolsToRepresentation!: any;
    private leftNode!: Node;
    private rightNode!: Node;

    constructor(representation: fabric.Line, leftNode?: Node, rightNode?: Node) {
        this.representation = representation;
        if(leftNode) this.leftNode = leftNode;
        if(rightNode) this.rightNode = rightNode;
    }

    public setLeftNode(leftNode: Node): void {
        this.leftNode = leftNode;
    }

    public setRightNode(rightNode: Node): void {
        this.rightNode = rightNode;
    }

    public getLeftNode(): Node {
        return this.leftNode;
    }

    public getRightNode(): Node {
        return this.rightNode;
    }

    public getLine(): any {
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
        if(this.additionalSymbolsToRepresentation) this.updateSymbol();
    }

    private updateSymbol(): void {
        console.log("reprrr ", this.additionalSymbolsToRepresentation)
        this.additionalSymbolsToRepresentation.set('left', (this.representation?.left || 0) + (this.representation?.width || 0) / 2)
        this.additionalSymbolsToRepresentation.set('top', (this.representation?.top || 0) + (this.representation?.height || 0) / 2)
    } 

    public setAdditionalSymbols(symbol: fabric.Object): void {
        this.additionalSymbolsToRepresentation = symbol;
    }
    public getAdditionalSymbols(): any {
        return this.additionalSymbolsToRepresentation;
    }

}