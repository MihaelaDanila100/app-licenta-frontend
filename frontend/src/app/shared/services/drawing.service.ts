import { Injectable } from '@angular/core';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  constructor() { }

  public createCanvas(container: string, options?: any): fabric.Canvas {
    if(!options) options = {};
    return new fabric.Canvas(container, options);
  }
}
