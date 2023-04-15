import { Component, OnInit } from '@angular/core';
import { DrawingService } from '../../services/drawing.service';
import { ShapesService } from '../../services/shapes.service';
import { fabric } from 'fabric';
import { Shapes } from '../../data/constants/shapes';
import { ActiveShapesService } from '../../services/active-shapes.service';
import { ShapeTypes } from '../../data/enums/shape-types';

@Component({
  selector: 'app-sidenav-shapes',
  templateUrl: './sidenav-shapes.component.html',
  styleUrls: ['./sidenav-shapes.component.scss']
})
export class SidenavShapesComponent implements OnInit {

  private shapesCanvas!: fabric.Canvas;
  private shapes: fabric.Object[] = [];

  constructor(private shapesService: ShapesService, 
    private drawingService: DrawingService,
    private activeShapesService: ActiveShapesService) { }

  ngOnInit(): void {
    this.shapesCanvas = this.drawingService.createCanvas('shapes_canvas', {
      preserveObjectStacking: true,
      width: 210
    });
    this.initShapes();
    this.shapes.forEach((shape) => {
      this.shapesCanvas.add(shape);
    });
    this.shapesCanvas.on("mouse:down", (event: any) => {
      if(event.target) this.activeShapesService.addShapeToWhiteboard(event.target);
    })
  }

  private initShapes() {
    this.shapes.push(this.shapesService.createRectangle(Shapes.rectangle));
    this.shapes.push(this.shapesService.createDashedRectangle(Shapes.dashedRectangle));
    this.shapes.push(this.shapesService.createLine(Shapes.line));
    this.shapes.push(this.shapesService.createCircle(Shapes.circle));
    this.shapes.push(this.shapesService.createDashedCircle(Shapes.dashedCircle));
    this.shapes.push(this.shapesService.createDashedLine(Shapes.dashedLine));
    this.shapes.push(this.shapesService.createEllipse(Shapes.ellipse));
    this.shapes.push(this.shapesService.createDashedEllipse(Shapes.dashedEllipse));
  }

}
