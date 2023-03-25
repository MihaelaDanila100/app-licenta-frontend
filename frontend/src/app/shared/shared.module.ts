import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { MaterialModule } from './material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PrimengComponentsModule } from './primeng-components/primeng-components.module';
import { KonvaModule } from "ng2-konva";
import { ShapesComponent } from './components/shapes/shapes.component';
import { ArrowsComponent } from './components/arrows/arrows.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FullLayoutComponent,
    SidenavComponent,
    ShapesComponent,
    ArrowsComponent,
    WhiteboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengComponentsModule,
    KonvaModule
  ],
  exports: [
    NavbarComponent,
    WhiteboardComponent
  ]
})
export class SharedModule { }
