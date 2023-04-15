import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor() { }

  @Output() toggledMenu: EventEmitter<any> = new EventEmitter<any>();

  public toggleSideNav(): void {
    this.toggledMenu.emit();
  }

}
