import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhiteboardViewComponent } from './views/components/whiteboard-view/whiteboard-view.component';
import { TeacherPannelComponent } from './views/teacher/components/teacher-pannel/teacher-pannel.component';
import { TeacherGuard } from './auth/guards/teacher.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    redirectTo: 'whiteboard'
  },
  {
    path: 'whiteboard',
    component: WhiteboardViewComponent
  }, {
    path: 'teacher',
    loadChildren: () => import('./views/teacher/teacher.module').then(m => m.TeacherModule),
    canActivate: [TeacherGuard]
  },{
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
