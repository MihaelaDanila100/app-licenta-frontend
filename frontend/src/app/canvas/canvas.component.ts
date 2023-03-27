import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  private canvas: any;
  private boundBox: any;
  private shape: any;

  constructor() { }

  ngOnInit(): void {

    this.canvas = new fabric.Canvas('canvas', {});

    this.boundBox = new fabric.Rect({
      width: 500,
      height: 600,
      fill: 'transparent',
      stroke: '#666',
      strokeDashArray: [5, 5]
    });

    this.shape = new fabric.Rect({
      width: 200,
      height: 200,
      fill: 'red'
    });

    this.canvas.add(this.boundBox);
    this.canvas.add(this.shape);
  }

}
