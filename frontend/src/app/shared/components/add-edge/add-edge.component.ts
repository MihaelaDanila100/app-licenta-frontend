import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-add-edge',
  templateUrl: './add-edge.component.html',
  styleUrls: ['./add-edge.component.scss']
})
export class AddEdgeComponent implements OnInit {

  public edgeForm: FormGroup = this.fb.group({
    leftNode: new FormControl('', Validators.required),
    rightNode: new FormControl('', Validators.required)
  });
  public currentAdjacencyList: any[][] = [];

  constructor(private fb: FormBuilder, private graphService: GraphService) { }

  ngOnInit(): void {
    this.graphService.currentGraphObj.subscribe((newGraph) => {
      this.currentAdjacencyList = newGraph.adjacency_list;
    });
    this.graphService.askForGraph();
  }

}
