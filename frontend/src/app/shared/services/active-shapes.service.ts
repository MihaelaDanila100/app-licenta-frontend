import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveShapesService {

  private activeShapesSbj: Subject<fabric.Object> = new Subject<fabric.Object>();
  public activeShapes = this.activeShapesSbj.asObservable();

  constructor() { }

  public addShape(shape: fabric.Object): void {
    this.activeShapesSbj.next(shape);
  }
}
