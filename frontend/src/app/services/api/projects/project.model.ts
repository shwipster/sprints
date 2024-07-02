import { ApiInterface } from "../api.interface";

export class ProjectModel implements ApiInterface {

    id!: string;
    closed: boolean = false;

    constructor(public name: string = "") {

    }

    public parse(values: any) {
        this.id = values.id ? values.id : null;
        this.closed = values.closed;
        this.name = values.name ? values.name : "";
    }
}