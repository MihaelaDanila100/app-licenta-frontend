import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawingService } from 'src/app/shared/services/drawing.service';
import { GraphService } from 'src/app/shared/services/graph.service';
import { fabric } from 'fabric';

@Component({
  selector: 'app-save-whiteboard',
  templateUrl: './save-whiteboard.component.html',
  styleUrls: ['./save-whiteboard.component.scss']
})
export class SaveWhiteboardComponent implements OnInit {

  public loading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(private graphService: GraphService,
    private drawingService: DrawingService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.graphService.currentGraphDrawingObs.subscribe((res) => {
        console.log("resss ", res)
        return 
      })
    )
  }

}
