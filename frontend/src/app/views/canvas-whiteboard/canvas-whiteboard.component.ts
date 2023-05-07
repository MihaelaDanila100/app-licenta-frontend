import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, mergeMap, takeWhile } from 'rxjs';
import { Edge } from 'src/app/entities/edge';
import { Graph } from 'src/app/entities/graph';
import { Line } from 'src/app/interfaces/line';
import { Shapes } from 'src/app/shared/data/constants/shapes';
import { ActiveShapesService } from 'src/app/shared/services/active-shapes.service';
import { ColorService } from 'src/app/shared/services/color.service';
import { DrawingService } from 'src/app/shared/services/drawing.service';
import { GraphService } from '../services/graph.service';
import { ShapeActionsService } from 'src/app/shared/services/shape-actions.service';
import { ShapesService } from 'src/app/shared/services/shapes.service';
import { Node } from 'src/app/entities/node';
import { MenuObservablesHelper } from 'src/app/helpers/menu-observables.helper';
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
  private subscriptionsArray: Subscription[] = [];
  public isFillSync: boolean = false;
  public isStrokeSync: boolean = false;
  public isTextSync: boolean = false;
  private kill$ = new BehaviorSubject(null);
  private currentNodeNumber: number = 0;
  private edges: Edge[] = [];
  private newEdge: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private drawingService: DrawingService,
    private activeShapesService: ActiveShapesService,
    private colorService: ColorService,
    private shapesService: ShapesService,
    private shapeActionsService: ShapeActionsService,
    private graphService: GraphService,
    private menuHelper: MenuObservablesHelper,
    private edgesHelper: EdgesHelper) { }
  

  ngOnInit(): void {
    this.whiteBoardCanvas = this.drawingService.createCanvas('whiteboard_canvas', {});
    this.whiteBoardCanvas.setDimensions({
      width: window.innerWidth * 81 / 100,
      height: window.innerHeight * 82 / 100
    });
    this.activeShapesService.activeShapes.subscribe((newShape: any) => {
      this.whiteBoardCanvas.add(newShape);
      this.activeShapesService.currentShapeRef.pipe(
        mergeMap((newShapeRef) => {
          this.kill$.next(newShapeRef);
          let scaleRequest = this.shapeActionsService.scaleShape.pipe(takeWhile(() => this.kill$.value == newShape));
          return scaleRequest;
        })
      ).subscribe((requests) => {
        let scaleValue = requests;
        newShape.scale(scaleValue);
        this.whiteBoardCanvas.renderAll();
      });
      this.activeShapesService.currentShapeRef.pipe(
        mergeMap((newShapeRef) => {
          this.kill$.next(newShapeRef);
          let rotationRequest = this.shapeActionsService.rotationShape.pipe(takeWhile(() => this.kill$.value == newShape));
          return rotationRequest;
        })
      ).subscribe((requests) => {
        newShape.rotate(requests);
        this.whiteBoardCanvas.renderAll();
      });
      this.activeShapesService.currentShapeRef.pipe(
        mergeMap((newShapeRef) => {
          this.kill$.next(newShapeRef);
          let opacityRequest = this.shapeActionsService.opacityShape.pipe(takeWhile(() => this.kill$.value == newShape));
          return opacityRequest;
        })
      ).subscribe((requests) => {
        newShape.opacity = requests;
        this.whiteBoardCanvas.renderAll();
      });
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
          let newText = this.shapesService.createText(text);
          this.activeShapesService.addShapeToWhiteboard(newText);
          newShape.set('fill', 'transparent');
          this.whiteBoardCanvas.renderAll();
        } 
      });
      this.subscriptions.add(this.colorService.colorFill.subscribe((color) => {
        newShape.on("mousedown", () => {
            if(!newShape._objects) newShape.set('fill', color);
            else newShape._objects[0].set('fill', color);
            this.whiteBoardCanvas.renderAll();
        });
        if(this.isFillSync) {
          if(!newShape._objects) newShape.set('fill', color);
          else newShape._objects[0].set('fill', color);
          this.whiteBoardCanvas.renderAll();
        }
      }));
      if(!newShape._objects) {
        this.subscriptions.add(this.colorService.colorStroke.subscribe((color) => {
          newShape.on("mousedown", () => {
            newShape.set('stroke', color);
            this.whiteBoardCanvas.renderAll();
          });
          if(this.isStrokeSync) {
            newShape.set('stroke', color);
            this.whiteBoardCanvas.renderAll();
          }
        }));
      } else {
        this.subscriptions.add(this.colorService.colorText.subscribe((color) => {
          newShape.on("mousedown", () => {
            newShape._objects[1].set('fill', color);
            this.whiteBoardCanvas.renderAll();
          });
          if(this.isTextSync) {
            newShape._objects[1].set('fill', color);
            this.whiteBoardCanvas.renderAll();
          }
        }));
      }
      this.subscriptions.add(this.activeShapesService.selectedShape.subscribe((res: any) => {
        newShape.hasControls = res;
        this.whiteBoardCanvas.renderAll();
      }));
      this.subscriptions.add(this.colorService.syncColorFill.subscribe((res: boolean) => {
        this.isFillSync = res;
      }));
      if(!newShape._objects) {
        this.subscriptions.add(this.colorService.syncColorStroke.subscribe((res: boolean) => {
          this.isStrokeSync = res;
        }));
      } else {
        this.subscriptions.add(this.colorService.syncColorText.subscribe((res: boolean) => {
          this.isTextSync = res;
        }));
      }
      newShape.on("mousedown", () => {
        this.activeShapesService.updateCurrentShape(newShape);
      });
    });
    this.whiteBoardCanvas.on("mouse:down", (event) => {
      if(!event.target) this.activeShapesService.selectShape(false);
    });
    // this.observeEdges();
    this.workWithGraph();
  }

  public workWithGraph() {
    let myGraph = new Graph([]);
    this.graphService.addNewGraph(myGraph);
    this.graphService.currentNodeRef.subscribe((newNode: Node) => {
      myGraph.addNewNode(newNode);
      console.log("da, si la mine graful s-a schimbat: ", myGraph.numberOfNodes, myGraph.isOriented, myGraph.adjacency_list, myGraph.nodesList)

    });
    this.graphService.currentGraphicObjects.subscribe((newObject: fabric.Group) => {
      this.whiteBoardCanvas.add(newObject);
      newObject.set('hasControls', false);
      newObject._render(this.whiteBoardCanvas.getContext());
      this.menuHelper.drawingEdgesMode.subscribe((isDrawingMode) => {
        let newSubscriptionIndex: number = -1;
        if(isDrawingMode) {
          newSubscriptionIndex = this.subscriptionsArray.push(this.edgesHelper.isNewEdgeObs.subscribe((isNewEdge) => {
            console.log("is new edgeeee ", isNewEdge)
            if(isNewEdge) {
              newObject.off("mouseup", () => {
                this.edgesHelper.createNewEdge(newObject, this.whiteBoardCanvas);
                this.whiteBoardCanvas.renderAll();
              });
              newObject.on("mousedown", () => {
                this.edgesHelper.updateEdgeOpacity();
                this.whiteBoardCanvas.renderAll();
              });
              newObject.on("mouseup", (event) => {
                this.edgesHelper.finishEdge(newObject, this.whiteBoardCanvas)
                this.whiteBoardCanvas.renderAll();
              });
              this.whiteBoardCanvas.on("mouse:move", (event) => {
                this.edgesHelper.moveEdge(event, this.whiteBoardCanvas)
                this.whiteBoardCanvas.renderAll();
              });
            } else {
              newObject.off("mouseup", (event) => {
                this.edgesHelper.finishEdge(newObject, this.whiteBoardCanvas);
                this.whiteBoardCanvas.renderAll();
              });
              newObject.off("mousedown", () => {
                this.edgesHelper.updateEdgeOpacity();
                this.whiteBoardCanvas.renderAll();
              });
              newObject.on("mouseup", () => {
                this.edgesHelper.createNewEdge(newObject, this.whiteBoardCanvas);
                this.whiteBoardCanvas.renderAll();
              });
              this.whiteBoardCanvas.off("mouse:move", (event) => {
                this.edgesHelper.moveEdge(event, this.whiteBoardCanvas);
                this.whiteBoardCanvas.renderAll();
              });
            }
          })) - 1;
        } else {
          if(newSubscriptionIndex > -1) this.subscriptionsArray[newSubscriptionIndex].unsubscribe();
        }
      });
    });
  }

  public observeEdges(): void {
    // let newEdge!: any;
    // let mouseUpHandler = () => {
    //   if(newEdge) newEdge = null;
    //   else{
    //     if(this.whiteBoardCanvas.getActiveObjects().length === 1){
    //       let currentNode = this.whiteBoardCanvas.getActiveObjects()[0]
    //       newEdge = this.createEdge();
    //       this.currentNewEdge = new Edge(newEdge, currentNode);
    //       this.edges.push(this.currentNewEdge);
    //     } 
    //   } 
    // };
    // let mouseMoveHandler = (event: any) => {
    //   newEdge = this.connectEdge(event, newEdge);
    // };
    // let mouseDownHandler = (event: any) => {
    //   if(newEdge) {
    //     newEdge.set('opacity', 1);
    //     this.currentNewEdge.setRightNode(event.target);
    //     if(this.currentNewEdge.getLeftNode()) {
    //       this.currentNewEdge.getLeftNode().on("moving", (event: any) => {
    //         let pointer;
    //         if(event.transform.target._objects) pointer = event.transform.target._objects[0].getCenterPoint();
    //         else pointer = event.transform.target.getCenterPoint();
    //         pointer.x = event.transform.target.left + pointer.x;
    //         pointer.y = event.transform.target.top + pointer.y;
    //         this.currentNewEdge.setLineCoords(pointer, true);
    //       });
    //     }
    //     if(this.currentNewEdge.getRightNode()) {
    //       this.currentNewEdge.getRightNode().on("moving", (event: any) => {
    //         let pointer;
    //         if(event.transform.target._objects) pointer = event.transform.target._objects[0].getCenterPoint();
    //         else pointer = event.transform.target.getCenterPoint();
    //         pointer.x = event.transform.target.left + pointer.x;
    //         pointer.y = event.transform.target.top + pointer.y;
    //         this.currentNewEdge.setLineCoords(pointer, false);
    //       });
    //     }
    //   }
    // }
    // this.subscriptions.add(
    //   this.graphService.addEdgeObs.subscribe((res: boolean) => {
    //     if(res === true) {
    //       this.whiteBoardCanvas.on("mouse:up", mouseUpHandler);
    //       this.whiteBoardCanvas.on("mouse:move", mouseMoveHandler);
    //       this.whiteBoardCanvas.on("mouse:down", mouseDownHandler);
    //     } else {
    //       this.whiteBoardCanvas.off("mouse:up", mouseUpHandler)
    //       this.whiteBoardCanvas.off("mouse:move", mouseMoveHandler);
    //       this.whiteBoardCanvas.off("mouse:down", mouseDownHandler);
    //     }
    //   })              
    // )
  }

  private createEdge(): any {
    let pointer = this.whiteBoardCanvas.getActiveObject();
    let coords = [
      (pointer?.left || 0) + (pointer?.width || 0) / 2,
      (pointer?.top || 0) + (pointer?.height || 0) / 2,
      (pointer?.left || 0) + (pointer?.width || 0) / 2,
      (pointer?.top || 0) + (pointer?.height || 0) / 2
    ]
    let newLine: Line = {
      left: pointer?.left, 
      top: pointer?.top, 
      points: coords,
      strokeWidth: 2,
      stroke: 'black',
      showControls: false
    }
    let newEdge = this.shapesService.createLine(newLine)
    this.whiteBoardCanvas.add(newEdge);
    newEdge.sendToBack();
    this.whiteBoardCanvas.renderAll();
    return newEdge;
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
