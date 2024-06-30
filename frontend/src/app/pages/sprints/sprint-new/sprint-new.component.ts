import { Component, Input, OnInit } from '@angular/core';
import { SprintsService } from '../../../services/sprints/sprints.service';
import { SprintModel } from '../../../services/sprints/sprint.model';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from '../../../services/projects/projects.service';

@Component({
  selector: 'app-sprint-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sprint-new.component.html',
  styleUrl: './sprint-new.component.css'
})
export class SprintNewComponent implements OnInit {
  @Input() projectId!: string;
  @Input() label!: string;
  sprintName: string = '';


  constructor(
    private projectsService: ProjectsService,
    private sprintsService: SprintsService
  ) {
  }

  ngOnInit(): void {

    //this.setProject();
    //this.sprintsService.fetch().then(this.setProject.bind(this));
  }

  addSprint() {

    let sprint = new SprintModel(this.projectId, this.sprintName);
    this.sprintsService.save(sprint);
    this.sprintName = '';
  }
}
