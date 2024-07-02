import { BaseModel } from "../base.model";

export class GroupsModel extends BaseModel {

    constructor(
        public id_sprint: string,
        public name: string = ""
    ) {
        super();
    }

    /*public parse(values: any) {
        this.id = values.id ? values.id : null;
        this.closed = values.closed;
        this.name = values.name ? values.name : "";
    }*/
}