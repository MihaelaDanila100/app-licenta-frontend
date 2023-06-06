import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhiteboardViewComponent } from './views/components/whiteboard-view/whiteboard-view.component';
import { TeacherPannelComponent } from './views/components/teacher/teacher-pannel/teacher-pannel.component';

const routes: Routes = [
  {
    path: 'whiteboard',
    component: WhiteboardViewComponent
  }, {
    path: 'teacher-pannel',
    component: TeacherPannelComponent
  }, {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
