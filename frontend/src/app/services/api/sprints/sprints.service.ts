import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { SprintModel } from './sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintsService extends ApiService<SprintModel> {

  public override ENDPOINT = "sprints";

  constructor() {
    super();
    this.fetch();
  }

  protected override newInstance(properties: any): SprintModel {

    let model = new SprintModel(properties.id_project, properties.name);
    model.parse(properties);
    return model;
  }
}
