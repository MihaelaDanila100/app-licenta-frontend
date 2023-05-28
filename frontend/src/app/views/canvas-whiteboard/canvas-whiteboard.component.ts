import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, map, merge, mergeMap, of, switchMap, takeWhile } from 'rxjs';
import { Edge } from 'src/app/entities/edge';
import { Graph } from 'src/app/entities/graph';
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
import { FileService } from 'src/app/shared/services/file.service';
import { fabric } from 'fabric';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SaveJpgPopupComponent } from 'src/app/shared/components/save-jpg-popup/save-jpg-popup.component';
import { SavePdfPopupComponent } from 'src/app/shared/components/save-pdf-popup/save-pdf-popup.component';

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
  public isDrawSync: boolean = false;
  private isColorMode: boolean = false;
  private kill$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private currentSelectedEdgeType!: EdgeTypes;
  private currentNewEdge!: Edge | null;
  private currentGraph: Graph = new Graph([]);

  constructor(private drawingService: DrawingService,
    private activeShapesService: ActiveShapesService,
    private colorService: ColorService,
    private shapesService: ShapesService,
    private dialog: MatDialog,
    private shapeActionsService: ShapeActionsService,
    private graphService: GraphService,
    private shapeActionsHelper: ShapeActionsHelper,
    private edgesHelper: EdgesHelper,
    private fileService: FileService) { }
  

  ngOnInit(): void {
    this.shapeActionsService.actionTriggeredObs.subscribe(() => {
      this.whiteBoardCanvas.renderAll();
    });
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
            if(this.isDrawSync) {
              this.whiteBoardCanvas.freeDrawingBrush.color = 'red';
              this.whiteBoardCanvas.renderAll();
            }
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
            if(this.isDrawSync) {
              this.whiteBoardCanvas.freeDrawingBrush.color = strokeColor;
              this.whiteBoardCanvas.renderAll();
            }
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
    this.observeFileActions();
    this.subscriptions.add(
      this.shapeActionsService.toggleDrawingObs.subscribe((res) => {
        this.whiteBoardCanvas.isDrawingMode = res;
        this.isDrawSync = res;
        this.whiteBoardCanvas.renderAll();
      })
    )
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
            if(this.isDrawSync) {
              this.whiteBoardCanvas.freeDrawingBrush.color = fillColor;
              this.whiteBoardCanvas.renderAll();
            }
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
    let adjacentSymbols!: any;
    let mouseUpHandler = () => {
      if(newEdge != null && this.currentNewEdge?.getRightNode()){
        newEdge = null;
        adjacentSymbols = null;
        this.currentNewEdge = null;
      } else {
        if(this.whiteBoardCanvas.getActiveObjects().length === 1){

          let currentNode = this.currentGraph.getNodeRefAt(this.currentGraph.getIndexForNodeDrawing(this.whiteBoardCanvas.getActiveObjects()[0]));
          let pointer = this.whiteBoardCanvas.getActiveObject();
          if(this.currentSelectedEdgeType === EdgeTypes.UNORIENTED_WITH_NO_COST) newEdge = this.edgesHelper.createEdge(pointer);
          if(this.currentSelectedEdgeType === EdgeTypes.UNORIENTED_WITH_COST){
            let myNewEdge = this.edgesHelper.createEdgeWithCost(pointer);
            newEdge = myNewEdge[0];
            adjacentSymbols = myNewEdge[1];
          } 
          if(this.currentSelectedEdgeType === EdgeTypes.ORIENTED_WITH_NO_COST){
            let myNewEdge = this.edgesHelper.createOrientedEdge(pointer);
            newEdge = myNewEdge[0];
            adjacentSymbols = myNewEdge[1];
          } 
          if(this.currentSelectedEdgeType === EdgeTypes.DASHED_EDGE) newEdge = this.edgesHelper.createDashedEdge(pointer);
          this.whiteBoardCanvas.add(newEdge);
          newEdge.sendToBack();
          if(adjacentSymbols) this.whiteBoardCanvas.add(adjacentSymbols);
          this.whiteBoardCanvas.renderAll();
          this.currentNewEdge = new Edge(newEdge, currentNode);
        } 
      }
    };
    let mouseMoveHandler = (event: any) => {
      if(newEdge != null){
        // if(this.currentSelectedEdgeType === EdgeTypes.UNORIENTED_WITH_NO_COST){
          newEdge = this.edgesHelper.connectEdge(event, newEdge, this.whiteBoardCanvas.getPointer(event.e));
          if(adjacentSymbols) {
            if(this.currentSelectedEdgeType === EdgeTypes.UNORIENTED_WITH_COST) adjacentSymbols = this.edgesHelper.updateLabelOfCost(adjacentSymbols, newEdge);
            if(this.currentSelectedEdgeType === EdgeTypes.ORIENTED_WITH_NO_COST) adjacentSymbols = this.edgesHelper.updateArrowHead(adjacentSymbols, newEdge);
          }
          this.whiteBoardCanvas.renderAll();
        // } 
      } 
    };
    let mouseDownHandler = (event: any) => {
      if(this.currentNewEdge != null) {
        newEdge.set('opacity', 1);
        this.currentNewEdge?.setRightNode(this.currentGraph.getNodeRefAt(this.currentGraph.getIndexForNodeDrawing(event.target)));
        if(adjacentSymbols){
          this.currentNewEdge.setAdditionalSymbols(adjacentSymbols);
          if(this.currentSelectedEdgeType === EdgeTypes.UNORIENTED_WITH_COST) {
            this.whiteBoardCanvas.setActiveObject(adjacentSymbols);
            adjacentSymbols.enterEditing()
            adjacentSymbols.hiddenTextarea.focus();
          }
        }
        this.currentGraph.addNewEdge(this.currentNewEdge);
        this.graphService.addEdge(this.currentNewEdge);
      }
    }
    this.subscriptions.add(
      this.graphService.addEdgeObs.subscribe((res: any) => {
        this.currentSelectedEdgeType = res;
        this.whiteBoardCanvas.off("mouse:up", mouseUpHandler)
        this.whiteBoardCanvas.off("mouse:move", mouseMoveHandler);
        this.whiteBoardCanvas.off("mouse:down", mouseDownHandler);
        if(res != false) {
          this.whiteBoardCanvas.on("mouse:up", mouseUpHandler);
          this.whiteBoardCanvas.on("mouse:move", mouseMoveHandler);
          this.whiteBoardCanvas.on("mouse:down", mouseDownHandler);
        } 
      })              
    )
  }
  public observeFileActions(): void {
    this.fileService.exportFileObs.subscribe((res) => {
      switch (res) {
        case 'svg':
          let myLink = document.createElement("a");
          console.log("graph ", this.currentGraph)  
          let myCopy =  this.graphService.copyGraphJSON(this.currentGraph)  
          console.log("copy ", myCopy)
          let file = new Blob([myCopy], {type:"text/json"});
          myLink.href = URL.createObjectURL(file);
          myLink.download = "myCanvas.txt";
          document.body.appendChild(myLink);
          myLink.click();
          document.body.removeChild(myLink);
          break;
        
        case 'png':
          this.graphService.addNewGraph(JSON.stringify(`${this.whiteBoardCanvas.toSVG().replace('<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n',"")}`));
          let dialogConfig = new MatDialogConfig();
          dialogConfig.width = '60vw';
          dialogConfig.height = '70vh';
          this.dialog.open(SaveJpgPopupComponent, dialogConfig);
          break;
        
        case 'pdf':
          this.graphService.addNewGraph(JSON.stringify(`${this.whiteBoardCanvas.toSVG().replace('<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n',"")}`));
          let pdfDialogConfig = new MatDialogConfig();
          pdfDialogConfig.width = '60vw';
          pdfDialogConfig.height = '70vh';
          this.dialog.open(SavePdfPopupComponent, pdfDialogConfig);
          break;
      
        default:
          break;
      }
    });
    this.fileService.filesObs.subscribe((svgFile) => {
      let fileReader = new FileReader()
      fileReader.onload = (event) => {
        let fileString: any = fileReader.result;
        this.currentGraph = this.fileService.uploadGraphFromJSON(fileString);
        this.renderGraph();
      }
      fileReader.readAsText(svgFile);
    })
  }

  private renderGraph(): void {
    this.whiteBoardCanvas.clear();
    this.currentGraph.nodesList.forEach((node) => {
      this.whiteBoardCanvas.add(node.getNodeDrawing());
    });
    this.currentGraph.adjacency_list.forEach((edgesList) => {
      edgesList.forEach((edge) => {
        if(edge != false) this.whiteBoardCanvas.add(edge);
      });
    });
    this.whiteBoardCanvas.renderAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
