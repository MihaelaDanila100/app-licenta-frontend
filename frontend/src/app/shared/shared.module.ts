import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { PrimengComponentsModule } from './primeng-components/primeng-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavShapesComponent } from './components/sidenav-shapes/sidenav-shapes.component';
import { TextComponent } from './components/text/text.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FullLayoutComponent,
    SidenavComponent,
    SidenavShapesComponent,
    TextComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengComponentsModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    MaterialModule,
    PrimengComponentsModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
