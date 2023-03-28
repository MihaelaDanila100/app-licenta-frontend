import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Rectangle } from 'src/app/interfaces/rectangle';


@Injectable({
  providedIn: 'root'
})
export class ShapesService {

  constructor() { }

  public createRect(rectangle: Rectangle): fabric.Rect {
    if(!rectangle.fill) rectangle.fill = 'transparent';
    if(!rectangle.stroke) rectangle.stroke = 'black';
    return new fabric.Rect({
      width: rectangle.width,
      height: rectangle.height,
      fill: rectangle.fill,
      stroke: rectangle.stroke,
      hasControls: rectangle.showControls
    });
  }
}
