import { Component, Input } from '@angular/core';
import { GroupsModel } from '../../../../services/api/groups/groups.model';
import { TasksService } from '../../../../services/api/tasks/tasks.service';
import { TasksModel } from '../../../../services/api/tasks/tasks.model';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../../../services/events.service';
import { GroupsService } from '../../../../services/api/groups/groups.service';

@Component({
  selector: 'app-group-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-item.component.html',
  styleUrl: './group-item.component.css'
})
export class GroupItemComponent {
  @Input() group!: GroupsModel;

  constructor(
    private tasksService: TasksService,
    private eventsService: EventsService,
    private groupsService: GroupsService,
  ) {

  }

  get tasks() {
    return this.tasksService.get().filter((item: TasksModel) => item.id_group == this.group.id);
  }

  public editGroup() {
    console.log(this.group);
    let clone = this.group.clone();
    this.eventsService.publish("new-group-modal-open", clone);
  }

  public deleteGroup() {
    this.groupsService.delete(this.group);
  }

  public addTask() {
    let model: TasksModel = new TasksModel(this.group.id, "");
    this.eventsService.publish("new-task-modal-open", model);
  }


  //Task-item component
  public editTask(taskId: string) {
    let model = this.tasksService.getModel(taskId);
    this.eventsService.publish("new-task-modal-open", model);
  }

  public deleteTask(taskId: string) {
    let model = this.tasksService.getModel(taskId);
    if (model) {
      this.tasksService.delete(model);
    }
  }
}
