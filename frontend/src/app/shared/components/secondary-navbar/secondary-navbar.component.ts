import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActiveShapesService } from '../../services/active-shapes.service';
import { PopupService } from '../../services/popup.service';
import { InlinePopupComponent } from '../inline-popup/inline-popup.component';
import { Node } from 'src/app/entities/node';
import { ShapesService } from '../../services/shapes.service';
import { GraphService } from 'src/app/views/services/graph.service';
import { MenuObservablesHelper } from 'src/app/helpers/menu-observables.helper';

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
  public showColorChooser: boolean = false;
  public chooseBorder: boolean = false;
  public edgesMode: boolean = false;
  @Output() showColorChooserChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(InlinePopupComponent) strokeWidthRef: any;

  constructor(private activeShapesService: ActiveShapesService, 
    private graphService: GraphService,
    private menuHelper: MenuObservablesHelper) { }

  ngOnInit(): void {
    this.activeShapesService.selectedShape.subscribe((res: boolean) => {
      this.unlocked = res;
    });
  }

  public lockShape(): void {
    this.activeShapesService.selectShape();
  }

  public duplicateShape(): void {
    this.activeShapesService.duplicateShape();
  }

  public deleteShape(): void {
    this.activeShapesService.deleteShape();
  }

  public toggleColors(): void {
    this.showColorChooser = !this.showColorChooser;
    this.showColorChooserChange.emit(this.showColorChooser);
  }

  public openShapeSettings(): void {
    console.log("daaaa")
  }

  public addNode(): void {
    let node = new Node();
    this.graphService.addNewNode(node);
  }

  public addTextInNode(): void {
    this.activeShapesService.addTextShape();
  }

  public addEdge(): void {
    this.menuHelper.toggleEdgesMode();
    this.edgesMode = !this.edgesMode;
  }

}
