import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasWhiteboardComponent } from './components/canvas-whiteboard/canvas-whiteboard.component';
import { ColorChooserComponent } from './components/color-chooser/color-chooser.component';
import { OptionsNavbarComponent } from './components/options-navbar/options-navbar.component';
import { SecondaryNavbarComponent } from './components/secondary-navbar/secondary-navbar.component';
import { ShapeOptionsComponent } from './components/shape-options/shape-options.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CanvasWhiteboardComponent,
    ColorChooserComponent,
    OptionsNavbarComponent,
    SecondaryNavbarComponent,
    ShapeOptionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DrawingPageModule { }
