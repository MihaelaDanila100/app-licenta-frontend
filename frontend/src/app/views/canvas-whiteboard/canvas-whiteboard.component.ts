import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, combineLatest, forkJoin, map, merge, mergeMap, of, switchMap, takeWhile } from 'rxjs';
import { Edge } from 'src/app/entities/edge';
import { Graph } from 'src/app/entities/graph';
import { Line } from 'src/app/interfaces/line';
import { Shapes } from 'src/app/shared/data/constants/shapes';
import { ActiveShapesService } from 'src/app/shared/services/active-shapes.service';
import { ColorService } from 'src/app/shared/services/color.service';
import { DrawingService } from 'src/app/shared/services/drawing.service';
import { GraphService } from 'src/app/shared/services/graph.service';
import { ShapeActionsService } from 'src/app/shared/services/shape-actions.service';
import { ShapesService } from 'src/app/shared/services/shapes.service';
import { Node } from 'src/app/entities/node';
import { ShapeActionsHelper } from 'src/app/helpers/shape-actions.helper';
import { EdgeTypes } from 'src/app/shared/data/enums/edge-types';
import { EdgesHelper } from 'src/app/helpers/edges.helper';

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
  public isTextSync: boolean = false;
  private isColorMode: boolean = false;
  private kill$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private currentSelectedEdgeType!: EdgeTypes;
  private currentNewEdge: any;
  private currentGraph: Graph = new Graph([]);

  constructor(private drawingService: DrawingService,
    private activeShapesService: ActiveShapesService,
    private colorService: ColorService,
    private shapesService: ShapesService,
    private shapeActionsService: ShapeActionsService,
    private graphService: GraphService,
    private shapeActionsHelper: ShapeActionsHelper,
    private edgesHelper: EdgesHelper) { }
  

  ngOnInit(): void {
    this.shapeActionsService.toggleColorsObs.subscribe((res) => {
      this.isColorMode = res;
    });
    this.whiteBoardCanvas = this.drawingService.createCanvas('whiteboard_canvas', {});
    this.whiteBoardCanvas.setDimensions({
      width: window.innerWidth * 81 / 100,
      height: window.innerHeight * 82 / 100
    });
    this.activeShapesService.activeShapes.pipe(
      mergeMap((newShape) => {
        this.whiteBoardCanvas.add(newShape);
        if(newShape) this.kill$.next(newShape);
        let colorFillRequest = this.colorService.colorFill.pipe(
          map((fillColor: any) => {
            newShape.on("mousedown", () => {
              if(this.isColorMode) {
                this.shapeActionsHelper.observeFillColor(newShape, fillColor);
                this.whiteBoardCanvas.renderAll();
              }
            });
            if(this.isColorMode) { 
              this.shapeActionsHelper.observeFillSyncColor(newShape, fillColor);
              this.whiteBoardCanvas.renderAll();
            }
          })
        );
        let colorStrokeRequest = this.colorService.colorStroke.pipe(
          map((strokeColor: any) => {
            newShape.on("mousedown", () => {
              if(this.isColorMode) this.shapeActionsHelper.observeStrokeColor(newShape, strokeColor)
            });
            if(this.isColorMode) {
              this.shapeActionsHelper.observeStrokeSyncColor(newShape, strokeColor);
              this.whiteBoardCanvas.renderAll();
            }
          })
        );
        let colorTextRequest = this.colorService.colorText.pipe(
          map((textColor: any) => {
            newShape.on("mousedown", () => {
              if(this.isColorMode) this.shapeActionsHelper.observeTextColor(newShape, textColor)
            });
            if(this.isColorMode) {
              this.shapeActionsHelper.observeTextSyncColor(newShape, textColor);
              this.whiteBoardCanvas.renderAll();
            }
          })
        )
        return merge(colorFillRequest, colorStrokeRequest, colorTextRequest);
      })
    ).subscribe(() => { });
    this.kill$.pipe(
      switchMap((newSelectedShape: any) => {
        if(newSelectedShape != false) {
          let unblockRequest = this.shapeActionsService.blockedShape.pipe(
            takeWhile(() => this.kill$.value == newSelectedShape),
            map((res: boolean) => {
              newSelectedShape.set('hasControls', res);
              this.whiteBoardCanvas.renderAll();
            })
          );
          let deletedRequest = this.shapeActionsService.deletedShape.pipe(
            takeWhile(() => this.kill$.value == newSelectedShape),
            map((result) => { 
              if(result){
                this.whiteBoardCanvas.remove(newSelectedShape)
                this.currentGraph.deleteNodeAt(this.currentGraph.getIndexForNodeDrawing(newSelectedShape)).forEach((edge) => {
                  this.whiteBoardCanvas.remove(edge);
                });
              } 
            })
          );
          let scaleRequest = this.shapeActionsService.scaleShape.pipe(
            takeWhile(() => this.kill$.value == newSelectedShape),
            map((result: number) => { 
              newSelectedShape.scale(result);
              this.whiteBoardCanvas.renderAll();
            })
          );
          let rotationRequest: any = this.shapeActionsService.rotationShape.pipe(
            takeWhile(() => this.kill$.value == newSelectedShape),
            map((result: number) => { 
              newSelectedShape.rotate(result);
              this.whiteBoardCanvas.renderAll();
            })
          );
          let opacityRequest = this.shapeActionsService.opacityShape.pipe(
            takeWhile(() => this.kill$.value == newSelectedShape),
            map((result: number) => { 
              newSelectedShape.opacity = result;
              this.whiteBoardCanvas.renderAll();
            })
          );
          let duplicateRequest = this.shapeActionsService.duplicatedShape.pipe(
            takeWhile(() => this.kill$.value == newSelectedShape),
            map((isDuplicated: boolean) => { if(isDuplicated) this.activeShapesService.addShapeToWhiteboard(newSelectedShape, true) })
          );
          return merge(unblockRequest, deletedRequest, scaleRequest, rotationRequest, opacityRequest, duplicateRequest);
        }
        return of(newSelectedShape)
      })
    ).subscribe((result) => { })
    this.observeEdges();
  }

  public observeEdges(): void {
    this.graphService.newNodesObs.pipe(
      mergeMap((node: Node) => {
        this.currentGraph.addNewNode(node);
        this.whiteBoardCanvas.add(node.getNodeDrawing());
        node.getNodeDrawing().on("mousedown", () => {
          this.kill$.next(node.getNodeDrawing())
        });
        let colorFillRequest = this.colorService.colorFill.pipe(
          map((fillColor: any) => {
            node.getNodeDrawing().on("mousedown", () => {
              if(this.isColorMode) {
                this.shapeActionsHelper.observeFillColor(node.getNodeDrawing(), fillColor);
                this.whiteBoardCanvas.renderAll()
              }
            });
            if(this.isColorMode) {
              this.shapeActionsHelper.observeFillSyncColor(node.getNodeDrawing(), fillColor);
              this.whiteBoardCanvas.renderAll();
            }
          })
        );
        let colorTextRequest = this.colorService.colorText.pipe(
          map((textColor: any) => {
            node.getNodeDrawing().on("mousedown", () => {
              if(this.isColorMode) {
                this.shapeActionsHelper.observeTextColor(node.getNodeDrawing(), textColor)
                this.whiteBoardCanvas.renderAll()
              }
            });
            if(this.isColorMode) {
              this.shapeActionsHelper.observeTextSyncColor(node.getNodeDrawing(), textColor);
              this.whiteBoardCanvas.renderAll();
            }
          })
        )
        return merge(colorFillRequest, colorTextRequest);
      })
    ).subscribe(() => { });
    this.graphService.newEdgeObs.subscribe((newEdge: Edge) => {
      newEdge.getLeftNode().getNodeDrawing().on("moving", (event) =>  {
        newEdge.setLineCoords(event.pointer, true);
      });
      newEdge.getRightNode().getNodeDrawing().on("moving", (event) => {
        newEdge.setLineCoords(event.pointer, false);
      });
    })
    let newEdge!: any;
    let mouseUpHandler = () => {
      if(newEdge){
        newEdge = null;
        this.currentNewEdge = null;
      } else{
        if(this.whiteBoardCanvas.getActiveObjects().length === 1){
          let currentNode = this.currentGraph.getNodeRefAt(this.currentGraph.getIndexForNodeDrawing(this.whiteBoardCanvas.getActiveObjects()[0]));
          let pointer = this.whiteBoardCanvas.getActiveObject();
          if(this.currentSelectedEdgeType === EdgeTypes.UNORIENTED_WITH_NO_COST) newEdge = this.edgesHelper.createEdge(pointer);
          if(this.currentSelectedEdgeType === EdgeTypes.UNORIENTED_WITH_COST) newEdge = this.edgesHelper.createEdgeWithCost(pointer);
          if(this.currentSelectedEdgeType === EdgeTypes.ORIENTED_WITH_NO_COST) newEdge = this.edgesHelper.createOrientedEdge(pointer);
          this.whiteBoardCanvas.add(newEdge);
          newEdge.sendToBack();
          this.whiteBoardCanvas.renderAll();
          this.currentNewEdge = new Edge(newEdge, currentNode);
        } 
      } 
    };
    let mouseMoveHandler = (event: any) => {
      newEdge = this.connectEdge(event, newEdge);
    };
    let mouseDownHandler = (event: any) => {
      if(newEdge) {
        newEdge.set('opacity', 1);
        this.currentNewEdge.setRightNode(this.currentGraph.getNodeRefAt(this.currentGraph.getIndexForNodeDrawing(event.target)));
        this.currentGraph.addNewEdge(this.currentNewEdge);
        this.graphService.addEdge(this.currentNewEdge);
      }
    }
    this.subscriptions.add(
      this.graphService.addEdgeObs.subscribe((res: any) => {
        this.currentSelectedEdgeType = res;
        if(res != false) {
          this.whiteBoardCanvas.on("mouse:up", mouseUpHandler);
          this.whiteBoardCanvas.on("mouse:move", mouseMoveHandler);
          this.whiteBoardCanvas.on("mouse:down", mouseDownHandler);
        } else {
          this.whiteBoardCanvas.off("mouse:up", mouseUpHandler)
          this.whiteBoardCanvas.off("mouse:move", mouseMoveHandler);
          this.whiteBoardCanvas.off("mouse:down", mouseDownHandler);
        }
      })              
    )
  }

  private connectEdge(event: any, newEdge: any): any {
    if(newEdge) {
      newEdge.set('opacity', 0.4);
      if(event.target) {
        newEdge.set({
          x2: (event.target.left || 0) + ((event.target.width || 0) / 2),
          y2: (event.target.top || 0) + ((event.target.height || 0) / 2)
        });
        this.whiteBoardCanvas.renderAll();
      } else {
        let coordsPoint = this.whiteBoardCanvas.getPointer(event.e);
        newEdge.set({
          x2: coordsPoint.x,
          y2: coordsPoint.y
        });
        this.whiteBoardCanvas.renderAll();
      }
    }
    return newEdge;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
