import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasWhiteboardComponent } from './views/canvas-whiteboard/canvas-whiteboard.component';
import { MaterialModule } from './shared/material/material.module';
import { LoginComponent } from './auth/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { WhiteboardViewComponent } from './views/whiteboard-view/whiteboard-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasWhiteboardComponent,
    WhiteboardViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CanvasWhiteboardComponent]
})
export class AppModule { }
