import { Component, Input } from '@angular/core';
import { ProjectModel } from '../../../services/projects/project.model';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { ProjectsService } from '../../../services/projects/projects.service';

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
    let url = '/projects/' + this.project.id;
    this.router.navigate([url]);
  }

  closeProject() {
    this.project.closed = !this.project.closed;
    this.projectsService.save(this.project);
  }

  deleteProject() {
    this.projectsService.delete(this.project);
  }

}
