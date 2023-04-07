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
  public usedColors: string[] = [];
  public selectedColor: string = '';

  constructor(private activeShapesService: ActiveShapesService) { }

  public updateVisibility(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  public changeFillColor(): void {
    let newColor = {
      type: ColorType.FILL,
      value: this.fillColor
    };
    this.activeShapesService.colorShape(newColor);
    if(!this.usedColors.includes(this.fillColor)) this.usedColors.push(this.fillColor);
  }

  public changeOutlineColor(): void {
    let newColor = {
      type: ColorType.STROKE,
      value: this.outlineColor
    };
    this.activeShapesService.colorShape(newColor);
    if(!this.usedColors.includes(this.outlineColor)) this.usedColors.push(this.outlineColor);
  }

  public toggleFillSync(): void {
    this.syncFill = !this.syncFill;
  }

  public toggleStrokeSync(): void {
    this.syncStroke = !this.syncStroke;
  }

  public selectColor(event: any): void {
    this.selectedColor = event;
    let newColor = {
      type: ColorType.STROKE,
      value: event
    };
    this.activeShapesService.colorShape(newColor);
    newColor.value = ColorType.FILL;
    this.activeShapesService.colorShape(newColor);
  }

}
