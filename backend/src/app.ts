import 'express-async-errors';
import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { DbConnection } from './db';
import { Config } from './config/config';
import { ActivityRoutes } from './routes/activity_routes';
import { ErrorHandler } from './middlewares/error_handler';
import { ActionRoutes } from './routes/action_routes';
import { RequestRoutes } from './routes/request_routes';

export class App {
	private _app: Application;
	private _db: DbConnection;
	private _errorHandler: ErrorHandler;

	constructor() {
		this._app = express();
		const options = {
			dbName: Config.DB_NAME,
        	auth: {
				username: Config.MONGO_USERNAME,
				password: Config.MONGO_PASSWORD
			}
		};
		this._db = new DbConnection(Config.MONGO_URI, options);

		this._errorHandler = new ErrorHandler();

		this.setConfig();
	}

	private setConfig() {
		/* allow to receive requests with data in json format */
		this._app.use(express.json());

		/* allow to receive requests with data in x-www-form-urlencoded format */
		this._app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

		/* enables cors */
		this._app.use(cors());

		/* add routes */
		this._app.use('/api/v1/activities', new ActivityRoutes().getRouter());
		this._app.use('/api/v1/actions', new ActionRoutes().getRouter());
		this._app.use('/api/v1/requests', new RequestRoutes().getRouter());

		/* add error handler */
		this._app.use(this._errorHandler.handle.bind(this._errorHandler));
	}

	public async start(port: number, host: string = 'localhost'): Promise<void> {
		await this._db.initConnection();

		this._app.listen(port, host, () => {
			console.log(`Server is listening on ${port}`);
		});
	}
};
