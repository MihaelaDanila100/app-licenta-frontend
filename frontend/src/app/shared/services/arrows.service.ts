import { Injectable } from '@angular/core';
import { Line } from '../interfaces/line';
import Konva from 'konva';
import { Observable, of } from 'rxjs';
import { Arrow } from '../interfaces/arrow';

@Injectable({
  providedIn: 'root'
})
export class ArrowsService {

  constructor() { }

  public drawLine(line: Line): Observable<any> {
    let newLine: any = {
      points: line.points,
      stroke: line.strokeColor,
      strokeWidth: line.strokeWidth,
      lineCap: line.lineCap,
      lineJoin: line.lineJoin,
      tension: line.tension
    }
    if(line.dash) newLine.dash = line.dash;
    return of(new Konva.Line(newLine));
  }

  public drawArrow(arrow: Arrow): Observable<any> {
    let newArrow: any = {
      x: arrow.x,
      y: arrow.y,
      points: arrow.points,
      stroke: arrow.strokeColor,
      strokeWidth: arrow.strokeWidth,
      lineCap: arrow.lineCap,
      lineJoin: arrow.lineJoin,
      tension: arrow.tension,
      pointerLength: arrow.pointerLength,
      pointerWidth: arrow.pointerWidth,
      fill: arrow.fillColor
    }
    if(arrow.dash) newArrow.dash = arrow.dash;
    return of(new Konva.Arrow(newArrow));
  }
  
}
