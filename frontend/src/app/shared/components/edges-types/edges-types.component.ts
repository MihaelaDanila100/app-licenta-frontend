import { Component, OnDestroy, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-edges-types',
  templateUrl: './edges-types.component.html',
  styleUrls: ['./edges-types.component.scss']
})
export class EdgesTypesComponent implements OnInit {

  constructor(private graphService: GraphService) { }

  ngOnInit(): void {
  }

  public toggleEdgeMode(): void {
    this.graphService.toggleEdges();
  }

}
