import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupsService } from '../../services/groups.service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.scss']
})
export class ManageStudentsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ManageStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupsService,
    private studentsService: StudentsService) { }
  
  public groupId!: string;

  ngOnInit(): void {
    this.groupId = this.data.groupId;
    this.studentsService.getAllStudents().subscribe((res) => {
      console.log("resss ", res)
    })

  }

}
