import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SprintModel } from '../../../services/api/sprints/sprint.model';
import { Router } from '@angular/router';
import { SprintsService } from '../../../services/api/sprints/sprints.service';
import { NgFor, NgIf } from '@angular/common';
import { TasksService } from '../../../services/api/tasks/tasks.service';
import { TasksModel } from '../../../services/api/tasks/tasks.model';
import { EventsService } from '../../../services/events.service';
import { GroupsService } from '../../../services/api/groups/groups.service';
import { GroupsModel } from '../../../services/api/groups/groups.model';
import { GroupItemComponent } from './group-item/group-item.component';

@Component({
  selector: 'app-sprint-item',
  standalone: true,
  imports: [NgFor, NgIf, GroupItemComponent],
  templateUrl: './sprint-item.component.html',
  styleUrl: './sprint-item.component.css'
})
export class SprintItemComponent {
  @Input() sprint!: SprintModel;

  constructor(
    private router: Router,
    private sprintsService: SprintsService,
    private tasksService: TasksService,
    private groupsService: GroupsService,
    private eventsService: EventsService
  ) {

  }

  ngOnInit(): void {
    //this.tasksService.fetch();

  }

  public groups() {
    return this.groupsService.get().filter((item: GroupsModel) => item.id_sprint == this.sprint.id);
  }

  public addGroup() {
    let model: GroupsModel = new GroupsModel(this.sprint.id, "");
    this.eventsService.publish("new-group-modal-open", model);
  }

  public editSprint() {
    this.eventsService.publish("new-sprint-modal-open", this.sprint);
  }

  public deleteSprint() {
    this.sprintsService.delete(this.sprint);
  }
}
