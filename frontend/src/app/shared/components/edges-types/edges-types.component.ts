import { Component, OnDestroy, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { DrawingService } from '../../services/drawing.service';

@Component({
  selector: 'app-edges-types',
  templateUrl: './edges-types.component.html',
  styleUrls: ['./edges-types.component.scss']
})
export class EdgesTypesComponent implements OnInit {

  constructor(private graphService: GraphService, 
    private drawingService: DrawingService) { }
  
  private edgesCanvas!: fabric.Canvas;
  private edges: fabric.Object[] = [];

  ngOnInit(): void {
    this.edgesCanvas = this.drawingService.createCanvas('edges_canvas', {
      preserveObjectStacking: true,
      width: 210
    });
    this.initEdges();
  }

  public toggleEdgeMode(): void {
    this.graphService.toggleEdges();
  }

  private initEdges() {
    console.log("ahaaaa ", this.edgesCanvas)
  }

}
