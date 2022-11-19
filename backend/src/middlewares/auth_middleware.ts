import { Middleware } from './middleware';
import { Response, NextFunction } from 'express';
import { TokenHandler } from '../utils/token_handler';
import { Config } from '../config/config';
import { IRequest } from '../interfaces/express_req_interface';

export class AuthMiddleware extends Middleware {
    private _tokenHandler: TokenHandler = new TokenHandler();

    public async checkAuthToken(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const token: string = req.headers.authorization.split(' ')[1];
        // const jwt: object = await this._tokenHandler.verify(token, Config.SECRET_KEY);
       
        req.userId = '40d4ca9d-102c-42a9-8d3a-c164c6608a8a'; // TODO: get it from decoded token

        next();
    }
};
