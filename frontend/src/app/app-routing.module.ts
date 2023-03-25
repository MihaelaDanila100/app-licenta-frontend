import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhiteboardComponent } from './shared/components/whiteboard/whiteboard.component';
import { CanvasPannelComponent } from './views/canvas-pannel/canvas-pannel.component';

const routes: Routes = [
  {
    path: '',
    component: WhiteboardComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
