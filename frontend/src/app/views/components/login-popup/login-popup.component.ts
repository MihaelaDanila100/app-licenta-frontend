import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPopupComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
