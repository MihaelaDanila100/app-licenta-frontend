import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveShapesService } from '../../services/active-shapes.service';
import { ColorType } from '../../data/enums/color-types';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color-chooser',
  templateUrl: './color-chooser.component.html',
  styleUrls: ['./color-chooser.component.scss']
})
export class ColorChooserComponent implements OnInit, OnDestroy {

  constructor(private activeShapesService: ActiveShapesService, private colorService: ColorService) { }

  private subscription: Subscription = new Subscription();
  public isGroup: boolean = false;
  public fillColor!: any;
  public outlineColor!: any;
  public textColor!: any;
  public usedColors: any[] = [];
  public selectedColor: any = '';
  public isFillSync: boolean = false;
  public isOutlineSync: boolean = false;
  public isTextSync: boolean = false;

  ngOnInit(): void {
    this.subscription.add(
      this.activeShapesService.activeShapes.subscribe((res: any) => {
        if(res._objects) this.isGroup = true;
        else this.isGroup = false;
      })
    );
    this.subscription.add(
      this.activeShapesService.currentShapeRef.subscribe((res: any) => {
        if(res._objects) this.isGroup = true;
        else this.isGroup = false;
      })
    )
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public changeFillColor(): void {
    let newColor = {
      type: ColorType.FILL,
      value: this.fillColor
    };
    this.colorService.colorShape(newColor);
    if(!this.isFillSync && this.usedColors.findIndex((color) => color.value == this.fillColor) < 0) {
      this.usedColors.push(newColor);
    } 
  }

  public changeOutlineColor(): void {
    let newColor = {
      type: ColorType.STROKE,
      value: this.outlineColor
    };
    this.colorService.colorShape(newColor);
    if(!this.isOutlineSync && this.usedColors.findIndex((color) => color.value == this.outlineColor) < 0){
      this.usedColors.push(newColor);
    } 
  }

  public changeTextColor(): void {
    let newColor = {
      type: ColorType.TEXT,
      value: this.textColor
    };
    this.colorService.colorShape(newColor);
    if(!this.isTextSync && this.usedColors.findIndex((color) => color.value == this.textColor) < 0){
      this.usedColors.push(newColor);
    } 
  }

  public updateFillColor(): void {
    if(this.isFillSync) this.changeFillColor();
  }

  public updateStrokeColor(): void {
    if(this.isOutlineSync) this.changeOutlineColor();
  }

  public updateTextColor(): void {
    if(this.isTextSync) this.changeTextColor();
  }

  public selectColor(event: any): void {
    this.selectedColor = event.value;
    let newColor = {
      type: event.type,
      value: event.value
    };
    this.colorService.colorShape(newColor);
  }

  public toggleFillSync(value: boolean): void {
    this.isFillSync = value;
    this.colorService.syncFill(value);
  }

  public toggleStrokeSync(value: boolean): void {
    this.isOutlineSync = value;
    this.colorService.syncStroke(value);
  }

  public toggleTextSync(value: boolean): void {
    this.isTextSync = value;
    this.colorService.syncText(value);
  }

  public stopColoring() {
    this.colorService.colorShape({
      type: ColorType.FILL,
      value: false
    });
  }

  public getColorIcon(color: any): string {
    switch (color.type) {
      case ColorType.FILL:
        return 'fill_color_icon';
      
      case ColorType.STROKE:
        return 'outline_color_icon';
      
      case ColorType.TEXT:
        return 'text_color_icon';
    
      default:
        return '';
    }
  }

}
