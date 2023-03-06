import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { SidebarModule } from 'primeng/sidebar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccordionModule,
    SidebarModule
  ],
  exports: [
    AccordionModule,
    SidebarModule
  ]
})
export class PrimengComponentsModule { }
