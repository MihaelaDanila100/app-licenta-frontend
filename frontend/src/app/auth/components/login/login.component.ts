import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private dialog: MatDialog, 
    private fb: FormBuilder,
    private authService: AuthService) { }

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  } 

  public login(): void {
    if(this.loginForm.valid) {
      this.authService.getToken(this.loginForm.value).subscribe((res) => {
        console.log("resss")
      })
    } 
  }

}
