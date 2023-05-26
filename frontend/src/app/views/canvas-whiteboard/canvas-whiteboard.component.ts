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
  private currentNewEdge!: Edge | null;
  private currentGraph: Graph = new Graph([]);

  constructor(private drawingService: DrawingService,
    private activeShapesService: ActiveShapesService,
    private colorService: ColorService,
    private shapesService: ShapesService,
    private shapeActionsService: ShapeActionsService,
    private graphService: GraphService,
    private shapeActionsHelper: ShapeActionsHelper,
    private edgesHelper: EdgesHelper,
    private fileService: FileService) { }
  

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
    this.observeFileActions();
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
      if(newEdge != null && this.currentNewEdge?.getRightNode()){
        newEdge = null;
        this.currentNewEdge = null;
      } else {
        if(this.whiteBoardCanvas.getActiveObjects().length === 1){

          let currentNode = this.currentGraph.getNodeRefAt(this.currentGraph.getIndexForNodeDrawing(this.whiteBoardCanvas.getActiveObjects()[0]));
          let pointer = this.whiteBoardCanvas.getActiveObject();
          if(this.currentSelectedEdgeType === EdgeTypes.UNORIENTED_WITH_NO_COST) newEdge = this.edgesHelper.createEdge(pointer);
          if(this.currentSelectedEdgeType === EdgeTypes.UNORIENTED_WITH_COST) newEdge = this.edgesHelper.createEdgeWithCost(pointer);
          if(this.currentSelectedEdgeType === EdgeTypes.ORIENTED_WITH_NO_COST) newEdge = this.edgesHelper.createOrientedEdge(pointer);
          if(this.currentSelectedEdgeType === EdgeTypes.DASHED_EDGE) newEdge = this.edgesHelper.createDashedEdge(pointer);
          this.whiteBoardCanvas.add(newEdge);
          newEdge.sendToBack();
          this.whiteBoardCanvas.renderAll();
          this.currentNewEdge = new Edge(newEdge, currentNode);
        } 
      }
    };
    let mouseMoveHandler = (event: any) => {
      if(newEdge != null){
        if(newEdge._objects) newEdge._objects[1] = this.connectEdge(event, newEdge._objects[1]);
        else newEdge = this.connectEdge(event, newEdge);
      } 
    };
    let mouseDownHandler = (event: any) => {
      if(this.currentNewEdge != null) {
        newEdge.set('opacity', 1);
        this.currentNewEdge?.setRightNode(this.currentGraph.getNodeRefAt(this.currentGraph.getIndexForNodeDrawing(event.target)));
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

  public observeFileActions(): void {
    this.fileService.exportFileObs.subscribe((res) => {
      if(res === 'svg') {
        let myLink = document.createElement("a");
        let file = new Blob([JSON.stringify(this.whiteBoardCanvas.toSVG())], {type:"image/svg+xml;charset=utf-8"});
        myLink.href = URL.createObjectURL(file);
        myLink.download = "myCanvas.svg";
        document.body.appendChild(myLink);
        myLink.click();
        document.body.removeChild(myLink);
      }
    });
    this.fileService.filesObs.subscribe((svgFile) => {
      let fileReader = new FileReader()
      fileReader.onload = (event) => {
        // let svgString: any = fileReader.result;
        // svgString = svgString.replace("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n", "")
        // let svgString: string = '<svg><path d="M 48.5 12 Q 48.5 12 49 12 Q 49.5 12 49.25 11.5 Q 49 11 48.5 11 Q 48 11 47.5 11 Q 47 11 45.5 11.5 Q 44 12 43.5 12 Q 43 12 41.5 12.5 Q 40 13 39 13.5 Q 38 14 37 14 Q 36 14 35 14 Q 34 14 33 14.5 Q 32 15 31 15.5 Q 30 16 28 16.5 Q 26 17 25 17 Q 24 17 23 17.5 Q 22 18 21 18.5 Q 20 19 19 19.5 Q 18 20 17.5 20.5 Q 17 21 16.5 21.5 Q 16 22 16 22.5 Q 16 23 15.5 23.5 Q 15 24 14.5 25 Q 14 26 14 26.5 Q 14 27 13.5 28 Q 13 29 12.5 30 Q 12 31 11.5 32 Q 11 33 11 33.5 Q 11 34 10.5 35 Q 10 36 9.5 37 Q 9 38 9 39 Q 9 40 8.5 40.5 Q 8 41 8 41.5 Q 8 42 7.5 42.5 Q 7 43 7 43.5 Q 7 44 7 44.5 Q 7 45 7 45.5 Q 7 46 7 46.5 Q 7 47 7 47.5 Q 7 48 7 48.5 Q 7 49 7 49.5 Q 7 50 7.5 50.5 Q 8 51 8.5 51 Q 9 51 9 51.5 Q 9 52 9.5 52 Q 10 52 10 52.5 Q 10 53 10.5 53.5 Q 11 54 11.5 54 Q 12 54 12.5 54 Q 13 54 13 54.5 Q 13 55 13.5 55 Q 14 55 14.5 55.5 Q 15 56 15.5 56 Q 16 56 16.5 56 Q 17 56 18 56 Q 19 56 19.5 56.5 Q 20 57 20.5 57 Q 21 57 21.5 57 Q 22 57 23 57 Q 24 57 25 57.5 Q 26 58 26.5 58 Q 27 58 27.5 58 Q 28 58 29 58 Q 30 58 30.5 58 Q 31 58 31.5 58 Q 32 58 32.5 58 Q 33 58 33 57.5 Q 33 57 33.5 57 Q 34 57 34 56.5 Q 34 56 34.5 55.5 Q 35 55 35 54.5 Q 35 54 35.5 54 Q 36 54 36.5 53.5 Q 37 53 37.5 52.5 Q 38 52 38 51.5 Q 38 51 38.5 50.5 Q 39 50 39.5 49.5 Q 40 49 40.5 48.5 Q 41 48 41 47.5 Q 41 47 41.5 47 Q 42 47 42 46 Q 42 45 42.5 45 Q 43 45 43.5 44.5 Q 44 44 44.5 43 Q 45 42 45.5 41.5 Q 46 41 46.5 40.5 Q 47 40 47.5 40 Q 48 40 48 39.5 Q 48 39 48.5 38.5 Q 49 38 49.5 37.5 Q 50 37 50.5 36.5 Q 51 36 51 35.5 Q 51 35 51.5 35 Q 52 35 52 34.5 Q 52 34 52 33.5 Q 52 33 52.5 33 Q 53 33 53 32.5 Q 53 32 53 31.5 Q 53 31 53 30.5 Q 53 30 53 29.5 Q 53 29 53 28.5 Q 53 28 53 27.5 Q 53 27 53 26.5 Q 53 26 53 25.5 Q 53 25 53 24.5 Q 53 24 53 23.5 Q 53 23 53 22.5 Q 53 22 53 21.5 Q 53 21 52.5 20.5 Q 52 20 52 19.5 Q 52 19 51.5 18.5 Q 51 18 50.5 18 Q 50 18 50 17.5 Q 50 17 49.5 16.5 Q 49 16 49 15.5 L 49 15" style="stroke: rgba(0, 0, 0, 1); stroke-width: 10; stroke-dasharray: ; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(30 34.5) translate(-30, -34.5) " stroke-linecap="round" /></svg>'
        let svgString = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"1244.16\" height=\"592.04\" viewBox=\"0 0 1244.16 592.04\" xml:space=\"preserve\">\n<desc>Created with Fabric.js 5.3.0</desc>\n<defs>\n</defs>\n<g transform=\"matrix(1 0 0 1 537.46 302.99)\"  >\n<line style=\"stroke: rgb(0,0,0); stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;\"  x1=\"-297.96406600931294\" y1=\"39.49749560384015\" x2=\"297.96406600931294\" y2=\"-39.49749560384015\" />\n</g>\n<g transform=\"matrix(1 0 0 1 729.93 156.99)\"  >\n<line style=\"stroke: rgb(255,0,0); stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;\"  x1=\"-105.48727840262592\" y1=\"-106.49324764073354\" x2=\"105.48727840262592\" y2=\"106.49324764073354\" />\n</g>\n<g transform=\"matrix(1 0 0 1 489.46 69)\"  >\n<line style=\"stroke: rgb(255,0,0); stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;\"  x1=\"-134.9837211787156\" y1=\"18.498827054963098\" x2=\"134.9837211787156\" y2=\"-18.498827054963098\" />\n</g>\n<g transform=\"matrix(1 0 0 1 431.97 196.49)\"  >\n<line style=\"stroke: rgb(0,0,0); stroke-width: 2; stroke-dasharray: 5 5; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;\"  x1=\"-192.47678760668703\" y1=\"145.99074324457368\" x2=\"192.47678760668703\" y2=\"-145.99074324457368\" />\n</g>\n<g transform=\"matrix(1 0 0 1 296.99 214.99)\"  >\n<line style=\"stroke: rgb(0,0,0); stroke-width: 2; stroke-dasharray: 5 5; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;\"  x1=\"57.49306642797144\" y1=\"-127.49191618961059\" x2=\"-57.49306642797144\" y2=\"127.49191618961059\" />\n</g>\n<g transform=\"matrix(1 0 0 1 353.48 86.5)\"  >\n<g style=\"\"   >\n\t\t<g transform=\"matrix(1 0 0 1 0 0)\"  >\n<circle style=\"stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,255,34); fill-rule: nonzero; opacity: 1;\"  cx=\"0\" cy=\"0\" r=\"20\" />\n</g>\n\t\t<g transform=\"matrix(1 0 0 1 0.67 1.3)\" style=\"\"  >\n\t\t<text xml:space=\"preserve\" font-family=\"arial black\" font-size=\"20\" font-style=\"normal\" font-weight=\"normal\" style=\"stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1; white-space: pre;\" ><tspan x=\"-6.67\" y=\"6.28\" >0</tspan></text>\n</g>\n</g>\n</g>\n<g transform=\"matrix(1 0 0 1 238.49 341.48)\"  >\n<g style=\"\"   >\n\t\t<g transform=\"matrix(1 0 0 1 0 0)\"  >\n<circle style=\"stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,255,34); fill-rule: nonzero; opacity: 1;\"  cx=\"0\" cy=\"0\" r=\"20\" />\n</g>\n\t\t<g transform=\"matrix(1 0 0 1 0.67 1.3)\" style=\"\"  >\n\t\t<text xml:space=\"preserve\" font-family=\"arial black\" font-size=\"20\" font-style=\"normal\" font-weight=\"normal\" style=\"stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1; white-space: pre;\" ><tspan x=\"-6.67\" y=\"6.28\" >1</tspan></text>\n</g>\n</g>\n</g>\n<g transform=\"matrix(1 0 0 1 834.42 262.49)\"  >\n<g style=\"\"   >\n\t\t<g transform=\"matrix(1 0 0 1 0 0)\"  >\n<circle style=\"stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,255,34); fill-rule: nonzero; opacity: 1;\"  cx=\"0\" cy=\"0\" r=\"20\" />\n</g>\n\t\t<g transform=\"matrix(1 0 0 1 0.67 1.3)\" style=\"\"  >\n\t\t<text xml:space=\"preserve\" font-family=\"arial black\" font-size=\"20\" font-style=\"normal\" font-weight=\"normal\" style=\"stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1; white-space: pre;\" ><tspan x=\"-6.67\" y=\"6.28\" >2</tspan></text>\n</g>\n</g>\n</g>\n<g transform=\"matrix(1 0 0 1 623.45 49.5)\"  >\n<g style=\"\"   >\n\t\t<g transform=\"matrix(1 0 0 1 0 0)\"  >\n<circle style=\"stroke: rgb(0,0,0); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,255,34); fill-rule: nonzero; opacity: 1;\"  cx=\"0\" cy=\"0\" r=\"20\" />\n</g>\n\t\t<g transform=\"matrix(1 0 0 1 0.67 1.3)\" style=\"\"  >\n\t\t<text xml:space=\"preserve\" font-family=\"arial black\" font-size=\"20\" font-style=\"normal\" font-weight=\"normal\" style=\"stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1; white-space: pre;\" ><tspan x=\"-6.67\" y=\"6.28\" >3</tspan></text>\n</g>\n</g>\n</g>\n</svg>";
        console.log("stringgg ", svgString)
        fabric.loadSVGFromString(svgString, (objects, options) => {
          // console.log("doamne ajuta ", objects)
          let obj = fabric.util.groupSVGElements(objects, options);
          this.whiteBoardCanvas.add(obj);
        })
        this.whiteBoardCanvas.renderAll();
      }
      fileReader.readAsText(svgFile);
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
