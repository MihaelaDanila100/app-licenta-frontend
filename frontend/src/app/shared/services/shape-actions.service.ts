import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapeActionsService {

  private scaleShapeSbj: Subject<number> = new Subject<number>();
  private rotationShapeSbj: Subject<number> = new Subject<number>();
  scaleShape = this.scaleShapeSbj.asObservable();
  rotationShape = this.rotationShapeSbj.asObservable();

  constructor() { }

  public updateScaleShape(value: number): void {
    this.scaleShapeSbj.next(value);
  }

  public rotateShape(value: number): void {
    this.rotationShapeSbj.next(value);
  }
}
