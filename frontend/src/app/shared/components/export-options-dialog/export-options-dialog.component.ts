import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-export-options-dialog',
  templateUrl: './export-options-dialog.component.html',
  styleUrls: ['./export-options-dialog.component.scss']
})
export class ExportOptionsDialogComponent implements OnInit {

  public chosenExportMode!: string;

  constructor(private dialogRef: MatDialogRef<ExportOptionsDialogComponent>) { }

  ngOnInit(): void {
  }

  selectMode(mode: string) {
    this.chosenExportMode = mode;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  exportCanvas(): void {
    this.dialogRef.close(this.chosenExportMode);
  }

}
