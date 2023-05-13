import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Input() display: boolean = false;
  @Input() defaultSelectedIndex!: number;
  @Output() displayChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  updateVisibility(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
