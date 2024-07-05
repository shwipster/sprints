import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { GroupsModel } from './groups.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService extends ApiService<GroupsModel> {

  public override ENDPOINT = "groups";

  constructor() {
    super();
    this.fetch();
  }
}
