import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import jwt_decode from 'jwt-decode';
import { KeyConstants } from 'src/app/shared/data/constants/key-constants';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
    private dialogRef: MatDialogRef<LoginComponent>) { }

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  } 

  public login(): void {
    if(this.loginForm.valid) {
      this.authService.getToken(this.loginForm.value).subscribe((res) => {
        this.tokenService.saveToken(res);
        const decoded: any = jwt_decode(res);
        console.log("ahaaa ", decoded)
        this.authService.setUserRole(decoded[KeyConstants.TOKEN_ROLE_KEY]);
        this.route.navigateByUrl('teacher');
        this.dialogRef.close();
      });
    } 
  }

}
