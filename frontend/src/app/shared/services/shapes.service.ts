import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Circle, DashedCircle } from 'src/app/interfaces/circle';
import { Line } from 'src/app/interfaces/line';
import { DashesRectangle, Rectangle } from 'src/app/interfaces/rectangle';


@Injectable({
  providedIn: 'root'
})
export class ShapesService {

  constructor() { }

  public createRectangle(rectangle: Rectangle): fabric.Rect {
    if(!rectangle.fill) rectangle.fill = 'transparent';
    if(!rectangle.stroke) rectangle.stroke = 'black';
    if(!rectangle.top) rectangle.top = 0;
    if(!rectangle.left) rectangle.left = 0;
    return new fabric.Rect({
      width: rectangle.width,
      height: rectangle.height,
      fill: rectangle.fill,
      stroke: rectangle.stroke,
      hasControls: rectangle.showControls,
      left: rectangle.left,
      top: rectangle.top
    });
  }

  public createDashedRectangle(rectangle: DashesRectangle): fabric.Rect {
    let newRectangle = this.createRectangle(rectangle);
    newRectangle.strokeDashArray = rectangle.dashes;
    return newRectangle;
  }

  public createLine(line: Line): fabric.Line {
    if(!line.top) line.top = 0;
    if(!line.left) line.left = 0;
    return new fabric.Line(line.points,
      {
        stroke: line.stroke,
        top: line.top,
        left: line.left,
        hasControls: line.showControls
      })
  }

  public createCircle(circle: Circle): fabric.Circle {
     if(!circle.stroke) circle.stroke = 'black';
     if(!circle.fill) circle.fill = 'transparent';
     if(!circle.top) circle.top = 0;
     if(!circle.left) circle.left = 0;
     return new fabric.Circle({
      radius: circle.radius,
      hasControls: circle.showControls,
      stroke: circle.stroke,
      fill: circle.fill,
      top: circle.top,
      left: circle.left
     });
  }

  public createDashedCircle(circle: DashedCircle): fabric.Circle {
    let newCircle = this.createCircle(circle);
    newCircle.strokeDashArray = circle.dashes;
    return newCircle;
  }
}
