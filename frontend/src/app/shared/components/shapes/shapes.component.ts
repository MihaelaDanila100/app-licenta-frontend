import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SideNavShapes } from '../../data/constants/sidenav-shapes';
import { ShapesService } from '../../services/shapes.service';

@Component({
  selector: 'app-shapes',
  templateUrl: './shapes.component.html',
  styleUrls: ['./shapes.component.scss']
})
export class ShapesComponent implements OnInit {

  public configStage = new BehaviorSubject({
    width: 500,
    height: 500
  });
  public shapes: any = {};


  constructor(private shapesService: ShapesService) { }

  ngOnInit(): void {
    this.configStage.next({
      width: 200, 
      height: 300
    });
    this.initShapes();
  }

  private initShapes(): void {
    this.shapes["circle"] = this.shapesService.drawCircle(SideNavShapes.circle);
    this.shapes["dottedCircle"] = this.shapesService.drawDashedCircle(SideNavShapes.dottedCircle);
    this.shapes["square"] = this.shapesService.drawRectangle(SideNavShapes.square);
    this.shapes["dottedSquare"] = this.shapesService.drawDashedRectangle(SideNavShapes.dottedSqare);
  }

}
