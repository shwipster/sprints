import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../../services/events.service';

import { TasksModel } from '../../services/api/tasks/tasks.model';
import { TasksService } from '../../services/api/tasks/tasks.service';

@Component({
  selector: 'app-new-task-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-task-modal.component.html',
  styleUrl: './new-task-modal.component.css'
})
export class NewTaskModalComponent implements AfterViewInit {
  @ViewChild('myDialog') dialog!: ElementRef<HTMLDialogElement>;

  name = new FormControl("");
  description = new FormControl("");
  model!: TasksModel;
  isNew: boolean = true;

  constructor(
    private eventsService: EventsService,
    private tasksService: TasksService,
  ) {
    this.eventsService.subscribe(this, "new-task-modal-open", this.openModal);
  }
  ngAfterViewInit() {
    // ElementRef: { nativeElement: <input> }
  }

  public openModal(model: TasksModel) {

    this.isNew = model.name ? false : true;
    this.model = model;
    this.name.setValue(model.name);
    this.description.setValue(model.description);
    this.dialog.nativeElement.showModal();
  }

  public closeModal() {
    this.dialog.nativeElement.close();
  }

  public save() {
    let value = this.name.getRawValue() ?? "";
    this.model.name = value;
    this.model.description = this.description.getRawValue() ?? "";
    this.tasksService.save(this.model).then(
      () => this.closeModal()
    );
  }
}