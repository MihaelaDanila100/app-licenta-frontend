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
        this.numberOfNodes++;
        this.nodesList.push(node);
        if(this.numberOfNodes > 1) this.adjacency_list.forEach((list) => list.push(false));
        if(this.numberOfNodes > 1) this.adjacency_list.push(Array<any>(this.numberOfNodes).fill(false));
        else this.adjacency_list = [Array<any>(this.numberOfNodes).fill(false)];
    }

    public addNewEdge(edge: Edge): void {
        console.log("adaug in matricea de adiacenta new edgeee === > ", edge)
        this.adjacency_list[edge.getLeftNode().getIndexOfNode()][edge.getRightNode().getIndexOfNode()] = edge.getLine();
        if(!this.isOriented) this.adjacency_list[edge.getRightNode().getIndexOfNode()][edge.getLeftNode().getIndexOfNode()] = edge.getLine();
        console.log("The new graph is ", this.numberOfNodes, this.isOriented, this.adjacency_list, this.nodesList)
    }

    public getIndexForNodeDrawing(node: fabric.Object): number {
        return this.nodesList.findIndex((item) => item.getNodeDrawing() == node);
    }

    public getNodeRefAt(index: number): Node {
        return this.nodesList[index];
    }

    public deleteNodeAt(nodeIndex: number): fabric.Line[] {
        let edgesList: fabric.Line[] = [];
        if(!this.isOriented) {
            this.adjacency_list[nodeIndex].forEach((line) => {
                if(line != false) edgesList.push(line)
            });
        }
        this.adjacency_list.splice(nodeIndex, 1);
        this.adjacency_list.forEach((list) => list.splice(nodeIndex, 1));
        this.nodesList.splice(nodeIndex, 1);
        this.numberOfNodes--;
        for(let i = nodeIndex; i < this.numberOfNodes; i++) {
            this.nodesList[i].decreaseNodeIndex();
        }
        return edgesList;
    }

    public updateAdjacencyList(newAdjacencyList: any[]) {
        this.adjacency_list = newAdjacencyList;
    }
}