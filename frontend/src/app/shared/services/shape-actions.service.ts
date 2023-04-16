import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapeActionsService {

  private scaleShapeSbjs: Subject<number> = new Subject<number>();
  scaleShape = this.scaleShapeSbjs.asObservable();

  constructor() { }

  public updateScaleShape(value: number): void {
    this.scaleShapeSbjs.next(value);
  }
}
