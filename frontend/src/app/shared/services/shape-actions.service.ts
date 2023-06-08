import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GraphService } from './graph.service';

@Injectable({
  providedIn: 'root'
})
export class ShapeActionsService {

  private scaleShapeSbj: Subject<number> = new Subject<number>();
  private rotationShapeSbj: Subject<number> = new Subject<number>();
  private opacityShapeSbj: Subject<number> = new Subject<number>();
  private deleteShapeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private duplicateShapeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private blockedShapeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private toggleColorsSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private toggleDrawingSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private textShapeSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private newWhiteBoardSbj: BehaviorSubject<any> = new BehaviorSubject<any>(true);

  private actionTriggeredSbj: Subject<any> = new Subject<any>();
  private triggerDestroyObjectSbj: Subject<any> = new Subject<any>();
  public actionTriggeredObs = this.actionTriggeredSbj.asObservable();
  public triggerDestroyObs = this.triggerDestroyObjectSbj.asObservable();

  scaleShape = this.scaleShapeSbj.asObservable();
  rotationShape = this.rotationShapeSbj.asObservable();
  opacityShape = this.opacityShapeSbj.asObservable();
  deletedShape = this.deleteShapeSbj.asObservable();
  duplicatedShape = this.duplicateShapeSbj.asObservable();
  blockedShape = this.blockedShapeSbj.asObservable();
  toggleColorsObs = this.toggleColorsSbj.asObservable();
  toggleDrawingObs = this.toggleDrawingSbj.asObservable();
  textShapeObs = this.textShapeSbj.asObservable();
  newWhiteBoardObs = this.newWhiteBoardSbj.asObservable();

  constructor(private graphService: GraphService) { }

  public updateScaleShape(value: number): void {
    this.scaleShapeSbj.next(value);
  }

  public rotateShape(value: number): void {
    this.rotationShapeSbj.next(value);
  }

  public updateOpacityShape(value: number): void {
    this.opacityShapeSbj.next(value);
  }

  public deleteShape(value?: boolean): void {
    if(value === undefined) value = !this.deleteShapeSbj.value;
    this.deleteShapeSbj.next(value);
    this.deleteShapeSbj.next(false);
  }

  public duplicateShape(value?: boolean): void {
    if(value === undefined) value = !this.duplicateShapeSbj.value;
    this.duplicateShapeSbj.next(value);
    this.duplicateShapeSbj.next(false);
  }

  public unblockShape(value?: boolean): void {
    if(value === undefined) value = !this.blockedShapeSbj.value;
    this.blockedShapeSbj.next(value);
  }

  public toggleColor(value?: boolean): void {
    if(value === undefined) value = !this.toggleColorsSbj.value;
    this.toggleColorsSbj.next(value);
  }

  public updateDrawingMode(mode?: boolean): void {
    if(mode) this.toggleDrawingSbj.next(mode);
    else this.toggleDrawingSbj.next(!this.toggleDrawingSbj.value);
  }

  public addTextShape(): void {
    this.textShapeSbj.next(!this.textShapeSbj.value);
  }

  public triggerActionOnCanvas(): void {
    this.actionTriggeredSbj.next(true);
  }

  public saveCurrentState(graphSvg: string): void {
    this.graphService.addNewGraph(graphSvg);
    //JSON.stringify(`${this.whiteBoardCanvas.toSVG().replace('<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n',"")}`)
  }

  public createWhiteboard(): void {
    this.newWhiteBoardSbj.next(true);
  }

  public destroyObject(obj: any): void {
    this.triggerDestroyObjectSbj.next(obj);
  }
}
