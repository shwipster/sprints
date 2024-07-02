import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiInterface } from './api.interface';
import { Subject } from 'rxjs';
import { BaseModel } from './base.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T extends BaseModel> {

  protected HOST = "https://sprints.robotroonik.eu/api/v1";
  //protected HOST = "http://localhost:8000/api/v1";
  public ENDPOINT = "l";

  models: T[] = [];
  //indexedModels: { [key: string]: ProjectModel } = {};

  constructor() {
  }

  public get(): T[] {
    return this.models;
    //return structuredClone(this.models);
  }

  public getModel(id: string): T | undefined {
    let model: T[] = this.models.filter((item: BaseModel) => item.id == id);
    return model.length ? model[0].clone() : undefined;
  }

  public async fetch(): Promise<T[] | undefined> {

    let request = this.createRequest("GET");

    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      let modelPropeties: Object[] = (await response.json()) ?? [];

      //Important to use add method. It keeps reference to old models so views are updated correctly
      for (var i in modelPropeties) {
        this.add(modelPropeties[i]);
      }
      return this.get();

    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  public async save(model: T): Promise<T | undefined> {

    let method = "POST";
    if (model.id) {
      method = "PUT";
    }

    let request = this.createRequest(method, model);

    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      let modelPropeties: Object = (await response.json()) ?? {};
      //console.log(model);
      return this.add(modelPropeties);

    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  public async delete(model: T): Promise<T | undefined> {

    let request = this.createRequest("DELETE", model);

    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      let model = (await response.json());
      return this.remove(model);

    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  protected newInstance(properties: Object): T {
    throw new Error("Must override");
  }

  protected add(propeties: Object): T {

    let model = this.newInstance(propeties);
    //console.log("add", model);
    if (!model.id) {
      throw new Error(`Model id NOT set: ${model}`);
    }
    let existingIndex = this.models.findIndex((item: T) => item.id == model.id);

    //Existing model. Update
    if (existingIndex != -1) {
      this.models[existingIndex].parse(model);
      model = this.models[existingIndex];
    }
    else {
      this.models.push(model);
    }

    this.emit("changed");

    return model;
  }

  protected remove(model: T): T {
    if (!model.id) {
      throw new Error(`Model id NOT set: ${model}`);
    }

    let existingIndex = this.models.findIndex((item: T) => item.id == model.id);
    model = this.models.splice(existingIndex, 1)[0];

    this.emit("changed");
    return model;
  }

  protected createRequest(method: string, model?: BaseModel): Request {

    let fragments = [this.HOST, this.ENDPOINT];

    //Append id into url
    //POST method has model but id is not set
    if (model && model.id) {
      fragments.push(model.id);
    }

    //let url = new URL(fragments.join("/"), this.HOST);
    let url = fragments.join("/");

    let options: any = {
      headers: {
        "Content-Type": "application/json",
      },
      method: method
    }

    if (model) {
      options.body = JSON.stringify(model);
    }

    return new Request(url, options);
  }


  events: { [key: string]: { timer: number | undefined, callbacks: any } } = { changed: { timer: undefined, callbacks: [] } };

  public changed(callback: any): this {
    //this.events['changed'].callbacks.push(callback);
    return this;
  }

  public emit(eventName: string) {

    /*let event = this.events[eventName];

    if (event.timer) {
      clearTimeout(event.timer);
    }
    setTimeout(() => {
      for (var i in event.callbacks) {
        event.callbacks[i]();
      }
    }, 100);*/
  }
}
