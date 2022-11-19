export abstract class Service {
    constructor() {
        if (this.constructor === Service) {
            throw new Error('Abstract class \'Service\' can\'t be instantiated');
        }
    }
};
