import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShapeTypes } from '../data/enums/shape-types';
import { ColorType } from '../data/enums/color-types';

@Injectable({
  providedIn: 'root'
})
export class ActiveShapesService {

  private activeShapesSbj: Subject<fabric.Object> = new Subject<fabric.Object>();
  private selectedShapeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private colorFillSbj: Subject<string> = new Subject<string>();
  private colorStrokeSbj: Subject<string> = new Subject<string>();
  public activeShapes = this.activeShapesSbj.asObservable();
  public selectedShape = this.selectedShapeSbj.asObservable();
  public colorFill = this.colorFillSbj.asObservable();
  public colorStroke = this.colorStrokeSbj.asObservable();

  constructor() { }

  public addShapeToWhiteboard(shape: any): void {
    switch (shape.get('type')) {
      case ShapeTypes.RECTANGLE:
        let rectangle = new fabric.Rect({
          width: shape.width,
          height: shape.height,
          fill: shape.fill,
          stroke: shape.stroke,
          strokeDashArray: shape.strokeDashArray,
          hasControls: false,
          left: 100,
          top: 100,
          selectable: true
        });
        this.activeShapesSbj.next(rectangle)
        break;
      
      case ShapeTypes.LINE:
        let line = new fabric.Line([shape.x1, shape.y1, shape.x2, shape.y2], {
          stroke: shape.stroke,
          top: 100,
          left: 100,
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
          top: 100,
          left: 100
        });
        this.activeShapesSbj.next(circle);
        break;
      
      case ShapeTypes.ELLIPSE:
        let ellipse = new fabric.Ellipse(shape);
        ellipse.hasControls = true;
        this.activeShapesSbj.next(ellipse);
        break;
    
      default:
        break;
    }
  }

  public selectShape(value?: boolean): void {
    if(value === undefined) value = !this.selectedShapeSbj.value;
    this.selectedShapeSbj.next(value);
  }

  public colorShape(event: any): void {
    if(event.type === ColorType.FILL) this.colorFillSbj.next(event.value);
    if(event.type === ColorType.STROKE) this.colorStrokeSbj.next(event.value);
  }
}
