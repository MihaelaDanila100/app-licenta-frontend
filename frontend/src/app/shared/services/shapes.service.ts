import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Circle, DashedCircle } from 'src/app/views/interfaces/ui-interfaces/circle';
import { DashedEllipse, Ellipse } from 'src/app/views/interfaces/ui-interfaces/ellipse';
import { DashedLine, Line } from 'src/app/views/interfaces/ui-interfaces/line';
import { DashesRectangle, Rectangle } from 'src/app/views/interfaces/ui-interfaces/rectangle';
import { Text } from 'src/app/views/interfaces/ui-interfaces/text';


@Injectable({
  providedIn: 'root'
})
export class ShapesService {

  static instance: ShapesService;

  constructor() { 
    ShapesService.instance = this;
  }

  public createRectangle(rectangle: Rectangle): fabric.Rect {
    if(!rectangle.fill) rectangle.fill = 'transparent';
    if(!rectangle.stroke) rectangle.stroke = 'black';
    if(!rectangle.top) rectangle.top = 0;
    if(!rectangle.left) rectangle.left = 0;
    if(!rectangle.selectable) rectangle.selectable = true;
    return new fabric.Rect({
      width: rectangle.width,
      height: rectangle.height,
      fill: rectangle.fill,
      stroke: rectangle.stroke,
      hasControls: rectangle.showControls,
      left: rectangle.left,
      top: rectangle.top,
      selectable: rectangle.selectable
    });
  }

  public createDashedRectangle(rectangle: DashesRectangle): fabric.Rect {
    let newRectangle = this.createRectangle(rectangle);
    newRectangle.strokeDashArray = rectangle.dashes;
    return newRectangle;
  }

  public createLine(line: any): fabric.Line {
    if(!line.top) line.top = 0;
    if(!line.left) line.left = 0;
    return new fabric.Line(line.points,
      {
        stroke: line.stroke,
        top: line.top,
        left: line.left,
        strokeWidth: line.strokeWidth,
        hasControls: line.showControls
      })
  }
  
  public createLineWithText(line: Line, text: Text): fabric.Group {
    let edgeLine = this.createLine(line);
    let edgeText =this.createText(text);
    return new fabric.Group([edgeLine, edgeText], { objectCaching: false });
  }

  public createCircle(circle: Circle): fabric.Circle {
     if(!circle.stroke) circle.stroke = 'black';
     if(!circle.fill) circle.fill = 'transparent';
     if(!circle.top) circle.top = 0;
     if(!circle.left) circle.left = 0;
     let options: any = {
      radius: circle.radius,
      hasControls: circle.showControls,
      stroke: circle.stroke,
      fill: circle.fill,
      top: circle.top,
      left: circle.left
     };
     return new fabric.Circle(options);
  }

  public createDashedCircle(circle: DashedCircle): fabric.Circle {
    let newCircle = this.createCircle(circle);
    newCircle.strokeDashArray = circle.dashes;
    return newCircle;
  }

  public createDashedLine(line: DashedLine): fabric.Line {
    let newLine = this.createLine(line);
    newLine.strokeDashArray = line.dashes;
    return newLine;
  }

  public createEllipse(ellipse: Ellipse): fabric.Ellipse {
    if(!ellipse.fill) ellipse.fill = 'transparent';
    if(!ellipse.stroke) ellipse.stroke = 'black';
    if(!ellipse.top) ellipse.top = 0;
    if(!ellipse.left) ellipse.left = 0;
    return new fabric.Ellipse({
      rx: ellipse.rx,
      ry: ellipse.ry,
      hasControls: ellipse.showControls,
      fill: ellipse.fill,
      stroke: ellipse.stroke,
      top: ellipse.top,
      left: ellipse.left
    });
  }

  public createDashedEllipse(ellipse: DashedEllipse): fabric.Ellipse {
    let newEllipse = this.createEllipse(ellipse);
    newEllipse.strokeDashArray = ellipse.dashes;
    return newEllipse;
  }

  public createText(text: Text): fabric.IText {
    return new fabric.IText(text.value, {
      fontFamily: text.fontStyle ? text.fontStyle : 'arial black',
      left: text.left ? text.left : 100, 
      top: text.top ? text.top : 100,
      hasControls: text.showControls,
      fill: text.fill ? text.fill : 'black',
      opacity: text.opacity ? text.opacity : 1,
      fontSize: text.fontSize ? text.fontSize : 40,
      fontWeight: text.fontWeight,
      editable: text.editable ? text.editable : false
    })
  }

  public createArrow(lineObject: Line, isSample?: boolean): any {
    if(isSample) {
      return new fabric.Group([this.createLine(lineObject), new fabric.Triangle({
        width: 10,
        height: 15,
        fill: 'black',
        left: (lineObject.left || 0) + lineObject.points[2] + 8,
        top: (lineObject.top || 0) + lineObject.points[3],
        angle: 135,
        selectable: false
      })])
    }
    return new fabric.Polygon([
      {x: 0, y: 0},
      {x: -15, y: -7},
      {x: -15, y: 7}
    ], {
      fill: 'black',
      left: (lineObject.left || 0),
      top: (lineObject.top || 0),
      selectable: false,
      opacity: 0.6
    })
  }
}
