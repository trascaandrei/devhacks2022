import { Caller } from './Caller';

export class ApiCaller extends Caller<number> {
    public override async call(): Promise<number> {
        return 1000;
    }
};
