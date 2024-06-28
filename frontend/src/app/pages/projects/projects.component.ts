import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects/projects.service';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectModel } from '../../services/projects/project.model';
import { AsyncPipe, NgFor } from '@angular/common';
import { ProjectItemComponent } from './project-item/project-item.component';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NewProjectComponent, NgFor, ProjectItemComponent, AsyncPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  private projects: ProjectModel[] = [];
  projectId!: number;

  constructor(private projectsService: ProjectsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.projectId = Number(this.activatedRoute.snapshot.params["id"]);


    this.projectsService.fetch().then(items => {

      this.projects = this.projectsService.getProjects();
    });
  }

  get projectsActive(): ProjectModel[] {
    return this.projects.filter(item => item.deleted == false);
  }

  get projectsDeleted(): ProjectModel[] {
    return this.projects.filter(item => item.deleted == true);
  }
}
