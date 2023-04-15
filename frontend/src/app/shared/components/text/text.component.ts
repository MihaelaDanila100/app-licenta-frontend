import { Component, OnInit } from '@angular/core';
import { DrawingService } from '../../services/drawing.service';
import { ActiveShapesService } from '../../services/active-shapes.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  private textCanvas!: fabric.Canvas;
  private text!: fabric.Text;

  constructor(private canvasService: DrawingService,
    private activeShapesService: ActiveShapesService) { }

  ngOnInit(): void {
    this.textCanvas = this.canvasService.createCanvas('text_canvas', {
      width: 210
    });
    this.textCanvas.add(this.canvasService.createText({
      value: 'Text',
      showControls: false
    }));
    this.textCanvas.on("mouse:down", (event: any) => {
      if(event.target) this.activeShapesService.addShapeToWhiteboard(event.target);
    })
  }

}
