import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/shared/services/graph.service';

@Component({
  selector: 'app-whiteboard-view',
  templateUrl: './whiteboard-view.component.html',
  styleUrls: ['./whiteboard-view.component.scss']
})
export class WhiteboardViewComponent implements OnInit {

  public opened: boolean = false;
  public closed: boolean = true;
  public selectedNavbarIndex: any;

  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
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
