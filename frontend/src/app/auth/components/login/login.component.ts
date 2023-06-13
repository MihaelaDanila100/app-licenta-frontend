import { AfterViewInit, ElementRef, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import jwt_decode from 'jwt-decode';
import { KeyConstants } from 'src/app/shared/data/constants/key-constants';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private route: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private _ngZone: NgZone) { }

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.required)
  });
  @ViewChild('loginBtn') loginBtn!: ElementRef;

  ngOnInit(): void {
      //@ts-ignore
      google.accounts.id.initialize({
        client_id: '254058162359-gf7l6tkrl4p1e0so4u5h545peg3irtdn.apps.googleusercontent.com',
        callback: this.handleCredentialsResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      //@ts-ignore
      google.accounts.id.renderButton(
        //@ts-ignore
        document.getElementById('loginBtn'),
        { theme: "outline", size: "large", width: "100%" }
      );
      //@ts-ignore
      google.accounts.id.prompt((nottification: PromptMomentNotification) => {});

  } 

  public login(): void {
    if(this.loginForm.valid) {
      this.authService.getToken(this.loginForm.value).subscribe((res: any) => {
        console.log("shit")
        let token = res.token;
        this.tokenService.saveToken(token);
        const decoded: any = jwt_decode(token);
        this.authService.setUserRole(decoded[KeyConstants.TOKEN_ROLE_KEY]);
        debugger;
        this.route.navigate(['teacher/pannel']);
        this.dialogRef.close();
      });
    } 
  }

  private handleToken = (res: any) => {
  }

  public loginWithGoogle(): void {
    
  }

  async handleCredentialsResponse(response: CredentialResponse) {
    await this.authService.loginInWithGoogle(response.credential).subscribe(
      (res: any) => {
        console.log("resss ", res)
        localStorage.setItem("token", res.token);
        this._ngZone.run(() => {
          this.route.navigateByUrl('teacher');
        })
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
