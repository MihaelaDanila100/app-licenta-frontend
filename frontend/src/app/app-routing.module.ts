import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { LinePannelComponent } from './line-pannel/line-pannel.component';

const routes: Routes = [
  {
    path: '',
    component: CanvasComponent,
    pathMatch: 'full'
  }, {
    path: 'lines',
    component: LinePannelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
