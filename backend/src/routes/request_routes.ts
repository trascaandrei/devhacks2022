import { RequestHandler } from "express";
import { Routes } from './routes';
import { RequestController } from '../controllers/request_controller';
import { AuthMiddleware } from '../middlewares/auth_middleware';

export class RequestRoutes extends Routes {
    constructor () {
        super();
        this.init();
    }

    protected init(): void {
        /* request controller */
        const requestController: RequestController = new RequestController();
        const addRequestByCompanyFunc: RequestHandler = requestController.addRequestByCompany.bind(requestController);
        const getRequestsForOngFunc: RequestHandler = requestController.getRequestsForOng.bind(requestController);
        const updateRequestStatusByOngFunc: RequestHandler = requestController.updateRequestStatusByOng.bind(requestController);
        
        /* validate auth token */
        const authMiddleware: AuthMiddleware = new AuthMiddleware();
        const checkAuthTokenFunc: RequestHandler = authMiddleware.checkAuthToken.bind(authMiddleware);

        this._router.post('/', [
            checkAuthTokenFunc
        ], addRequestByCompanyFunc);

        this._router.get('/', [
            checkAuthTokenFunc
        ], getRequestsForOngFunc);

        this._router.put('/:requestId', [
            checkAuthTokenFunc
        ], updateRequestStatusByOngFunc);
    }
};
