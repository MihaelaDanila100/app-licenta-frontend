import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-sidenav-shapes',
  templateUrl: './sidenav-shapes.component.html',
  styleUrls: ['./sidenav-shapes.component.scss']
})
export class SidenavShapesComponent implements OnInit {

  private shapesCanvas!: fabric.Canvas;

  constructor() { }

  ngOnInit(): void {
    this.shapesCanvas = new fabric.Canvas('canvas', {});
  }

}
