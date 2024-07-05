import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../../services/events.service';

import { TasksModel } from '../../services/api/tasks/tasks.model';
import { TasksService } from '../../services/api/tasks/tasks.service';
import { GroupsService } from '../../services/api/groups/groups.service';
import { CommonModule } from '@angular/common';
import { SprintsService } from '../../services/api/sprints/sprints.service';
import { SprintModel } from '../../services/api/sprints/sprint.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-task-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.css'
})
export class NewTaskModalComponent implements AfterViewInit {
  @ViewChild('myDialog') dialog!: ElementRef<HTMLDialogElement>;

  name = new FormControl("");
  group = new FormControl("");
  description = new FormControl("");
  model!: TasksModel;
  isNew: boolean = true;

  groups: any = [];

  constructor(
    private eventsService: EventsService,
    private tasksService: TasksService,
    private groupsService: GroupsService,
    private sprintsService: SprintsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.eventsService.subscribe(this, "new-task-modal-open", this.openModal);
  }
  ngAfterViewInit() {
    // ElementRef: { nativeElement: <input> }
  }

  public openModal(model: TasksModel) {

    let groupsList = this.groupsService.get();
    this.groups = [];

    for (var i in groupsList) {
      let sprint = this.sprintsService.get(groupsList[i].id_sprint);

      let name = groupsList[i].name;
      if (sprint) {
        name = sprint.name + " - " + groupsList[i].name;
      }

      this.groups.push({
        id: groupsList[i].id,
        name: name
      });
    }

    this.isNew = model.name ? false : true;
    this.model = model;
    this.name.setValue(model.name);
    this.group.setValue(model.id_group);
    this.description.setValue(model.description);
    this.dialog.nativeElement.showModal();
  }

  public closeModal() {
    this.dialog.nativeElement.close();
  }

  public save() {
    let value = this.name.getRawValue() ?? "";
    let group = this.group.getRawValue();

    this.model.name = value;
    if (group) {
      this.model.id_group = group;
    }

    this.model.description = this.description.getRawValue() ?? "";

    this.tasksService.save(this.model).then(
      () => this.closeModal()
    );
  }
}
