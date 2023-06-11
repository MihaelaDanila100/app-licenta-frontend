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
import { OptionsNavbarComponent } from './components/options-navbar/options-navbar.component';
import { InlinePopupComponent } from './components/inline-popup/inline-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorChooserComponent } from './components/color-chooser/color-chooser.component';
import { ShapeOptionsComponent } from './components/shape-options/shape-options.component';
import { EdgesTypesComponent } from './components/edges-types/edges-types.component';
import { ExportOptionsDialogComponent } from './components/export-options-dialog/export-options-dialog.component';
import { SaveJpgPopupComponent } from './components/save-jpg-popup/save-jpg-popup.component';
import { SavePdfPopupComponent } from './components/save-pdf-popup/save-pdf-popup.component';
import { AddEdgeComponent } from './components/add-edge/add-edge.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    FullLayoutComponent,
    SidenavComponent,
    SidenavShapesComponent,
    TextComponent,
    SecondaryNavbarComponent,
    OptionsNavbarComponent,
    InlinePopupComponent,
    ColorChooserComponent,
    ShapeOptionsComponent,
    EdgesTypesComponent,
    ExportOptionsDialogComponent,
    SaveJpgPopupComponent,
    SavePdfPopupComponent,
    AddEdgeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PrimengComponentsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    MaterialModule,
    SidenavComponent,
    SecondaryNavbarComponent,
    OptionsNavbarComponent
  ]
})
export class SharedModule { }
