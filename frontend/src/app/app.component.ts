import { Component } from '@angular/core';
import { IconService } from './shared/services/icon.service';
import { GraphService } from './shared/services/graph.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'frontend';
  public blockedShape: boolean = true;
  public opened: boolean = false;
  public closed: boolean = true;
  public selectedNavbarIndex: any;

  constructor(private matIconsService: IconService, private graphService: GraphService) {}

  toggleMenu(): void {
    this.opened = !this.opened;
    this.closed = !this.closed;
  }

  openMenu(event: any): void {
    if(event) {
      this.opened = true;
      this.selectedNavbarIndex = 2;
      this.closed = false;
    } else {
      this.opened = false;
      this.closed = true;
      this.selectedNavbarIndex = null;
      this.graphService.toggleEdges();
    }
  }
}
