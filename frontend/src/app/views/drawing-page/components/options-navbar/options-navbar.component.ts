import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorType } from '../../../../shared/data/enums/color-types';
import { ActiveShapesService } from '../../../../shared/services/active-shapes.service';

@Component({
  selector: 'app-options-navbar',
  templateUrl: './options-navbar.component.html',
  styleUrls: ['./options-navbar.component.scss']
})
export class OptionsNavbarComponent {
  
  @Input() display: boolean = false;
  @Input() selectedIndex: number = 0;
  @Output() displayChange: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  public updateVisibility(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
