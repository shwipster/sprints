import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../../services/events.service';

import { SprintsService } from '../../services/api/sprints/sprints.service';
import { SprintModel } from '../../services/api/sprints/sprint.model';

@Component({
  selector: 'app-new-sprint-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-sprint-modal.component.html',
  styleUrl: './new-sprint-modal.component.css'
})
export class NewSprintModalComponent implements AfterViewInit {
  @ViewChild('myDialog') dialog!: ElementRef<HTMLDialogElement>;

  name = new FormControl("");
  model!: SprintModel;
  isNew: boolean = true;

  constructor(
    private eventsService: EventsService,
    private sprintsService: SprintsService,
  ) {
    this.eventsService.subscribe(this, "new-sprint-modal-open", this.openModal);
  }
  ngAfterViewInit() {
    // ElementRef: { nativeElement: <input> }
  }

  public openModal(model: SprintModel) {

    this.isNew = model.id ? false : true;
    this.model = model;
    this.name.setValue(model.name);
    this.dialog.nativeElement.showModal();
  }

  public closeModal() {
    this.dialog.nativeElement.close();
  }

  public save() {
    let value = this.name.getRawValue() ?? "";
    this.model.name = value;
    this.sprintsService.save(this.model).then(
      () => this.closeModal()
    );
  }
}
