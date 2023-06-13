import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExportOptionsDialogComponent } from '../export-options-dialog/export-options-dialog.component';
import { FileService } from '../../services/file.service';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenService } from 'src/app/auth/services/token.service';
import { Router } from '@angular/router';
import { SaveWhiteboardComponent } from 'src/app/views/teacher/save-whiteboard/save-whiteboard.component';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  constructor(private dialog: MatDialog, 
    private fileService: FileService,
    private tokenService: TokenService,
    private popUpService: PopupService,
    private router: Router) { }

  @Output() openedNewWhiteboard: EventEmitter<any> = new EventEmitter<any>();
  @Output() savedWhiteboard: EventEmitter<any> = new EventEmitter<any>();
  public isLoggedIn: boolean = false;
  private openedNavbar: boolean = false;

  ngOnInit() {
    this.tokenService.tokenChangesObs.subscribe((res: boolean) => {
      this.isLoggedIn = res;
    });
  }

  public toggleSideNav(): void {
    this.openedNavbar = !this.openedNavbar;
    if(this.openedNavbar) this.popUpService.addPopUp();
    else this.popUpService.removePopUp();
  }

  public openExportDialog(): void {
    let dialogConfig = new MatDialogConfig()
    dialogConfig.width = '40vw';
    dialogConfig.height = '45vh';
    let dialogRef = this.dialog.open(ExportOptionsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if(data)  this.fileService.updateExportFile(data);
    });
  }

  public handleChosenFile(event: any): void {
    this.fileService.updateImportedFile(event.target.files[0]);
  }

  public openNewWhiteboard(): void {
    this.openedNewWhiteboard.emit();
  }

  public openLoginForm(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30vw';
    dialogConfig.height = '85vh';
    let dialogRef = this.dialog.open(LoginComponent, dialogConfig);
  }

  public logout(): void {
    this.tokenService.removeToken();
    this.router.navigateByUrl('');
  }

  public saveWhiteboard(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = "30vw";
    dialogConfig.height = "40vh";
    this.dialog.open(SaveWhiteboardComponent, dialogConfig);
  }

}
