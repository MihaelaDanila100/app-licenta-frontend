import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherPannelComponent } from './components/teacher-pannel/teacher-pannel.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SaveWhiteboardComponent } from './save-whiteboard/save-whiteboard.component';
import { GroupsViewComponent } from './components/groups-view/groups-view.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TeacherPannelComponent,
    AccountSettingsComponent,
    SaveWhiteboardComponent,
    GroupsViewComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class TeacherModule { }
