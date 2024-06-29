import { Injectable } from '@angular/core';
import { ProjectModel } from './project.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  //indexedModels: { [key: string]: ProjectModel } = {};
  models: ProjectModel[] = [];

  constructor(private http: HttpClient) { }

  private getStandardOptions(): any {

    return {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET"
    }
  }

  get(): ProjectModel[] {
    return this.models;
  }

  private add(model: ProjectModel): ProjectModel {

    if (!model.id) {
      throw new Error(`Model id NOT set: ${model.name}`);
    }
    let existingIndex = this.models.findIndex((item) => item.id == model.id);

    //Existing model. Update
    if (existingIndex != -1) {
      this.models[existingIndex] = { ...model };
      model = this.models[existingIndex];
    }
    else {
      this.models.push(model);
    }
    return model;
  }

  private remove(model: ProjectModel): ProjectModel {
    if (!model.id) {
      throw new Error(`Model id NOT set: ${model.name}`);
    }

    let existingIndex = this.models.findIndex((item) => item.id == model.id);
    model = this.models.splice(existingIndex, 1)[0];
    return model;
  }

  async save(model: ProjectModel, silent: boolean = false): Promise<ProjectModel | undefined> {
    let host = "http://localhost:3000";
    let endpoint = "projects";

    let options = this.getStandardOptions();
    options.method = "POST";
    options.body = JSON.stringify(model);

    if (model.id) {
      options.method = "PUT";
      endpoint = endpoint + '/' + model.id;

    }

    let url = new URL(endpoint, host);
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      let model = (await response.json());
      return this.add(model);

    } catch (error: any) {
      console.error(error.message);
      return;
    }

  }

  async delete(model: ProjectModel, silent: boolean = false): Promise<ProjectModel | undefined> {
    let host = "http://localhost:3000";
    let endpoint = "projects";

    let options = this.getStandardOptions();
    options.method = "DELETE";
    options.body = JSON.stringify(model);
    endpoint = endpoint + '/' + model.id;

    let url = new URL(endpoint, host);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      let model = (await response.json());
      return this.remove(model);

    } catch (error: any) {
      console.error(error.message);
      return;
    }

    return;
  }



  async fetch(): Promise<ProjectModel[] | undefined> {

    let host = "http://localhost:3000";
    let endpoint = "projects";

    let options = this.getStandardOptions();

    let url = new URL(endpoint, host);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      let _models = (await response.json()) ?? [];

      //Important to use add method. It keeps reference to old models so views are updated correctly
      for (var i in _models) {
        this.add(_models[i]);
      }

      return this.get();

    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  /*

  projects$!: Observable<any>;

  <li *ngFor="let project of projects$ | async">{{project.name}}</li>

  getProjects() {
    let options = this.getStandardOptions();
    return this.http.get('projects.json', options);
  }*/

  /*
    events: { [key: string]: any } = {};
    subscribe(eventName: string, callback: any) {
  
    if (!(eventName in this.events)) {
      this.events[eventName] = [];
    }
  
    let eventObj = {
      callback: callback
    };
    this.events[eventName].push(eventObj);
  
  }
  
  publish(eventName: string) {
    if (eventName in this.events) {
      this.events[eventName].forEach((eventObj: any) => {
        eventObj.callback();
      });
    }
  }*/

}
