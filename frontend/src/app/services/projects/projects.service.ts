import { Injectable } from '@angular/core';
import { ProjectModel } from './project.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  items: ProjectModel[] = [];

  constructor(private http: HttpClient) { }

  private getStandardOptions(): any {
    return {
      Headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }

  addProject(item: ProjectModel) {
    item.id = this.items.length;
    this.items.push(item);
  }

  getProjects(): ProjectModel[] {
    return this.items;
  }

  async fetch() {
    const data = await fetch("projects.json");
    this.items = (await data.json()) ?? [];
    return this.items;
  }

  /*

  projects$!: Observable<any>;

  <li *ngFor="let project of projects$ | async">{{project.name}}</li>

  getProjects() {
    let options = this.getStandardOptions();
    return this.http.get('projects.json', options);
  }*/

}
