import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiInterface } from './api.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T extends ApiInterface> {

  protected HOST = "http://localhost:3000";
  protected ENDPOINT = "";

  models: T[] = [];
  events: { [key: string]: { timer: number | undefined, callbacks: any } };
  //indexedModels: { [key: string]: ProjectModel } = {};

  constructor(private http: HttpClient) {
    this.events = {
      changed: { timer: undefined, callbacks: [] }
    }
  }

  public get(id?: string): T[] {
    return structuredClone(this.models);
  }

  public changed(callback: any): this {
    this.events['changed'].callbacks.push(callback);
    console.log(this.events);
    return this;
  }

  public emit(eventName: string) {
    console.log("emit");

    let event = this.events[eventName];

    if (event.timer) {
      clearTimeout(event.timer);
    }
    setTimeout(() => {
      for (var i in event.callbacks) {
        event.callbacks[i]();
      }
    }, 100);
  }

  public async fetch(): Promise<T[] | undefined> {

    let request = this.createRequest("GET");

    try {
      const response = await fetch(request);

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

      let model = (await response.json());
      return this.add(model);

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


  protected add(model: T): T {

    if (!model.id) {
      throw new Error(`Model id NOT set: ${model}`);
    }
    let existingIndex = this.models.findIndex((item: T) => item.id == model.id);

    //Existing model. Update
    if (existingIndex != -1) {
      this.models[existingIndex] = { ...model };
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

  protected createRequest(method: string, model?: any): Request {

    let fragments = [this.HOST, this.ENDPOINT];

    //Append id into url
    //POST method has model but id is not set
    if (model && ("id" in model)) {
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
}
