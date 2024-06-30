import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SprintModel } from '../../../services/api/sprints/sprint.model';
import { Router } from '@angular/router';
import { SprintsService } from '../../../services/api/sprints/sprints.service';
import { NgFor, NgIf } from '@angular/common';
import { TasksService } from '../../../services/api/tasks/tasks.service';
import { TasksModel } from '../../../services/api/tasks/tasks.model';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-sprint-item',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './sprint-item.component.html',
  styleUrl: './sprint-item.component.css'
})
export class SprintItemComponent {
  @Input() sprint!: SprintModel;

  constructor(
    private router: Router,
    private sprintsService: SprintsService,
    private tasksService: TasksService,
    private eventsService: EventsService
  ) {

  }

  ngOnInit(): void {
    //this.tasksService.fetch();
  }

  get tasks() {
    return this.tasksService.get().filter((item: TasksModel) => item.id_sprint == this.sprint.id);
  }

  addTask() {
    let model: TasksModel | undefined = new TasksModel(this.sprint.id, "");
    this.eventsService.publish("new-task-modal-open", model);
  }

  editSprint() {
    this.eventsService.publish("new-sprint-modal-open", this.sprint);
  }

  deleteSprint() {
    this.sprintsService.delete(this.sprint);
  }


  editTask(taskId: string) {
    let model = this.tasksService.getModel(taskId);
    this.eventsService.publish("new-task-modal-open", model);
  }

  deleteTask(taskId: string) {
    let model = this.tasksService.getModel(taskId);
    if (model) {
      this.tasksService.delete(model);
    }
  }
}
