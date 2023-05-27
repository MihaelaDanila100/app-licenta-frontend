import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraphService } from '../../services/graph.service';
import { fabric } from 'fabric';
import jsPDF from 'jspdf';
import { DrawingService } from '../../services/drawing.service';

@Component({
  selector: 'app-save-pdf-popup',
  templateUrl: './save-pdf-popup.component.html',
  styleUrls: ['./save-pdf-popup.component.scss']
})
export class SavePdfPopupComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription = new Subscription();
  public graphCanvas!: fabric.Canvas;
  public currentSelectedColor: string = 'transparent';
  public currentDocumentName: string = "myCanvas";
  public currentSliderValue: number = 3.0;

  constructor(private drawingService: DrawingService, 
    private graphService: GraphService) { }

  ngOnInit(): void {
    this.graphCanvas = this.drawingService.createCanvas('graph_canvas', {});
    this.graphCanvas.setDimensions({
      width: window.innerWidth * 50 / 100,
      height: window.innerHeight * 43 / 100
    });
    this.subscription.add(
      this.graphService.currentGraphDrawingObs.subscribe((res) => {
        console.log("resss ", res)
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

  public downloadAsPDF() {
    let myLink = document.createElement("a");
    this.graphCanvas.setZoom(0.25);
    // this.graphCanvas.renderAll();
    let imageData = this.graphCanvas.toDataURL({
      format: 'png',
      multiplier: this.currentSliderValue
    });
    let pdfConverter = new jsPDF();
    pdfConverter.addImage(imageData, 'png', 0, 0, this.graphCanvas.getWidth(), this.graphCanvas.getHeight());
    pdfConverter.save("result.pdf");
  }

}
