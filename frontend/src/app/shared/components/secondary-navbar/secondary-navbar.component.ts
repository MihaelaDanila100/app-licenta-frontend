import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActiveShapesService } from '../../services/active-shapes.service';
import { PopupService } from '../../services/popup.service';
import { InlinePopupComponent } from '../inline-popup/inline-popup.component';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.scss']
})
export class SecondaryNavbarComponent implements OnInit {

  public unlocked: boolean = true; 
  public showColorChooser: boolean = false;
  public chooseBorder: boolean = false;
  @Output() showColorChooserChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(InlinePopupComponent) strokeWidthRef: any;

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

  public addTextInNode(): void {
    this.activeShapesService.addTextShape();
  }

}
