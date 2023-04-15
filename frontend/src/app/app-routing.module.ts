import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasWhiteboardComponent } from './views/drawing-page/components/canvas-whiteboard/canvas-whiteboard.component';
import { FullLayoutComponent } from './shared/components/full-layout/full-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        component: CanvasWhiteboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
