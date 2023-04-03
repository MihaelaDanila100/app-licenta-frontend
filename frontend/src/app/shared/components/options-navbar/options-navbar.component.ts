import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-options-navbar',
  templateUrl: './options-navbar.component.html',
  styleUrls: ['./options-navbar.component.scss']
})
export class OptionsNavbarComponent implements OnInit {
  
  @Input() display: boolean = false;
  @Output() displayChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public updateVisibility(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
