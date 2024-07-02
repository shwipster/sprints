import { BaseModel } from "../base.model";

export class TasksModel extends BaseModel {

    done: boolean = false;
    order: number | undefined;
    description: string = '';

    constructor(
        public id_group: string,
        public name: string
    ) {
        super();
    }
}