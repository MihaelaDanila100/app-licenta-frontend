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
  public usedColors: any[] = [];
  public selectedColor: any = '';

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
    if(this.usedColors.findIndex((color) => color.value == this.fillColor) < 0) {
      this.usedColors.push(newColor);
    } 
  }

  public changeOutlineColor(): void {
    let newColor = {
      type: ColorType.STROKE,
      value: this.outlineColor
    };
    this.activeShapesService.colorShape(newColor);
    if(this.usedColors.findIndex((color) => color.value == this.outlineColor) < 0){
      this.usedColors.push(newColor);
    } 
  }

  public toggleFillSync(): void {
    this.syncFill = !this.syncFill;
  }

  public get colorType(): typeof ColorType {
    return ColorType; 
  }

  public toggleStrokeSync(): void {
    this.syncStroke = !this.syncStroke;
  }

  public selectColor(event: any): void {
    this.selectedColor = event.value;
    let newColor = {
      type: event.type,
      value: event.value
    };
    this.activeShapesService.clearAllColors();
    this.activeShapesService.colorShape(newColor);
  }

}
