import { Component, Input } from '@angular/core';
import { ProjectModel } from '../../../services/api/projects/project.model';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { ProjectsService } from '../../../services/api/projects/projects.service';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent {

  @Input() project!: ProjectModel;

  constructor(private router: Router, private projectsService: ProjectsService) {

  }

  openProject() {
    this.router.navigate(["sprints", this.project.id]);
  }

  closeProject() {
    let clone = structuredClone(this.project);
    clone.closed = !clone.closed;
    this.projectsService.save(clone);
  }

  deleteProject() {
    this.projectsService.delete(this.project);
  }

}
