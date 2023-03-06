import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapesService {

  constructor() { }

  public drawCircle(x: number, y: number, radius: number, fillColor: string, strokeColor: string, strokeWidth: number): Observable<any> {
    return of({
      x: x,
      y: y,
      radius: radius,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth
    });
  }
}
