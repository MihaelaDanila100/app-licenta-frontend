import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatSliderModule
  ]
})
export class MaterialModule { }
