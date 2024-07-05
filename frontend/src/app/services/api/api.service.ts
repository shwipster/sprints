import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiInterface } from './api.interface';
import { Subject } from 'rxjs';
import { BaseModel } from './base.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {

  protected HOST = "https://sprints.robotroonik.eu/api/v1";
  //protected HOST = "http://localhost:8000/api/v1";
  public ENDPOINT = "l";

  models: BaseModel[] = [];
  //indexedModels: { [key: string]: ProjectModel } = {};

  private model: typeof BaseModel;

  constructor(model: BaseModel) {

    this.model = (model as unknown) as typeof BaseModel;
  }

  public get(): T[];
  public get(id: string): T | undefined;
  public get(id?: string): T[] | T | undefined {
    if (id) {
      let models = this.models.filter((item: BaseModel) => item.id == id);
      return models.length ? models[0].clone() as T : undefined;
    }
    else {
      return this.models as T[];
    }
  }

  public async fetch(): Promise<T[] | undefined> {

    let request = this.createRequest("GET");

    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      let properties: Object[] = (await response.json()) ?? [];

      //Important to use add method. It keeps reference to old models so views are updated correctly
      for (var i in properties) {

        let model = new this.model(); // Constructor arguments are not required in compiled JS !!!
        model.set(properties[i]);
        this.add(model);
      }
      return this.get() as T[];

    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  public async save(model: BaseModel): Promise<T | undefined> {

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

      let propeties: Object = (await response.json()) ?? {};

      let model = new this.model();
      model.set(propeties);

      return this.add(model) as T;

    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  public async delete(model: BaseModel): Promise<T | undefined> {

    let request = this.createRequest("DELETE", model);

    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      let propeties = (await response.json());

      let model = new this.model();
      model.set(propeties);

      return this.remove(model) as T;

    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  protected add(model: BaseModel): BaseModel {

    let existingIndex = this.models.findIndex((item: BaseModel) => item.id == model.id);

    //Existing model. Update
    if (existingIndex != -1) {
      this.models[existingIndex].set(model);
      model = this.models[existingIndex]; //Reference model in this.models list not clone passed as argument
    }
    else {
      this.models.push(model);
    }

    this.emit("changed");
    return model;
  }

  protected remove(model: BaseModel): BaseModel {
    let existingIndex = this.models.findIndex((item: BaseModel) => item.id == model.id);
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
