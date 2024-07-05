import { BaseModel } from "../base.model";
import { ProjectsService } from "./projects.service";

export class ProjectModel extends BaseModel {
    closed: boolean = false;
    name: string = "";

    constructor() {
        super();
    }

    public override set(properties: any): this {
        this.id = properties.id ? properties.id : null;
        this.closed = properties.closed;
        this.name = properties.name ? properties.name : "";
        return this;
    }
}