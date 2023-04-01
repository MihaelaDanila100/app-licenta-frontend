import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShapeTypes } from '../data/enums/shape-types';

@Injectable({
  providedIn: 'root'
})
export class ActiveShapesService {

  private activeShapesSbj: Subject<fabric.Object> = new Subject<fabric.Object>();
  private selectedShapeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public activeShapes = this.activeShapesSbj.asObservable();
  public selectedShape = this.selectedShapeSbj.asObservable();

  constructor() { }

  public addShape(shape: any): void {
    switch (shape.get('type')) {
      case ShapeTypes.RECTANGLE:
        let rectangle = new fabric.Rect(shape)
        rectangle.hasControls = true;
        this.activeShapesSbj.next(rectangle)
        break;
      
      case ShapeTypes.LINE:
        let line = new fabric.Line([shape.x1, shape.y1, shape.x2, shape.y2], shape);
        line.hasControls = true;
        this.activeShapesSbj.next(line)
        break;
      
      case ShapeTypes.CIRCLE:
        let circle = new fabric.Circle(shape);
        circle.hasControls = true;
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
}
