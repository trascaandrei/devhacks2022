import { ServerError } from '../errors/server_error';
import { Middleware } from './middleware';
import { Request, Response, NextFunction } from 'express';
import { Constants } from '../constants';

export class ErrorHandler extends Middleware {
    handle(err: any, req: Request, res: Response, _: NextFunction) {
        if (err) {
            console.error(err);

            let statusCode: number = Constants.STATUS_CODE.SERVER_ERROR;
            let message: string = Constants.ERR_MESSAGES.SERVER_ERROR;

            if (err instanceof ServerError) {
                statusCode = err.statusCode;
                message = err.message;
            }

            return res.status(statusCode).json({ message });
        }
    }
};
