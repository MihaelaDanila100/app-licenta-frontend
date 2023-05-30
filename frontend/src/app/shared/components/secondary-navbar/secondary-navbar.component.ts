import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActiveShapesService } from '../../services/active-shapes.service';
import { PopupService } from '../../services/popup.service';
import { InlinePopupComponent } from '../inline-popup/inline-popup.component';
import { Node } from 'src/app/entities/node';
import { ShapesService } from '../../services/shapes.service';
import { GraphService } from '../../services/graph.service';
import { ShapeActionsService } from '../../services/shape-actions.service';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.scss'],
  providers: [
    ShapesService
  ]
})
export class SecondaryNavbarComponent implements OnInit {

  public unlocked: boolean = true; 
  public colorMode: boolean = false;
  public chooseBorder: boolean = false;
  public drawingMode: boolean = false;
  public edgesMode: boolean = false;
  @ViewChild(InlinePopupComponent) strokeWidthRef: any;
  @Output() changedEdgeMode: EventEmitter<any> = new EventEmitter<any>();

  constructor(private graphService: GraphService,
    private shapeActionsService: ShapeActionsService) { }

  ngOnInit(): void {
    this.shapeActionsService.blockedShape.subscribe((res: boolean) => {
      this.unlocked = res;
    });
    this.shapeActionsService.toggleColorsObs.subscribe((res: boolean) => {
      this.colorMode = res;
    });
  }

  public lockShape(): void {
    this.shapeActionsService.unblockShape();
  }

  public duplicateShape(): void {
    this.shapeActionsService.duplicateShape();
  }

  public deleteShape(): void {
    this.shapeActionsService.deleteShape();
  }

  public toggleColors(): void {
    this.colorMode = !this.colorMode;
    this.shapeActionsService.toggleColor(this.colorMode);
  }

  public openShapeSettings(): void {
    console.log("daaaa")
  }

  public addNode(): void {
    let node = new Node();
    this.graphService.addNode(node);
  }

  public addTextInNode(): void {
    this.shapeActionsService.addTextShape();
  }

  public addEdge(): void {
    this.edgesMode = !this.edgesMode;
    this.changedEdgeMode.emit(this.edgesMode);
  }

  public startDrawing(): void {
    this.drawingMode = !this.drawingMode;
    this.shapeActionsService.updateDrawingMode(this.drawingMode);
  }

}
