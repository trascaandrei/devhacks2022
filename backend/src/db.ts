import { Mongoose, connect, ConnectOptions } from 'mongoose';

export class DbConnection {
    private _connection: Mongoose;
    private _uri: string;
    private _options: ConnectOptions;

    constructor(uri: string, options: ConnectOptions = {}) {
        this._uri = uri;
        this._options = options;
    }

    public get getConnection(): Mongoose {
        return this._connection;
    }

    public async initConnection(): Promise<void> {
        this._connection = await connect(this._uri, this._options);
    }
};

