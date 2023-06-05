import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExportOptionsDialogComponent } from '../export-options-dialog/export-options-dialog.component';
import { FileService } from '../../services/file.service';
import { LoginPopupComponent } from 'src/app/views/components/login-popup/login-popup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private dialog: MatDialog, private fileService: FileService) { }

  @Output() toggledMenu: EventEmitter<any> = new EventEmitter<any>();
  @Output() openedNewWhiteboard: EventEmitter<any> = new EventEmitter<any>();

  public toggleSideNav(): void {
    this.toggledMenu.emit();
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
    dialogConfig.height = '70vh';
    let dialogRef = this.dialog.open(LoginPopupComponent, dialogConfig);
  }

}
