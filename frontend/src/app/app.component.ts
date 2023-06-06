import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IconService } from './shared/services/icon.service';
import { GraphService } from './shared/services/graph.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExportOptionsDialogComponent } from './shared/components/export-options-dialog/export-options-dialog.component';
import { CanvasWhiteboardComponent } from './views/canvas-whiteboard/canvas-whiteboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('whiteboardcontainer', { read: ViewContainerRef }) whiteboardcontainer!: ViewContainerRef;
  public blockedShape: boolean = true;
  public opened: boolean = false;
  public closed: boolean = true;

  constructor(private graphService: GraphService, 
    private iconService: IconService,
    private resolver: ComponentFactoryResolver) {}

  ngAfterViewInit(): void {
    this.generateWhiteboard();
  }

  toggleMenu(): void {
    this.opened = !this.opened;
    this.closed = !this.closed;
  }

  uploadFile(event: any): any {

  }

  public generateWhiteboard() {
    this.graphService.saveWhiteboard();
    const factory = this.resolver.resolveComponentFactory(CanvasWhiteboardComponent);
    let whiteboardRef = this.whiteboardcontainer.createComponent(factory);
    whiteboardRef.changeDetectorRef.detectChanges();
  }
}
