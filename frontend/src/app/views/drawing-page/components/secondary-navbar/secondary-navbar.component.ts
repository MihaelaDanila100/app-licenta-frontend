import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActiveShapesService } from '../../../../shared/services/active-shapes.service';
import { PopupService } from '../../../../shared/services/popup.service';
import { Node } from 'src/app/entities/node';
import { ShapesService } from '../../../../shared/services/shapes.service';

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
  @Output() showColorChooserChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private activeShapesService: ActiveShapesService, private popupService: PopupService) { }

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
    this.activeShapesService.addNodeToWhiteboard(node);
  }

  public addTextInNode(): void {
    this.activeShapesService.addTextShape();
  }

}
