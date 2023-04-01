import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { MaterialModule } from './material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PrimengComponentsModule } from './primeng-components/primeng-components.module';
import { SidenavShapesComponent } from './components/sidenav-shapes/sidenav-shapes.component';
import { TextComponent } from './components/text/text.component';
import { SecondaryNavbarComponent } from './components/secondary-navbar/secondary-navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FullLayoutComponent,
    SidenavComponent,
    SidenavShapesComponent,
    TextComponent,
    SecondaryNavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengComponentsModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
