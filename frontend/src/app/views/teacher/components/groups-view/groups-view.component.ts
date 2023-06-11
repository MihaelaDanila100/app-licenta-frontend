import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { Group } from '../../interfaces/group';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-groups-view',
  templateUrl: './groups-view.component.html',
  styleUrls: ['./groups-view.component.scss']
})
export class GroupsViewComponent implements OnInit {

  constructor(private groupsService: GroupsService,
    private dialog: MatDialog) { }

  public teacherGroups: Group[] = [];
  public newTeacherGroup: Group[] = [];
  public editable: boolean[] = [];

  ngOnInit(): void {
    this.groupsService.getAllGroups().subscribe((res) => {
      this.teacherGroups = res;
      this.editable = Array(this.teacherGroups.length).fill(false);
    });
  }

  public editGroup(index: number): void {
    this.editable[index] = !this.editable[index];
    if(this.editable[index] === false) {
      let selectedGroup = this.teacherGroups[index];
      if(selectedGroup.name[index].match(/[A-Za-z]+/)) {
        this.groupsService.editGroup(selectedGroup).subscribe(() => {});
      }
    } else {
      this.editable[index] = true;
    }
  }

  public openGroupForm(): void {
    this.newTeacherGroup.unshift({
      name: '',
      teacherId: ''
    });
  }

  public saveGroup(group: Group, index: number): void {
    this.groupsService.addGroup(group).subscribe((res) => {
      this.newTeacherGroup.splice(index, 1);
      this.teacherGroups.unshift(group);
    });
  }

}
