import { ApiInterface } from "../api.interface";

export class TasksModel implements ApiInterface {

    id!: string;
    done: boolean = false;
    order: number | undefined;
    description: string = '';

    constructor(
        public id_sprint: string,
        public name: string
    ) {

    }
}