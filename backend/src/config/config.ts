import * as dotnev from 'dotenv';
dotnev.config();

export class Config {
    public static PORT: number = Number(process.env.PORT) || 3000;
    public static MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017';
    public static DB_NAME: string = process.env.DB_NAME || '';
    public static MONGO_USERNAME: string = process.env.MONGO_USERNAME || '';
    public static MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || '';
    public static ROUNDS: number = Number(process.env.ROUNDS) || 10;
    public static SECRET_KEY: string = process.env.SECRET_KEY;
    public static EXPIRES_IN: number = Number(process.env.EXPIRES_IN);
    public static ORIGIN: string = process.env.ORIGIN || '*';

};
