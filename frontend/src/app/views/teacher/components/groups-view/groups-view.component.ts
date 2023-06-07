import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { Group } from '../../interfaces/group';

@Component({
  selector: 'app-groups-view',
  templateUrl: './groups-view.component.html',
  styleUrls: ['./groups-view.component.scss']
})
export class GroupsViewComponent implements OnInit {

  constructor(private groupsService: GroupsService) { }

  public teacherGroups: Group[] = [];
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

}
