import { Component } from '@angular/core';
import { IconService } from './shared/services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'frontend';
  public blockedShape: boolean = true;
  public opened: boolean = false;

  constructor(private matIconsService: IconService) {}

  toggleMenu(): void {
    this.opened = !this.opened;
  }
}
