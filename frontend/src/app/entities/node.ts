import { fabric } from 'fabric';
import { ShapesService } from '../shared/services/shapes.service';
import { Shapes } from '../shared/data/constants/shapes';

export class Node {

    private label: string = '';
    private value: any;
    private representation: fabric.Group = new fabric.Group([]);
    private shapesService: ShapesService = ShapesService.instance;
    static nodeIndex: number = 0;

    constructor(label?: string, value?: any, representation?: fabric.Group | fabric.Object[]) {
        let objects: fabric.Object[];
        this.value = value;
        
        if(label) this.label = label;
        else{
            this.label = Node.nodeIndex.toString();
            Node.nodeIndex++;
        } 

        if(representation instanceof Array) objects = [...representation]
        else {
            if(representation) objects = [...representation._objects];
            else {
                let text = Shapes.text;
                text.value = this.label;
                objects = [this.shapesService.createCircle(Shapes.circle), this.shapesService.createText(text)];
            } 
        } 
        this.representation = new fabric.Group(objects);
    }

}