import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SprintModel } from '../../../services/sprints/sprint.model';
import { Router } from '@angular/router';
import { SprintsService } from '../../../services/sprints/sprints.service';
import { NgFor } from '@angular/common';
import { TasksService } from '../../../services/tasks/tasks.service';
import { TasksModel } from '../../../services/tasks/tasks.model';

@Component({
  selector: 'app-sprint-item',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sprint-item.component.html',
  styleUrl: './sprint-item.component.css'
})
export class SprintItemComponent {
  @Input() sprint!: SprintModel;

  //tasks: any = [{ id: "9ifs", id_sprint: "98ww", name: "Task 1", order: 1, done: true }, { id: "9ifs", id_sprint: "98ww", name: "Task 2", order: 1, done: false }];

  constructor(
    private router: Router,
    private sprintsService: SprintsService,
    private tasksService: TasksService
  ) {

  }

  ngOnInit(): void {
    //this.tasksService.fetch();
  }

  get tasks() {
    return this.tasksService.get().filter((item: TasksModel) => item.id_sprint == this.sprint.id);
  }

  deleteSprint() {
    this.sprintsService.delete(this.sprint);
  }

  addTask() {

    let model = new TasksModel(this.sprint.id, "TASK1");
    this.tasksService.save(model);

  }

  deleteTask(taskId: string) {
    let model = this.tasksService.getModel(taskId);
    if (model) {
      this.tasksService.delete(model);
    }
  }
}
