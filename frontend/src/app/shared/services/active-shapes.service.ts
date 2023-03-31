import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Subject } from 'rxjs';
import { ShapeTypes } from '../data/enums/shape-types';

@Injectable({
  providedIn: 'root'
})
export class ActiveShapesService {

  private activeShapesSbj: Subject<fabric.Object> = new Subject<fabric.Object>();
  public activeShapes = this.activeShapesSbj.asObservable();

  constructor() { }

  public addShape(shape: any): void {
    switch (shape.get('type')) {
      case ShapeTypes.RECTANGLE:
        this.activeShapesSbj.next(new fabric.Rect(shape))
        break;
      
      case ShapeTypes.LINE:
        this.activeShapesSbj.next(new fabric.Line([shape.x1, shape.y1, shape.x2, shape.y2], shape))
        break;
      
      case ShapeTypes.CIRCLE:
        this.activeShapesSbj.next(new fabric.Circle(shape))
        break;
      
      case ShapeTypes.ELLIPSE:
        this.activeShapesSbj.next(new fabric.Ellipse(shape))
        break;
    
      default:
        break;
    }
  }
}
