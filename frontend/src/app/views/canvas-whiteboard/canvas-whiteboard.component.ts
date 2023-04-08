import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
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
  public isFillSync: boolean = false;
  public isStrokeSync: boolean = false;

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
            newShape.set('fill', color);
            this.whiteBoardCanvas.renderAll();
        });
        if(this.isFillSync) {
          newShape.set('fill', color);
          this.whiteBoardCanvas.renderAll();
        }
      }));
      this.subscriptions.add(this.activeShapesService.colorStroke.subscribe((color) => {
        newShape.on("mousedown", () => {
          newShape.set('stroke', color);
          this.whiteBoardCanvas.renderAll();
        });
        if(this.isStrokeSync) {
          newShape.set('stroke', color);
          this.whiteBoardCanvas.renderAll();
        }
      }));
      this.subscriptions.add(this.activeShapesService.selectedShape.subscribe((res: any) => {
        newShape.hasControls = res;
        this.whiteBoardCanvas.renderAll();
      }));
      this.subscriptions.add(this.activeShapesService.syncColorFill.subscribe((res: boolean) => {
        this.isFillSync = res;
      }));
      this.subscriptions.add(this.activeShapesService.syncColorStroke.subscribe((res: boolean) => {
        this.isStrokeSync = res;
      }));
      newShape.on('mousedown', (event) => {
        this.subscriptions.add(this.activeShapesService.duplicatedShape.subscribe((res) => {
          if(res) console.log("Time to duplicate");;
        }));
        this.subscriptions.add(this.activeShapesService.deletedShape.subscribe((res) => {
          if(res) console.log("Time to delete");;
        }));
      });
    });
    this.whiteBoardCanvas.on("mouse:down", (event) => {
      if(!event.target) this.activeShapesService.selectShape(false);
    });
  }



  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
