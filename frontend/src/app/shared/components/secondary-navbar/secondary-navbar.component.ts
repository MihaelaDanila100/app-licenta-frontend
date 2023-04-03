import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActiveShapesService } from '../../services/active-shapes.service';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.scss']
})
export class SecondaryNavbarComponent implements OnInit {

  public unlocked: boolean = true; 

  constructor(private activeShapesService: ActiveShapesService) { }

  ngOnInit(): void {
    this.activeShapesService.selectedShape.subscribe((res: boolean) => {
      this.unlocked = res;
    })
  }

  public lockShape(): void {
    this.activeShapesService.selectShape();
  }

}
