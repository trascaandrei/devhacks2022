import { Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { UserService } from '../services/user_service';
import { Constants } from '../constants';
import { v4 } from 'uuid';
import { ApiCaller } from '../core/ApiCaller';
import { UserType } from '../utils/user_type';
import { UserInterface } from '../interfaces/user_interface';
import { TokenHandler } from '../utils/token_handler';
import { Config } from '../config/config';
import { ServerError } from '../errors/server_error';

export class AuthController extends Controller {
    private _userService: UserService = new UserService();
    private _jwtHandler: TokenHandler = new TokenHandler;
    private _apiCaller: ApiCaller;

    constructor (apiCaller: ApiCaller) {
        super();
        this._apiCaller = apiCaller;
    }

    public async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const data: Record<string, unknown> = {
            userId: v4(),
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name,
            cui: req.body.cui,
            type: req.body.type
        };

        if (req.body.type === UserType.COMPANY) {
            data.currentCredit = 0;
            data.targetCredit = await this._apiCaller.call();
        }

        const user: UserInterface = await this._userService.add(data);

        const payload: Record<string, unknown> = {
            userId: user.userId,
            type: user.type
        };

        res.status(Constants.STATUS_CODE.CREATED).json({
            accessToken: await this._jwtHandler.sign(payload, Config.SECRET_KEY, Config.EXPIRES_IN),
            currentCredit: req.body.type === UserType.COMPANY ? 0 : undefined,
            targetCredit: req.body.type === UserType.COMPANY ? user.targetCredit : undefined
        });
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user: UserInterface = await this._userService.findOne({ username: req.body.username });

        const isMatch: boolean = await user.matchPassword(req.body.password);

        if (!isMatch) {
            throw new ServerError(Constants.ERR_MESSAGES.INVALID_DATA, Constants.STATUS_CODE.UNAUTHENTICATED)
        }

        const payload: Record<string, unknown> = {
            userId: user.userId,
            type: user.type
        };

        res.status(Constants.STATUS_CODE.OK).json({
            accessToken: await this._jwtHandler.sign(payload, Config.SECRET_KEY, Config.EXPIRES_IN),
            currentCredit: user.type === UserType.COMPANY ? user.currentCredit : undefined,
            targetCredit: user.type === UserType.COMPANY ? user.targetCredit : undefined
        });
    }
};
