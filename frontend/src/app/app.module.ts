import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
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
import { TeacherPannelComponent } from './views/teacher/teacher-pannel/teacher-pannel.component';
import { AccountSettingsComponent } from './views/teacher/account-settings/account-settings.component';
import { TeacherModule } from './views/teacher/teacher.module';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

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
    TeacherModule,
    SocialLoginModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('661260123774-gbdiekkqt81lvbt2cr8eqdbu287qahc8.apps.googleusercontent.com')
        }
      ],
      onError: (err: any) => {
        console.log(err)
      }
    } as SocialAuthServiceConfig
  }],
  bootstrap: [AppComponent],
  entryComponents: [CanvasWhiteboardComponent]
})
export class AppModule { }
