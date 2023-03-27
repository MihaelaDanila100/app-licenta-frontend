import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-line-pannel',
  templateUrl: './line-pannel.component.html',
  styleUrls: ['./line-pannel.component.scss']
})
export class LinePannelComponent implements OnInit {

  private canvas_container: any;

  constructor() { }

  ngOnInit(): void {

    this.canvas_container = new fabric.Canvas('canvas_container', {
      width: window.innerWidth,
      height: 600
    });
  }

}
