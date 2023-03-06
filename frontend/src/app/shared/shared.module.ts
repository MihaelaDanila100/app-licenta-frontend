import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { MaterialModule } from './material/material.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PrimengComponentsModule } from './primeng-components/primeng-components.module';



@NgModule({
  declarations: [
    NavbarComponent,
    FullLayoutComponent,
    SidenavComponent
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
