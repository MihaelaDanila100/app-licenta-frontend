import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ColorType } from '../data/enums/color-types';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }
  
  private colorFillSbj: Subject<string> = new Subject<string>();
  private colorStrokeSbj: Subject<string> = new Subject<string>();
  private colorTextSbj: Subject<string> = new Subject<string>();
  private fillSyncSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private strokeSyncSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private textSyncSbj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  public colorFill = this.colorFillSbj.asObservable();
  public colorStroke = this.colorStrokeSbj.asObservable();
  public colorText = this.colorTextSbj.asObservable();
  public syncColorFill = this.fillSyncSbj.asObservable();
  public syncColorStroke = this.strokeSyncSbj.asObservable();
  public syncColorText = this.textSyncSbj.asObservable();

  public colorShape(event: any): void {
    switch (event.type) {
      case ColorType.FILL:
        this.colorFillSbj.next(event.value);
        break;
      
      case ColorType.STROKE:
        this.colorStrokeSbj.next(event.value);
        break;
      
      case ColorType.TEXT:
        this.colorTextSbj.next(event.value);
        break;
    
      default:
        break;
    }
  }

  public clearAllColors(): void {
    this.colorFillSbj.next('transparent');
    this.colorStrokeSbj.next('transparent');
  }

  public syncFill(value: boolean): void {
    this.fillSyncSbj.next(value);
  }

  public syncStroke(value: boolean): void {
    this.strokeSyncSbj.next(value);
  }

  public syncText(value: boolean): void {
    this.textSyncSbj.next(value);
  }
}
