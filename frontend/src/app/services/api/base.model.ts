import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

export class BaseModel {

    id: string = "";

    constructor() {
    }

    public clone(): this {
        return structuredClone(this);
    }

    public set(properties: Object): this {
        Object.assign(this, { ...properties });
        return this;
    }
}