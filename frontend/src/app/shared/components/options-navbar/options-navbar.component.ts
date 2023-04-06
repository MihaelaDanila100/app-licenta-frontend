import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorType } from '../../data/enums/color-types';
import { ActiveShapesService } from '../../services/active-shapes.service';

@Component({
  selector: 'app-options-navbar',
  templateUrl: './options-navbar.component.html',
  styleUrls: ['./options-navbar.component.scss']
})
export class OptionsNavbarComponent {
  
  @Input() display: boolean = false;
  @Output() displayChange: EventEmitter<any> = new EventEmitter<any>();
  public fillColor!: any;
  public outlineColor!: any;
  public syncFill: boolean = false;
  public syncStroke: boolean = false;

  constructor(private activeShapesService: ActiveShapesService) { }

  public updateVisibility(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  public changeFillColor(event: any): void {
    let newColor = {
      type: ColorType.FILL,
      value: event
    };
    this.activeShapesService.colorShape(newColor);
  }

  public changeOutlineColor(event: any): void {
    let newColor = {
      type: ColorType.STROKE,
      value: event
    };
    this.activeShapesService.colorShape(newColor);
  }

  public toggleFillSync(): void {
    this.syncFill = !this.syncFill;
  }

  public toggleStrokeSync(): void {
    this.syncStroke = !this.syncStroke;
  }

}
