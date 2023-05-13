import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { DrawingService } from '../../services/drawing.service';
import { ShapesService } from '../../services/shapes.service';
import { Edges } from '../../data/constants/edges';

@Component({
  selector: 'app-edges-types',
  templateUrl: './edges-types.component.html',
  styleUrls: ['./edges-types.component.scss']
})
export class EdgesTypesComponent implements OnInit {

  constructor(private graphService: GraphService, 
    private drawingService: DrawingService,
    private shapeService: ShapesService) { }
  
  private edgesCanvas!: fabric.Canvas;
  private edges: fabric.Object[] = [];

  ngOnInit(): void {
    this.edgesCanvas = this.drawingService.createCanvas('edges_canvas', {
      preserveObjectStacking: true,
      width: 210
    });
    this.initEdges();
    this.edges.forEach((edge) => {
      this.edgesCanvas.add(edge);
    });
    this.edges[0].on("mousedown", () => this.toggleEdgeMode());
  }

  public toggleEdgeMode(): void {
    this.graphService.toggleEdges();
  }

  private initEdges() {
    this.edges.push(this.shapeService.createLine(Edges.line));
  }

}
