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

  updateRotation(): void {
    if(this.scaleUnit != '') this.scaleUnit = Number(this.scaleUnit)
    else this.scaleUnit = 0;
    this.shapeActionsService.rotateShape(Number(this.rotationUnit));
  }

}
