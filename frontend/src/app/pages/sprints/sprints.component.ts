import { Component, Input, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/api/projects/projects.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SprintsService } from '../../services/api/sprints/sprints.service';
import { SprintModel } from '../../services/api/sprints/sprint.model';
import { NgFor, NgIf } from '@angular/common';
import { SprintItemComponent } from './sprint-item/sprint-item.component';
import { FormsModule } from '@angular/forms';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-sprints',
  standalone: true,
  imports: [NgFor, NgIf, SprintItemComponent, FormsModule, RouterLink],
  templateUrl: './sprints.component.html',
  styleUrl: './sprints.component.css'
})
export class SprintsComponent implements OnInit {

  @Input() projectId!: string;
  sprintName: string = '';

  //project!: ProjectModel;

  constructor(
    private projectsService: ProjectsService,
    private sprintsService: SprintsService,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService
  ) {
  }

  ngOnInit(): void {
    //this.sprintsService.fetch();
  }

  public getProjectName(): string {
    let model = this.projectsService.get(this.projectId);
    return model ? model.name : "";
  }

  public filteredSprints() {

    return this.sprintsService.get().filter((item: SprintModel) => item.id_project == this.projectId);
  }

  public addSprint(sprintId?: string) {

    let model: SprintModel | undefined = new SprintModel(this.projectId, "");
    if (sprintId) {
      model = this.sprintsService.get(sprintId);
    }

    this.eventsService.publish("new-sprint-modal-open", model);

    /*let sprint = new SprintModel(this.projectId, this.sprintName);
    this.sprintsService.save(sprint);
    this.sprintName = '';*/
  }
}
