import { Component, Input, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-inline-popup',
  templateUrl: './inline-popup.component.html',
  styleUrls: ['./inline-popup.component.scss']
})
export class InlinePopupComponent implements OnInit {

  public visible: boolean = false;

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.inlineModals.subscribe(() => {
      this.visible = true;
    });
  }

}
