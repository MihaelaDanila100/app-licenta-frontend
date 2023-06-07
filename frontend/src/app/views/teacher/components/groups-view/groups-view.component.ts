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

  ngOnInit(): void {
    this.groupsService.getAllGroups().subscribe((res) => {
      this.teacherGroups = res;
    });
  }

}
