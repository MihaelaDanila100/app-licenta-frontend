import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { DrawingService } from '../../services/drawing.service';
import { ShapesService } from '../../services/shapes.service';
import { Edges } from '../../data/constants/edges';
import { BehaviorSubject } from 'rxjs';
import { EdgeTypes } from '../../data/enums/edge-types';

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
  private edges: any[] = [];
  private oldIndexValue: number = -1;
  private currentSelectedModeSbj: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  ngOnInit(): void {
    this.edgesCanvas = this.drawingService.createCanvas('edges_canvas', {
      preserveObjectStacking: true,
      width: 210
    });
    this.initEdges();
    this.observeEdgeModeChanging();
    this.edges.forEach((edge, index) => {
      edge.set('hasControls', false);
      this.edgesCanvas.add(edge);
      edge.on("mousedown", () => this.toggleEdge(index))
    });
  }

  public toggleEdge(index: number): void {
    let oldIndex = this.currentSelectedModeSbj.value;
    this.oldIndexValue = oldIndex;
    this.currentSelectedModeSbj.next(index);
    if(oldIndex >= 0) {
      if(this.edges[oldIndex]._objects) this.edges[oldIndex]._objects[0].set('backgroundColor', 'transparent');
      else this.edges[oldIndex].set('backgroundColor', 'transparent');
    }
  }

  private initEdges() {
    this.edges.push(this.shapeService.createLine(Edges.line));
    this.edges.push(this.shapeService.createLineWithText(Edges.lineWithCosts.line, Edges.lineWithCosts.text));
    this.edges.push(this.shapeService.createArrow(Edges.arrowLine));
    this.edges.push(this.shapeService.createDashedLine(Edges.dashedLine));
  }

  private observeEdgeModeChanging(): void {
    this.currentSelectedModeSbj.asObservable().subscribe((newIndex) => {
      if(newIndex >= 0) {
        if(this.oldIndexValue != newIndex) {
          if(this.edges[newIndex]._objects) this.edges[newIndex]._objects[0].set('backgroundColor', '#e6f0f0');
          else this.edges[newIndex].set('backgroundColor', '#e6f0f0');
        }

        switch (newIndex) {
          case 0:
            this.graphService.toggleEdges(EdgeTypes.UNORIENTED_WITH_NO_COST);
            break;
          
          case 1:
            this.graphService.toggleEdges(EdgeTypes.UNORIENTED_WITH_COST);
            break;
          
          case 2:
            this.graphService.toggleEdges(EdgeTypes.ORIENTED_WITH_NO_COST);
            break;
          
          case 3:
            this.graphService.toggleEdges(EdgeTypes.DASHED_EDGE);
            break;
        
          default:
            break;
        }
      }
    });
  }

}
