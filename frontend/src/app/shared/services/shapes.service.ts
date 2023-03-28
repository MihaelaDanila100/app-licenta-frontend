import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
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
}
