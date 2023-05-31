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
  title = 'frontend';
  public blockedShape: boolean = true;
  public opened: boolean = false;
  public closed: boolean = true;
  public selectedNavbarIndex: any;

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

  uploadFile(event: any): any {

  }

  public generateWhiteboard() {
    if(this.whiteboardcontainer) this.whiteboardcontainer.clear();
    const factory = this.resolver.resolveComponentFactory(CanvasWhiteboardComponent);
    let whiteboardRef = this.whiteboardcontainer.createComponent(factory);
    whiteboardRef.changeDetectorRef.detectChanges();
  }
}
