import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhiteboardViewComponent } from './views/components/whiteboard-view/whiteboard-view.component';

const routes: Routes = [
  {
    path: 'whiteboard',
    component: WhiteboardViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
