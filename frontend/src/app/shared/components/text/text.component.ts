import { Component, OnInit } from '@angular/core';
import { DrawingService } from '../../services/drawing.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  private textCanvas!: fabric.Canvas;
  private text!: fabric.Text;

  constructor(private canvasService: DrawingService) { }

  ngOnInit(): void {
    this.textCanvas = this.canvasService.createCanvas('text_canvas', {});
    this.textCanvas.add(this.canvasService.createText({
      value: 'Text',
      showControls: false
    }));
  }

}
