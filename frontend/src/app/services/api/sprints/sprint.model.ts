import { BaseModel } from "../base.model";

export class SprintModel extends BaseModel {

    constructor(
        public id_project: string,
        public name: string = ""
    ) {
        super();
    }
}