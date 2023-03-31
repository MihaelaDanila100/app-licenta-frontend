import { Component, OnInit } from '@angular/core';
import { ActiveShapesService } from 'src/app/shared/services/active-shapes.service';
import { DrawingService } from 'src/app/shared/services/drawing.service';

@Component({
  selector: 'app-canvas-whiteboard',
  templateUrl: './canvas-whiteboard.component.html',
  styleUrls: ['./canvas-whiteboard.component.scss']
})
export class CanvasWhiteboardComponent implements OnInit {

  private whiteBoardCanvas!: fabric.Canvas;

  constructor(private drawingService: DrawingService,
    private activeShapesService: ActiveShapesService) { }

  ngOnInit(): void {
    this.whiteBoardCanvas = this.drawingService.createCanvas('whiteboard_canvas', {});
    this.whiteBoardCanvas.setDimensions({
      width: window.innerWidth * 69 / 100,
      height: window.innerHeight * 69 / 100
    });
    this.activeShapesService.activeShapes.subscribe((newShape) => {
      console.log("hhhh ", newShape)
      this.whiteBoardCanvas.add(newShape);
    });
  }

}
