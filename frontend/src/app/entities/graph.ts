import { Edge } from "./edge";
import { Node } from "./node";

export class Graph {

    public numberOfNodes: number = 0;
    public isOriented: boolean = false;
    public adjacency_list: any[][] = [];
    public nodesList: Node[] = [];
    
    constructor(nodesList: Node[], isOriented?: boolean) { 
        if(isOriented) this.isOriented = isOriented;
        this.numberOfNodes = nodesList.length;
        nodesList.forEach((node) => {
            this.nodesList.push(node);
            this.adjacency_list.push([]);
            this.adjacency_list.forEach((line) => line.push(false));
        });
    }    
    
    public addNewNode(node: Node): void {
        console.log("nodeeee ", node)
        this.numberOfNodes++;
        this.nodesList.push(node);
        if(this.numberOfNodes > 1) this.adjacency_list.forEach((list) => list.push(false));
        if(this.numberOfNodes > 1) this.adjacency_list.push(Array<any>(this.numberOfNodes).fill(false));
        else this.adjacency_list = [Array<any>(this.numberOfNodes).fill(false)];
        console.log("The new graph is ", this.numberOfNodes, this.isOriented, this.adjacency_list, this.nodesList)
    }

    public addNewEdge(edge: Edge): void {
        console.log("edgeee === > ", edge)
        this.adjacency_list[edge.getLeftNode().getIndexOfNode()][edge.getRightNode().getIndexOfNode()] = JSON.parse(JSON.stringify(edge.getLine()));
        if(!this.isOriented) this.adjacency_list[edge.getRightNode().getIndexOfNode()][edge.getLeftNode().getIndexOfNode()] = JSON.parse(JSON.stringify(edge.getLine()));
        console.log("The new graph is ", this.numberOfNodes, this.isOriented, this.adjacency_list, this.nodesList)
    }

    public getIndexForNodeDrawing(node: fabric.Object): number {
        return this.nodesList.findIndex((item) => item.getNodeDrawing() == node);
    }

    public getNodeRefAt(index: number): Node {
        return this.nodesList[index];
    }
}