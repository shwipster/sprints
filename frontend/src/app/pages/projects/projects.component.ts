import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/api/projects/projects.service';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectModel } from '../../services/api/projects/project.model';
import { AsyncPipe, NgFor } from '@angular/common';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NewProjectComponent, NgFor, ProjectItemComponent, AsyncPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  constructor(private projectsService: ProjectsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    //this.projectsService.fetch();
  }

  get projectsActive(): ProjectModel[] {

    //console.log(this.projectsService.get());
    let projects = this.projectsService.get().filter(item => item.closed == false);
    return (projects);
  }

  get projectsDeleted(): ProjectModel[] {
    let projects = this.projectsService.get().filter(item => item.closed == true);
    return (projects);
  }
}
