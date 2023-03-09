import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasPannelComponent } from './views/canvas-pannel/canvas-pannel.component';

const routes: Routes = [
  {
    path: '',
    component: CanvasPannelComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
