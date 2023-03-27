import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-line-pannel',
  templateUrl: './line-pannel.component.html',
  styleUrls: ['./line-pannel.component.scss']
})
export class LinePannelComponent implements OnInit {

  private canvas_container!: fabric.Canvas;
  private line!: fabric.Line;
  private mouseDown: boolean = false;
  private continuous: boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.canvas_container = new fabric.Canvas('canvas_container', {
      width: window.innerWidth,
      height: 600
    });
  }

  public startDrawingLine() {
    this.canvas_container.on('mouse:down', (object: any) => {
      this.mouseDown = true;
      const pointer = this.canvas_container.getPointer(object.e);
      this.line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        stroke: 'red',
        strokeWidth: 3
      });
      this.canvas_container.add(this.line);
      this.canvas_container.requestRenderAll();
    });
    this.canvas_container.on('mouse:move', (object: any) => {
      if(this.mouseDown || this.continuous) {
        const pointer = this.canvas_container.getPointer(object.e);
        this.line.set({
          x2: pointer.x,
          y2: pointer.y
        });
        this.canvas_container.requestRenderAll();
      }
    });
    this.canvas_container.on('mouse:up', () => {
      this.mouseDown = false; 
    });
  }

  public activateContinuous() {
    this.continuous = !this.continuous;
  }

}
