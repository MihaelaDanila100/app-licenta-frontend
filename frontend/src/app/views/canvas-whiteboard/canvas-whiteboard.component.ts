import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, mergeMap, takeWhile } from 'rxjs';
import { Shapes } from 'src/app/shared/data/constants/shapes';
import { ActiveShapesService } from 'src/app/shared/services/active-shapes.service';
import { DrawingService } from 'src/app/shared/services/drawing.service';
import { ShapesService } from 'src/app/shared/services/shapes.service';

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
  private kill$ = new BehaviorSubject(null);
  private currentNodeNumber: number = 0;

  constructor(private drawingService: DrawingService,
    private activeShapesService: ActiveShapesService,
    private shapesService: ShapesService) { }
  

  ngOnInit(): void {
    this.whiteBoardCanvas = this.drawingService.createCanvas('whiteboard_canvas', {});
    this.whiteBoardCanvas.setDimensions({
      width: window.innerWidth * 69 / 100,
      height: window.innerHeight * 69 / 100
    });
    this.activeShapesService.activeShapes.subscribe((newShape: any) => {
      this.whiteBoardCanvas.add(newShape);
      this.activeShapesService.currentShapeRef.pipe(
        mergeMap((newShapeRef) => {
          this.kill$.next(newShapeRef);
          let deletedRequest = this.activeShapesService.deletedShape.pipe(takeWhile(() => this.kill$.value == newShape));
          return deletedRequest;
        })
      ).subscribe((requests) => {
        let isDeleted = requests;
        if(isDeleted){
          this.whiteBoardCanvas.remove(newShape);
          this.whiteBoardCanvas.renderAll();
        } 
      });
      this.activeShapesService.currentShapeRef.pipe(
        mergeMap((newShapeRef) => {
          this.kill$.next(newShapeRef);
          let duplicatedRequest = this.activeShapesService.duplicatedShape.pipe(takeWhile(() => this.kill$.value == newShape));
          return duplicatedRequest;
        })
      ).subscribe((requests) => {
        let isDuplicated = requests;
        if(isDuplicated){
          this.activeShapesService.addShapeToWhiteboard(newShape, true);
        } 
      });
      this.activeShapesService.currentShapeRef.pipe(
        mergeMap((newShapeRef) => {
          this.kill$.next(newShapeRef);
          let textRequest = this.activeShapesService.textShape.pipe(takeWhile(() => this.kill$.value == newShape));
          return textRequest;
        })
      ).subscribe((requests) => {
        if(requests){
          this.currentNodeNumber++;
          let text = Object.assign({}, Shapes.text);
          text.value = this.currentNodeNumber.toString();
          text.left = (newShape.left || 100) + (newShape.width || newShape.radius || 20) / 3;
          text.top = (newShape.top || 100) + (newShape.height || newShape.radius || 20) / 4;
          this.activeShapesService.addShapeToWhiteboard(this.shapesService.createText(text));
        } 
      });
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
      newShape.on("mousedown", () => {
        this.activeShapesService.updateCurrentShape(newShape);
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
