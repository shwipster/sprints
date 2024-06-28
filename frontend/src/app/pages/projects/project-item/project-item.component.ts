import { Component, Input } from '@angular/core';
import { ProjectModel } from '../../../services/projects/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent {

  @Input() project!: ProjectModel;

  constructor(private router: Router) {

  }

  openProject() {
    let url = '/projects/' + this.project.id;
    this.router.navigate([url]);
  }

  clicked() {


    this.project.deleted = !this.project.deleted;
  }

}
