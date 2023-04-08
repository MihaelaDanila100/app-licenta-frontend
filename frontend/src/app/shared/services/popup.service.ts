import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private popupsSbjs: Subject<boolean> = new Subject<boolean>();
  public inlineModals = this.popupsSbjs.asObservable();

  constructor() { }

  public addPopUp(): void {
    this.popupsSbjs.next(true);
  }
}
