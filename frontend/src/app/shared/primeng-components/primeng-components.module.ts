import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { SidebarModule } from 'primeng/sidebar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccordionModule,
    SidebarModule,
    ColorPickerModule,
    FormsModule,
    TooltipModule,
    ConfirmPopupModule
  ],
  exports: [
    AccordionModule,
    SidebarModule,
    ColorPickerModule,
    FormsModule,
    TooltipModule,
    ConfirmPopupModule
  ]
})
export class PrimengComponentsModule { }
