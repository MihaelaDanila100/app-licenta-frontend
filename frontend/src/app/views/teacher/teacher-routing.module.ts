import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherPannelComponent } from './teacher-pannel/teacher-pannel.component';
import { GroupsViewComponent } from './components/groups-view/groups-view.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherPannelComponent,
    pathMatch: 'full'
  }, {
    path: 'groups',
    component: GroupsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
