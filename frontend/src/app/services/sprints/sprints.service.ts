import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { SprintModel } from './sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintsService extends ApiService<SprintModel> {

  protected override ENDPOINT = "sprints";
}
