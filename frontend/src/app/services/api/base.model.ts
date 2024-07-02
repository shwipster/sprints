export class BaseModel {

    id: string = "";

    public clone(): this {
        return structuredClone(this);
    }

    public parse(properties: Object): this {
        Object.assign(this, { ...properties });
        return this;
    }
}