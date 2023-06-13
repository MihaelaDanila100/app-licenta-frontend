import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupsService } from '../../services/groups.service';
import { StudentsService } from '../../services/students.service';
import { switchMap } from 'rxjs';

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
  
  public newGroupStudents: any[] = [];
  public existingGroupStudents: any[] = [];

  public displayNewStudents: any[] = [];
  public displayExistingGroupStudents: any[] = [];

  public newStudents: any[] = [];
  public deletedStudents: string = '';

  ngOnInit(): void {
    this.groupId = this.data.groupId;
    this.studentsService.getAllStudents().pipe(
      switchMap((res) => {
        this.newGroupStudents = res;
        return this.studentsService.getStudentsForGroup(this.groupId);
      })
    ).subscribe((res) => {
      this.existingGroupStudents = res;
      this.displayExistingGroupStudents = [...this.existingGroupStudents];
      this.newGroupStudents = this.newGroupStudents.filter(student => this.existingGroupStudents.findIndex((existing) => existing.id == student.id) > 1);
      this.displayNewStudents = [...this.newGroupStudents];
    });

  }

  public filternewStudents(event: any) {
    let inputField = event.target.value;
    if(inputField.trim() != '') {
      this.displayNewStudents = this.displayNewStudents.filter((student) => student.email.includes(inputField));
    } else {
      this.displayNewStudents = [...this.newGroupStudents];
    }
  }

  public filterExistingStudents(event: any) {
    let inputField = event.target.value;
    if(inputField.trim() != '') {
      this.displayExistingGroupStudents = this.displayExistingGroupStudents.filter((student) => student.email.includes(inputField));
    } else {
      this.displayExistingGroupStudents = [...this.existingGroupStudents];
    }
  }

  public chooseStudent(event: any, newStudent: any): void {
    if(event.checked == true) {
      this.newStudents.unshift(newStudent.email);
    } else {
      let index = this.newStudents.findIndex((student) => student.id == newStudent.id);
      this.newStudents.splice(index, 1);
    }
  }

  public addStudents() {
    console.log("newww ", this.newStudents)
    
  }
}
