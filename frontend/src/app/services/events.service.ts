import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: { [key: string]: Map<Object, any> } = {};

  constructor() { }

  public subscribe(thisArg: Object, eventName: string, callback: Function) {
    if (!(eventName in this.events)) {
      this.events[eventName] = new Map();
    }

    this.events[eventName].set(thisArg, {
      callback: callback.bind(thisArg)
    });
  }

  public publish(eventName: string, payload?: any) {

    if (eventName in this.events) {
      this.events[eventName].forEach((element: any) => {
        element.callback(payload);
      });
    }
  }

  public unsubscribe(thisArg: Object, eventName: string) {
    if (eventName in this.events) {
      //this.events[eventName].delete(callback);
      console.log(this.events[eventName].get(thisArg));
    }
  }
}
