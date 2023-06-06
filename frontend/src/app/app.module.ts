import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasWhiteboardComponent } from './views/components/canvas-whiteboard/canvas-whiteboard.component';
import { MaterialModule } from './shared/material/material.module';
import { LoginComponent } from './auth/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { WhiteboardViewComponent } from './views/components/whiteboard-view/whiteboard-view.component';
import { TeacherPannelComponent } from './views/components/teacher/teacher-pannel/teacher-pannel.component';
import { AccountSettingsComponent } from './views/components/teacher/account-settings/account-settings.component';
import { TeacherModule } from './views/components/teacher/teacher.module';

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
    AuthModule,
    TeacherModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CanvasWhiteboardComponent]
})
export class AppModule { }
