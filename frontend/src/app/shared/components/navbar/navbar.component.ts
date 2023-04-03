import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor() { }

  public displaySideNav: boolean = false;

  public showColors(event: any): void {
    console.log("changesss ", event)
  }

  public toggleSideNav(): void {
    this.displaySideNav = !this.displaySideNav;
  }

}
