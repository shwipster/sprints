import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ProjectModel } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends ApiService<ProjectModel> {

  protected override ENDPOINT = "projects";
}
