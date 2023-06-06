import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IconService } from './shared/services/icon.service';
import { GraphService } from './shared/services/graph.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExportOptionsDialogComponent } from './shared/components/export-options-dialog/export-options-dialog.component';
import { CanvasWhiteboardComponent } from './views/components/canvas-whiteboard/canvas-whiteboard.component';
import { ShapeActionsService } from './shared/services/shape-actions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  public blockedShape: boolean = true;
  public opened: boolean = false;
  public closed: boolean = true;

  constructor(private graphService: GraphService, 
    private iconService: IconService,
    private actionsService: ShapeActionsService) {}

  ngAfterViewInit(): void {
  }

  toggleMenu(): void {
    this.opened = !this.opened;
    this.closed = !this.closed;
  }

  uploadFile(event: any): any {

  }

  generateWhiteboard() {
    this.actionsService.createWhiteboard();
  }

}
