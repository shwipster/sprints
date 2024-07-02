import { BaseModel } from "../base.model";

export class ProjectModel extends BaseModel {
    closed: boolean = false;

    constructor(
        public name: string = ""
    ) {
        super();
    }

    public override parse(properties: any): this {
        this.id = properties.id ? properties.id : null;
        this.closed = properties.closed;
        this.name = properties.name ? properties.name : "";
        return this;
    }
}