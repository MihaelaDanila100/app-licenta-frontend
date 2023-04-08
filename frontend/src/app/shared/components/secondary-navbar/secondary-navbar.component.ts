import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActiveShapesService } from '../../services/active-shapes.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.scss']
})
export class SecondaryNavbarComponent implements OnInit {

  public unlocked: boolean = true; 
  public showColorChooser: boolean = false;
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

  public toggleColors(): void {
    this.showColorChooser = !this.showColorChooser;
    this.showColorChooserChange.emit(this.showColorChooser);
  }

  public openBorderWidth(): void {
    this.popupService.addPopUp();
  }

}
