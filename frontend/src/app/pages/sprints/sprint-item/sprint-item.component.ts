import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SprintModel } from '../../../services/sprints/sprint.model';
import { Router } from '@angular/router';
import { SprintsService } from '../../../services/sprints/sprints.service';

@Component({
  selector: 'app-sprint-item',
  standalone: true,
  imports: [],
  templateUrl: './sprint-item.component.html',
  styleUrl: './sprint-item.component.css'
})
export class SprintItemComponent {
  @Input() sprint!: SprintModel;
  @Input() name!: string;

  constructor(private router: Router, private sprintsService: SprintsService) {

  }

  deleteSprint() {
    this.sprint.name = this.sprint.name + "2";
    console.log(this.sprint);
    //this.sprintsService.delete(this.sprint);
  }

  saveSprint() {
    this.sprintsService.save(this.sprint);

  }
}
