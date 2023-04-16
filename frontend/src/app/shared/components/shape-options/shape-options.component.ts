import { Component, OnInit } from '@angular/core';
import { ShapeActionsService } from '../../services/shape-actions.service';

@Component({
  selector: 'app-shape-options',
  templateUrl: './shape-options.component.html',
  styleUrls: ['./shape-options.component.scss']
})
export class ShapeOptionsComponent implements OnInit {

  public scaleUnit: any = 1;
  public rotationUnit: any = 0;
  public opacityUnit: any = 1;

  constructor(private shapeActionsService: ShapeActionsService) { }

  ngOnInit(): void {
  }

  decreaseScale(): void {
    if(this.scaleUnit > 1) this.scaleUnit--;
    this.shapeActionsService.updateScaleShape(Number(this.scaleUnit));
  }

  increaseScale(): void {
    this.scaleUnit++;
    this.shapeActionsService.updateScaleShape(Number(this.scaleUnit));
  }

  updateScale(): void {
    if(this.scaleUnit != '') this.scaleUnit = Number(this.scaleUnit)
    else this.scaleUnit = 1;
    this.shapeActionsService.updateScaleShape(Number(this.scaleUnit));
  }

  updateRotation(value?: number): void {
    if(value) this.rotationUnit = Number(this.rotationUnit) + value;
    if(this.rotationUnit != '') this.rotationUnit = Number(this.rotationUnit)
    else this.rotationUnit = 0;
    this.shapeActionsService.rotateShape(Number(this.rotationUnit));
  }

  updateOpacity(): void {
    if(this.opacityUnit != '') this.opacityUnit = Number(this.opacityUnit)
    else this.opacityUnit = 1;
    this.shapeActionsService.updateOpacityShape(Number(this.opacityUnit));
  }

}
