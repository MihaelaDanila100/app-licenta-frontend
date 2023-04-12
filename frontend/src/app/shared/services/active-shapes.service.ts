import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShapeTypes } from '../data/enums/shape-types';
import { ColorType } from '../data/enums/color-types';

@Injectable({
  providedIn: 'root'
})
export class ActiveShapesService {

  private activeShapesSbj: Subject<fabric.Object> = new Subject<fabric.Object>();
  private selectedShapeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private colorFillSbj: Subject<string> = new Subject<string>();
  private colorStrokeSbj: Subject<string> = new Subject<string>();
  private curentShapeRefSbj: Subject<any> = new Subject<any>();
  private fillSyncSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private strokeSyncSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private duplicateShapeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private deleteShapeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public activeShapes = this.activeShapesSbj.asObservable();
  public selectedShape = this.selectedShapeSbj.asObservable();
  public colorFill = this.colorFillSbj.asObservable();
  public colorStroke = this.colorStrokeSbj.asObservable();
  public currentShapeRef = this.curentShapeRefSbj.asObservable();
  public syncColorFill = this.fillSyncSbj.asObservable();
  public syncColorStroke = this.strokeSyncSbj.asObservable();
  public duplicatedShape = this.duplicateShapeSbj.asObservable();
  public deletedShape = this.deleteShapeSbj.asObservable();

  constructor() { }

  public addShapeToWhiteboard(shape: any, positionRelative?: boolean): void {
    switch (shape.get('type')) {
      case ShapeTypes.RECTANGLE:
        let rectangle = new fabric.Rect({
          width: shape.width,
          height: shape.height,
          fill: shape.fill,
          stroke: shape.stroke,
          strokeDashArray: shape.strokeDashArray,
          hasControls: false,
          left: positionRelative ? shape.left + 10 : 100,
          top: positionRelative ? shape.top + 10 : 100,
          selectable: true
        });
        this.activeShapesSbj.next(rectangle)
        break;
      
      case ShapeTypes.LINE:
        let line = new fabric.Line([shape.x1, shape.y1, shape.x2, shape.y2], {
          stroke: shape.stroke,
          top: positionRelative ? shape.top + 10 : 100,
          left: positionRelative ? shape.left + 10 : 100,
          hasControls: false,
          strokeDashArray: shape.strokeDashArray
        });
        this.activeShapesSbj.next(line)
        break;
      
      case ShapeTypes.CIRCLE:
        let circle = new fabric.Circle({
          radius: shape.radius,
          hasControls: false,
          stroke: shape.stroke,
          strokeDashArray: shape.strokeDashArray,
          fill: shape.fill,
          top: positionRelative ? shape.top + 10 : 100,
          left: positionRelative ? shape.left + 10 : 100,
        });
        this.activeShapesSbj.next(circle);
        break;
      
      case ShapeTypes.ELLIPSE:
        let ellipse = new fabric.Ellipse({
          rx: shape.rx,
          ry: shape.ry,
          hasControls: false,
          fill: shape.fill,
          stroke: shape.stroke,
          strokeDashArray: shape.strokeDashArray,
          top: positionRelative ? shape.top + 10 : 100,
          left: positionRelative ? shape.left + 10 : 100,
        });
        this.activeShapesSbj.next(ellipse);
        break;
    
      default:
        break;
    }
  }

  public selectShape(value?: boolean): void {
    if(value === undefined) value = !this.selectedShapeSbj.value;
    this.selectedShapeSbj.next(value);
  }

  public colorShape(event: any): void {
    if(event.type === ColorType.FILL) this.colorFillSbj.next(event.value);
    if(event.type === ColorType.STROKE) this.colorStrokeSbj.next(event.value);
  }

  public clearAllColors(): void {
    this.colorFillSbj.next('transparent');
    this.colorStrokeSbj.next('transparent');
  }

  public updateCurrentShape(shape: any): void {
    this.curentShapeRefSbj.next(shape);
  }

  public syncFill(value: boolean): void {
    this.fillSyncSbj.next(value);
  }

  public syncStroke(value: boolean): void {
    this.strokeSyncSbj.next(value);
  }

  public duplicateShape(value?: boolean): void {
    if(value === undefined) value = !this.duplicateShapeSbj.value;
    this.duplicateShapeSbj.next(value);
    this.duplicateShapeSbj.next(false);
  }

  public deleteShape(value?: boolean): void {
    if(value === undefined) value = !this.deleteShapeSbj.value;
    this.deleteShapeSbj.next(value);
    this.deleteShapeSbj.next(false);
  }
}
