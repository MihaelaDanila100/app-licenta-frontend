import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherPannelComponent } from './teacher-pannel/teacher-pannel.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherPannelComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
