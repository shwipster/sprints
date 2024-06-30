import { Component, Input, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects/projects.service';
import { ActivatedRoute } from '@angular/router';
import { SprintsService } from '../../services/sprints/sprints.service';
import { SprintModel } from '../../services/sprints/sprint.model';
import { NgFor } from '@angular/common';
import { SprintItemComponent } from './sprint-item/sprint-item.component';
import { SprintNewComponent } from './sprint-new/sprint-new.component';
import { ProjectModel } from '../../services/projects/project.model';

@Component({
  selector: 'app-sprints',
  standalone: true,
  imports: [NgFor, SprintItemComponent, SprintNewComponent],
  templateUrl: './sprints.component.html',
  styleUrl: './sprints.component.css'
})
export class SprintsComponent implements OnInit {

  @Input() projectId!: string;

  //project!: ProjectModel;

  constructor(
    private projectsService: ProjectsService,
    private sprintsService: SprintsService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    //this.sprintsService.fetch();
  }

  public getProjectName(): string {
    let model = this.projectsService.getModel(this.projectId);
    return model ? model.name : "";
  }

  public filteredSprints() {

    return this.sprintsService.get().filter((item: SprintModel) => item.id_project == this.projectId);
  }
}
