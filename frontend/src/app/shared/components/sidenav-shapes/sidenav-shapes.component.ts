import { Component, OnInit } from '@angular/core';
import { DrawingService } from '../../services/drawing.service';
import { ShapesService } from '../../services/shapes.service';
import { fabric } from 'fabric';
import { Shapes } from '../../data/shapes';

@Component({
  selector: 'app-sidenav-shapes',
  templateUrl: './sidenav-shapes.component.html',
  styleUrls: ['./sidenav-shapes.component.scss']
})
export class SidenavShapesComponent implements OnInit {

  private shapesCanvas!: fabric.Canvas;
  private shapes: fabric.Object[] = [];

  constructor(private shapesService: ShapesService, private drawingService: DrawingService) { }

  ngOnInit(): void {
    this.shapesCanvas = this.drawingService.createCanvas('shapes_canvas', {});
    this.initShapes();
    this.shapes.forEach((shape) => this.shapesCanvas.add(shape));
  }

  private initShapes() {
    this.shapes.push(this.shapesService.createRectangle(Shapes.rectangle));
    this.shapes.push(this.shapesService.createDashedRectangle(Shapes.dashedRectangle));
    
  }

}
