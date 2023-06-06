import { AfterViewInit, Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { GraphService } from 'src/app/shared/services/graph.service';
import { CanvasWhiteboardComponent } from '../canvas-whiteboard/canvas-whiteboard.component';
import { ShapeActionsService } from 'src/app/shared/services/shape-actions.service';

@Component({
  selector: 'app-whiteboard-view',
  templateUrl: './whiteboard-view.component.html',
  styleUrls: ['./whiteboard-view.component.scss']
})
export class WhiteboardViewComponent implements AfterViewInit {

  @ViewChild('whiteboardcontainer', { read: ViewContainerRef }) whiteboardcontainer!: ViewContainerRef;
  public opened: boolean = false;
  public closed: boolean = true;
  public selectedNavbarIndex: any;

  constructor(private graphService: GraphService,
    private resolver: ComponentFactoryResolver,
    private shapeActionsService: ShapeActionsService) { }

  ngAfterViewInit(): void {
    this.shapeActionsService.newWhiteBoardObs.subscribe(() => {
      this.generateWhiteboard();
    });
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

  public generateWhiteboard() {
    this.graphService.saveWhiteboard();
    const factory = this.resolver.resolveComponentFactory(CanvasWhiteboardComponent);
    let whiteboardRef = this.whiteboardcontainer.createComponent(factory);
    whiteboardRef.changeDetectorRef.detectChanges();
  }
}

