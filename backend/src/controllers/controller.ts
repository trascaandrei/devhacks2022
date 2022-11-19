export abstract class Controller {
    constructor() {
        if (this.constructor === Controller) {
            throw new Error('Abstract class \'Controller\' can\'t be instantiated');
        }
    }
};
