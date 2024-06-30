import { ApiInterface } from "../api.interface";

export class ProjectModel implements ApiInterface {

    id!: string;
    closed: boolean = false;

    constructor(
        public name: string
    ) {

    }
}