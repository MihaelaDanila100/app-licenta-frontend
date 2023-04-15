import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor() { }

  @Output() menuToggle: EventEmitter<any> = new EventEmitter<any>();

  public toggleSideNav(): void {
    this.menuToggle.emit();
  }

}
