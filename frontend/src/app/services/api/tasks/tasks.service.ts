import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { TasksModel } from './tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends ApiService<TasksModel> {

  public override ENDPOINT = "tasks";

  constructor(model: TasksModel) {
    super(model);
    this.fetch();
  }

  override async save(model: TasksModel): Promise<TasksModel | undefined> {

    let _model = await super.save(model);
    if (_model) {
      if (!_model.order) {
        //_model.order = this.get().length;
      }

    }
    return _model;
  }
}
