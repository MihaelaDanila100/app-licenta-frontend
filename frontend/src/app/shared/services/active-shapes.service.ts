import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShapeTypes } from '../data/enums/shape-types';
import { Node } from 'src/app/entities/node';

@Injectable({
  providedIn: 'root'
})
export class ActiveShapesService {

  private activeShapesSbj: Subject<fabric.Object> = new Subject<fabric.Object>();
  private selectedShapeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private curentShapeRefSbj: Subject<any> = new Subject<any>();
  private duplicateShapeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public textShapeSbj: Subject<any> = new Subject<any>();
  public activeShapes = this.activeShapesSbj.asObservable();
  public selectedShape = this.selectedShapeSbj.asObservable();
  public currentShapeRef = this.curentShapeRefSbj.asObservable();
  public duplicatedShape = this.duplicateShapeSbj.asObservable();
  public textShape = this.textShapeSbj.asObservable();

  constructor() { }

  public addShapeToWhiteboard(shape: any, positionRelative?: boolean): void {
    if(shape._objects) {
      this.addNodeToWhiteboard(shape, shape._objects[1]);
      return;
    }
    switch (shape.get('type')) {
      case ShapeTypes.RECTANGLE:
        let rectangle = new fabric.Rect({
          width: shape.width,
          height: shape.height,
          fill: shape.fill,
          stroke: shape.stroke,
          strokeDashArray: shape.strokeDashArray,
          hasControls: false,
          left: positionRelative ? shape.left + 10 : 100,
          top: positionRelative ? shape.top + 10 : 100,
          selectable: true
        });
        this.activeShapesSbj.next(rectangle)
        break;
      
      case ShapeTypes.LINE:
        let line = new fabric.Line([shape.x1, shape.y1, shape.x2, shape.y2], {
          stroke: shape.stroke,
          top: positionRelative ? shape.top + 10 : 100,
          left: positionRelative ? shape.left + 10 : 100,
          hasControls: false,
          strokeDashArray: shape.strokeDashArray
        });
        this.activeShapesSbj.next(line)
        break;
      
      case ShapeTypes.CIRCLE:
        let circle = new fabric.Circle({
          radius: shape.radius,
          hasControls: false,
          stroke: shape.stroke,
          strokeDashArray: shape.strokeDashArray,
          fill: shape.fill,
          top: positionRelative ? shape.top + 10 : 100,
          left: positionRelative ? shape.left + 10 : 100,
        });
        this.activeShapesSbj.next(circle);
        break;
      
      case ShapeTypes.ELLIPSE:
        let ellipse = new fabric.Ellipse({
          rx: shape.rx,
          ry: shape.ry,
          hasControls: false,
          fill: shape.fill,
          stroke: shape.stroke,
          strokeDashArray: shape.strokeDashArray,
          top: positionRelative ? shape.top + 10 : 100,
          left: positionRelative ? shape.left + 10 : 100,
        });
        this.activeShapesSbj.next(ellipse);
        break;
    
      case ShapeTypes.TEXT:
        let text = new fabric.IText(shape.text, { 
          fontFamily: shape.fontFamily ? shape.fontFamily : 'arial black',
          left: shape.left ? shape.left : 100, 
          top: shape.top ? shape.top : 100,
          hasControls: shape.hasControls,
          fontSize: shape.fontSize,
          fontWeight: shape.fontWeight
        });
        this.activeShapesSbj.next(text);
        break;

      default:
        break;
    }
  }

  public addNodeToWhiteboard(node: any, label?: any): void {
    if(node.label){
      node = node.getNodeDrawing();
    } else {
      node = new Node(label?.text || '');
    }
    
    this.activeShapesSbj.next(node);
  }

  public selectShape(value?: boolean): void {
    if(value === undefined) value = !this.selectedShapeSbj.value;
    this.selectedShapeSbj.next(value);
  }

  public updateCurrentShape(shape: any): void {
    this.curentShapeRefSbj.next(shape);
  }

  public duplicateShape(value?: boolean): void {
    if(value === undefined) value = !this.duplicateShapeSbj.value;
    this.duplicateShapeSbj.next(value);
    this.duplicateShapeSbj.next(false);
  }

  public addTextShape(): void {
    this.textShapeSbj.next(true);
    this.textShapeSbj.next(false);
  }
}
