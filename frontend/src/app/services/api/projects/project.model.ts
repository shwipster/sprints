import { Injectable } from "@angular/core";
import { BaseModel } from "../base.model";
import { ProjectsService } from "./projects.service";

@Injectable({
    providedIn: 'root',
    useValue: ProjectModel
})
export class ProjectModel extends BaseModel {
    closed: boolean = false;
    name: string = "";
    done: boolean = false;

    constructor() {
        super();
    }

    public override set(properties: any): this {
        //this.id = properties.id ? properties.id : null;
        //this.closed = properties.closed ? properties.closed : this.closed;
        //this.name = properties.name ? properties.name : "";

        return super.set(properties);
    }
}