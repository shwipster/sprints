import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { GroupsService } from '../../services/api/groups/groups.service';
import { GroupsModel } from '../../services/api/groups/groups.model';

@Component({
  selector: 'app-new-group-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-group-modal.component.html',
  styleUrl: './new-group-modal.component.css'
})
export class NewGroupModalComponent implements AfterViewInit {

  @ViewChild('myDialog') dialog!: ElementRef<HTMLDialogElement>;

  name = new FormControl("");
  model!: GroupsModel;
  isNew: boolean = true;

  constructor(
    private eventsService: EventsService,
    private groupsService: GroupsService,
  ) {
    this.eventsService.subscribe(this, "new-group-modal-open", this.openModal);
  }

  ngAfterViewInit() {
    // ElementRef: { nativeElement: <input> }
  }

  public openModal(model: GroupsModel) {

    this.isNew = model.id ? false : true;
    this.model = model;
    this.name.setValue(model.name);
    this.dialog.nativeElement.showModal();
  }

  public closeModal() {
    this.dialog.nativeElement.close();
  }

  public deleteModal() {
    let res = confirm("Delete ?");
    if (res) {
      this.groupsService.delete(this.model).then(
        () => this.closeModal()
      );
    }
  }

  public save() {
    let value = this.name.getRawValue() ?? "";
    this.model.name = value;
    this.groupsService.save(this.model).then(
      () => this.closeModal()
    );
  }
}
