import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveShapesService } from 'src/app/shared/services/active-shapes.service';
import { DrawingService } from 'src/app/shared/services/drawing.service';

@Component({
  selector: 'app-canvas-whiteboard',
  templateUrl: './canvas-whiteboard.component.html',
  styleUrls: ['./canvas-whiteboard.component.scss']
})
export class CanvasWhiteboardComponent implements OnInit, OnDestroy {

  private whiteBoardCanvas!: fabric.Canvas;
  public drownShapes: fabric.Object[] = [];
  private subscriptions: Subscription = new Subscription();
  public fillColor!: string;

  constructor(private drawingService: DrawingService,
    private activeShapesService: ActiveShapesService) { }
  

  ngOnInit(): void {
    this.whiteBoardCanvas = this.drawingService.createCanvas('whiteboard_canvas', {});
    this.whiteBoardCanvas.setDimensions({
      width: window.innerWidth * 69 / 100,
      height: window.innerHeight * 69 / 100
    });
    this.activeShapesService.activeShapes.subscribe((newShape) => {
      this.whiteBoardCanvas.add(newShape);
      this.subscriptions.add(this.activeShapesService.colorFill.subscribe((color) => {
        newShape.on("mousedown", () => {
          this.fillColor = color;
            newShape.set('fill', color);
            this.whiteBoardCanvas.renderAll();
        });
        this.fillColor = color;
      }));
      this.subscriptions.add(this.activeShapesService.selectedShape.subscribe((res: any) => {
        newShape.hasControls = res;
        this.whiteBoardCanvas.renderAll();
      }));
    });
    this.activeShapesService.colorStroke.subscribe((color) => {
      console.log("stroke ", color)
    });
    this.whiteBoardCanvas.on("mouse:down", (event) => {
      if(!event.target) this.activeShapesService.selectShape(false);
    })
  }



  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
