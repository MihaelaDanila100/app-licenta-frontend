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
            this.nodesList.push(JSON.parse(JSON.stringify(node)));
            this.adjacency_list.push([]);
            this.adjacency_list.forEach((line) => line.push(false));
        });
    }

    public addNewNode(node: Node): void {
        this.numberOfNodes++;
        this.nodesList.push(JSON.parse(JSON.stringify(node)));
        if(this.numberOfNodes > 1) this.adjacency_list.forEach((list) => list.push(false));
        if(this.numberOfNodes > 1) this.adjacency_list.push(Array<any>(this.numberOfNodes).fill(false));
        else this.adjacency_list = [Array<any>(this.numberOfNodes).fill(false)];
        console.log("The new graph is ", this.numberOfNodes, this.isOriented, this.adjacency_list, this.nodesList)
    }

}