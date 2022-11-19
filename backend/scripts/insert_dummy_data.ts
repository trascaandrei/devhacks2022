import * as dotnev from 'dotenv';
import { v4 } from 'uuid';
import { ConnectOptions } from 'mongoose';
dotnev.config({
    path: './.env'
});

import { Config } from '../src/config/config';
import { DbConnection } from '../src/db';
import { ActivityService } from '../src/services/activity_service';
import { UserService } from '../src/services/user_service';
import { ActivityInterface } from '../src/interfaces/activity_interface';
import { UserInterface } from '../src/interfaces/user_interface';
import { UserType } from '../src/utils/user_type';

class Connection extends DbConnection {
    public async disconnect() {
        await this.getConnection.disconnect();
    }
};

class Runner {
    /**
     * list of available options
     */
    private static availableOptions: string[] = [
        '--help'
    ];

    /**
     * for each option contains the description
     */
    private static optionsDescription = [
        {'option': '--help', 'description': 'display insights on how to run the script'}
    ];

    private _userService: UserService;
    private _activityService: ActivityService;


    constructor () {
        this._userService = new UserService();
        this._activityService = new ActivityService();
    }

    /**
     * display help message
     */
    private static _displayHelpMessage(): void {
       /* TODO: add colors to output; It will look nicer :))) */
       let argsStructure: string = '[--help]\n';
   
       Runner.optionsDescription.forEach((option) => {
           argsStructure += `\t${option.option} -> ${option.description}\n`;
       });
   
       console.log(`[Usage]: npx ts-node ${__filename} ${argsStructure}`);
   };

    /**
     * check if @option is available
     */
    private static _isOptionAvailable(option: string): boolean {
        return Runner.availableOptions.indexOf(option) !== -1;
    };

    /**
     * check if a list of options are valid
     * also, in the same time, map each option with its value
     */
    private static _validateOptions(options: string[]): Record<string, any> {
        const result: Record<string, any> = {
            valid: true,
            opts_map: {}
        };

        for (let i: number = 0; i < options.length; i += 2) {
            if (!Runner._isOptionAvailable(options[i])) {
                console.error(`Invalid option ${options[i]}`);
                return { valid: false };
            }

            if (!options[i + 1]) {
                console.error(`Empty value for options ${options[i]}`);
                return { valid: false };
            }

            result.opts_map[options[i].substring(2)] = options[i + 1];
        }

        return result;
    };

    /**
     * validate command line arguments list
     */
    private static _validateArgumentsList (args: string[]): Record<string, any> {
        return Runner._validateOptions(args);
    };

    private async _insertDummyUsers() {
        const company1: Record<string, unknown> = {
            userId: v4(),
            username: 'company-one',
            password: 'password',
            email: 'adrianstefan376@gmail.com',
            type: UserType.COMPANY,
            cui: '13547272'
        };

        const company2: Record<string, unknown> = {
            userId: v4(),
            username: 'company-two',
            password: 'password',
            email: 'stefan.adrian1997@yahoo.com',
            type: UserType.COMPANY,
            cui: '18189442'
        };

        const ong1: Record<string, unknown> = {
            userId: v4(),
            username: 'ong-one',
            password: 'password',
            email: 'contact@trsdesign.ro',
            type: UserType.ONG
        };

        const ong2: Record<string, unknown> = {
            userId: v4(),
            username: 'ong-two',
            password: 'password',
            email: 'andrei.trasca@trsdesign.ro',
            type: UserType.ONG
        };

        const promises: Promise<UserInterface>[] = [];
        promises.push(this._userService.add(company1));
        promises.push(this._userService.add(company2));
        promises.push(this._userService.add(ong1));
        promises.push(this._userService.add(ong2));

        await Promise.all(promises);
    }

    private async _insertDummyActivities() {
        const activity1: Record<string, unknown> = {
            activityId: v4(),
            name: 'Plantare copaci',
            description: 'Planatare copaci in parcuri',
            details: [
                'nrTrees',
                'pricePerTree'
            ]
        };

        const activity2: Record<string, unknown> = {
            activityId: v4(),
            name: 'Adunare gunoaie',
            description: 'Adunarea gunoaielor de pe spatiile verzi',
            details: [
                'nrSquareMeters',
                'pricePerSquareMeter'
            ]
        };

        const promises: Promise<ActivityInterface>[] = [];
        promises.push(this._activityService.add(activity1));
        promises.push(this._activityService.add(activity2));

        await Promise.all(promises);
    }

    private async _run(): Promise<void> {
        console.log('Insert data started. Please be patient :)...');

        await this._insertDummyUsers();
        await this._insertDummyActivities();
    };

    public async start(args: string[]): Promise<void> {
        /* parse cmd line arguments */
        if (args.length && args[0] === '--help') {
            Runner._displayHelpMessage();
            return;
        }

        /* validate script arguments */
        const { valid, opts_map } = Runner._validateArgumentsList(args);

        if (!valid) {
            Runner._displayHelpMessage();
            return;
        }

        try {
            /* open a db connection */
            const options: ConnectOptions = {
                dbName: Config.DB_NAME,
                auth: {
                    username: Config.MONGO_USERNAME,
                    password: Config.MONGO_PASSWORD
                }
            };
            const connection: Connection = new Connection(Config.MONGO_URI, options);
            await connection.initConnection();

            /* process data */
            await this._run();
            
            /* close db connection */
            await connection.disconnect();
        } catch (e: any) {
            console.error(e);
        }
    }
};

new Runner().start(process.argv.slice(2));
