import { Middleware } from './middleware';
import { Response, NextFunction } from 'express';
import { TokenHandler } from '../utils/token_handler';
import { Config } from '../config/config';
import { IRequest } from '../interfaces/express_req_interface';

export class AuthMiddleware extends Middleware {
    private _tokenHandler: TokenHandler = new TokenHandler();

    public async checkAuthToken(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        const token: string = req.headers.authorization.split(' ')[1];
        const jwt: Record<string, unknown> = await this._tokenHandler.verify(token, Config.SECRET_KEY);
        /* TODO: should check if the userId is valid */
       
        req.userId = jwt.userId as string;

        next();
    }
};
