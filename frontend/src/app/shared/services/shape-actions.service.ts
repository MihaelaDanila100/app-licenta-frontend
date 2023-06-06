import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

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
  public actionTriggeredObs = this.actionTriggeredSbj.asObservable();

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

  constructor() { }

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

  public createWhiteboard(): void {
    this.newWhiteBoardSbj.next(true);
  }
}
