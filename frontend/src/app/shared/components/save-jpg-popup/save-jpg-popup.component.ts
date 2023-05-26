import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GraphService } from '../../services/graph.service';
import { fabric } from 'fabric';
import { DrawingService } from '../../services/drawing.service';

@Component({
  selector: 'app-save-jpg-popup',
  templateUrl: './save-jpg-popup.component.html',
  styleUrls: ['./save-jpg-popup.component.scss']
})
export class SaveJpgPopupComponent implements OnInit, OnDestroy {

  constructor(private dialogRef: MatDialogRef<SaveJpgPopupComponent>,
    private graphService: GraphService,
    private drawingService: DrawingService) { }

  public currentSliderValue: number = 1.0;
  private subscription: Subscription = new Subscription();
  public graphCanvas!: fabric.Canvas;

  ngOnInit(): void {
    this.graphCanvas = this.drawingService.createCanvas('graph_canvas', {});
    this.graphCanvas.setDimensions({
      width: window.innerWidth * 50 / 100,
      height: window.innerHeight * 43 / 100
    });
    this.subscription.add(
      this.graphService.currentGraphDrawingObs.subscribe((res) => {
        fabric.loadSVGFromString(JSON.parse(res), (objects, options) => {
          this.graphCanvas.add(fabric.util.groupSVGElements(objects, options));
          this.graphCanvas.setZoom(0.5);
          this.graphCanvas.renderAll();
        })
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public downloadCanvas(): void {
    let myLink = document.createElement("a");
    let imageData = this.graphCanvas.toDataURL({
      format: 'png'
    })
    myLink.href = imageData;
    myLink.download = "myCanvas.png";
    document.body.appendChild(myLink);
    myLink.click();
    document.body.removeChild(myLink);
  }

}
