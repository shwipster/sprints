import { ApiInterface } from "../api.interface";

export class SprintModel implements ApiInterface {

    id!: string;

    constructor(
        public id_project: string,
        public name: string
    ) {

    }
}