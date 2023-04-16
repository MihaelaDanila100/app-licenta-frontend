import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-options-navbar',
  templateUrl: './options-navbar.component.html',
  styleUrls: ['./options-navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OptionsNavbarComponent {
  
  @Input() display: boolean = false;
  @Input() selectedIndex: number = 0;

  constructor() { }

}
