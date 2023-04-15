import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorType } from '../../data/enums/color-types';
import { ActiveShapesService } from '../../services/active-shapes.service';

@Component({
  selector: 'app-options-navbar',
  templateUrl: './options-navbar.component.html',
  styleUrls: ['./options-navbar.component.scss']
})
export class OptionsNavbarComponent {
  
  @Input() display: boolean = false;
  @Output() displayChange: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  public updateVisibility(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
