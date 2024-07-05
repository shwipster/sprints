import { Component, Input } from '@angular/core';
import { ProjectsService } from '../../../services/api/projects/projects.service';
import { FormsModule } from '@angular/forms';
import { ProjectModel } from '../../../services/api/projects/project.model';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.css'
})
export class NewProjectComponent {

  projectName: string = '';

  constructor(private projectsService: ProjectsService) {
  }

  addProject() {

    let project = new ProjectModel();
    project.name = this.projectName;
    this.projectsService.save(project);
    this.projectName = '';
  }
}
