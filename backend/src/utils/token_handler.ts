import { sign, verify } from 'jsonwebtoken';
import { promisify } from 'util';

export class TokenHandler {
    private _sign: any;
    private _verify: any;

    constructor() {
        this._sign = promisify(sign);
        this._verify = promisify(verify);
    }

    public sign(data: object, secret: string, expire: number): Promise<string> {
        return this._sign(data, secret, { expiresIn: expire });
    }

    public async verify(token: string, secret: string): Promise<object> {
        return this._verify(token, secret);
    }
};
