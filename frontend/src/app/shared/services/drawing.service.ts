import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Text } from 'src/app/interfaces/text';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  constructor() { }

  public createCanvas(container: string, options?: any): fabric.Canvas {
    if(!options) options = {};
    return new fabric.Canvas(container, {});
  }

  public createText(text: Text): fabric.IText {
    if(!text.fill) text.fill = 'black';
    return new fabric.IText(text.value, {
      fill: text.fill,
      hasControls: text.showControls
    });
  }
}
