import { Injectable } from '@angular/core';
import { Line } from '../interfaces/line';
import Konva from 'konva';
import { Observable, of } from 'rxjs';

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
  
}
