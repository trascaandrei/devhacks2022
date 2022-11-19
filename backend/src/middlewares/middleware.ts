export abstract class Middleware {
    constructor() {
        if (this.constructor === Middleware) {
            throw new Error('Abstract class \'Middleware\' can\'t be instantiated');
        }
    }
};
