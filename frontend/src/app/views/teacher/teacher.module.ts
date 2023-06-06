import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherPannelComponent } from './teacher-pannel/teacher-pannel.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    TeacherPannelComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MaterialModule
  ]
})
export class TeacherModule { }
