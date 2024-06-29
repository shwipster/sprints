export class ProjectModel {

    id!: string;
    closed: boolean = false;

    constructor(
        public name: string
    ) {

    }
}