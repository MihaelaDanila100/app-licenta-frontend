import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Konva from 'konva';
import { Shape } from '../interfaces/shape';
import { Circle } from '../interfaces/circle';
import { Rectangle } from '../interfaces/rectangle';

@Injectable({
  providedIn: 'root'
})
export class ShapesService {

  constructor() { }

  public drawCircle(shape: Circle): Observable<any> {
    return of(new Konva.Circle({
      x: shape.x,
      y: shape.y,
      radius: shape.radius,
      fill: shape.fillColor,
      stroke: shape.strokeColor,
      strokeWidth: shape.strokeWidth
    }));
  }

  public drawDashedCircle(shape: Circle): Observable<any> {
    return of(new Konva.Circle({
      x: shape.x,
      y: shape.y,
      radius: shape.radius,
      fill: shape.fillColor,
      stroke: shape.strokeColor,
      strokeWidth: shape.strokeWidth,
      dash: [4, 4]
    }));
  }

  public drawRectangle(shape: Rectangle): Observable<any> {
    return of(new Konva.Rect({
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
      fill: shape.fillColor,
      stroke: shape.strokeColor,
      strokeWidth: shape.strokeWidth
    }));
  }

  public drawDashedRectangle(shape: Rectangle): Observable<any> {
    return of({
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
      fill: shape.fillColor,
      stroke: shape.strokeColor,
      strokeWidth: shape.strokeWidth,
      dash: [6, 6]
    })
  }
}
