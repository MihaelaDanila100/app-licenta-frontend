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
    
      default:
        break;
    }
  }
}
