export abstract class Caller<T> {
    constructor() {
        if (this.constructor === Caller) {
            throw new Error('Abstract class \'Caller\' can\'t be instantiated');
        }
    }

    public abstract call(): Promise<T>;
};
