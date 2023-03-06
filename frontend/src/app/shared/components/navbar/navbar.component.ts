import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  public displaySideNav: boolean = false;

  ngOnInit(): void {
  }

  public toggleSideNav(): void {
    this.displaySideNav = !this.displaySideNav;
  }

}
