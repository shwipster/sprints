import { Injectable } from "@angular/core";
import { BaseModel } from "../base.model";

@Injectable({
    providedIn: 'root',
    useValue: SprintModel
})

export class SprintModel extends BaseModel {

    constructor(
        public id_project: string,
        public name: string = ""
    ) {
        super();
    }
}