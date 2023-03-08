import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SideNavArrows } from '../../data/constants/sidenav-arrows';
import { ArrowsService } from '../../services/arrows.service';

@Component({
  selector: 'app-arrows',
  templateUrl: './arrows.component.html',
  styleUrls: ['./arrows.component.scss']
})
export class ArrowsComponent implements OnInit {

  public configStage = new BehaviorSubject({
    width: 500,
    height: 500
  });
  public arrows: any = {};

  constructor(private arrowsService: ArrowsService) { }

  ngOnInit(): void {
    this.configStage.next({
      width: 200,
      height: 300
    });
    this.initArrows();
  }

  private initArrows(): void {
    this.arrows["line"] = this.arrowsService.drawLine(SideNavArrows.line);
    this.arrows["dashedLine"] = this.arrowsService.drawLine(SideNavArrows.dashedLine);
    this.arrows["arrow"] = this.arrowsService.drawArrow(SideNavArrows.arrow);
  }

}
