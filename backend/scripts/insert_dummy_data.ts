import * as dotnev from 'dotenv';
import { v4 } from 'uuid';
import { ConnectOptions, LeanDocument } from 'mongoose';
dotnev.config({
    path: './.env'
});

import { Config } from '../src/config/config';
import { DbConnection } from '../src/db';
import { ActivityService } from '../src/services/activity_service';
import { ActionService } from '../src/services/action_service';
import { UserService } from '../src/services/user_service';
import { RequestService } from '../src/services/request_service';
import { HistoryService } from '../src/services/history_service';
import { ActivityInterface } from '../src/interfaces/activity_interface';
import { UserInterface } from '../src/interfaces/user_interface';
import { UserType } from '../src/utils/user_type';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { ActionDetailsInterface } from '../src/interfaces/action_detail_interface';
import { RequestStatus } from '../src/utils/request_status';
import { RequestDetailsInterface } from '../src/interfaces/request_details_interface';

type EntryInfo = {
    userId: string;
    name: string;
    username: string;
    password: string;
    email: string;
    cui?: string;
    logoUrl?: string;
    type: string;
};

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
        '--help',
        '--file'
    ];

    /**
     * for each option contains the description
     */
    private static optionsDescription = [
        {'option': '--help', 'description': 'display insights on how to run the script'},
        {'option': '--file', 'description': 'file name to read data from'}
    ];

    private _userService: UserService;
    private _activityService: ActivityService;
    private _actionService: ActionService;
    private _requestService: RequestService;
    private _historyService: HistoryService;

    constructor () {
        this._userService = new UserService();
        this._activityService = new ActivityService();
        this._actionService = new ActionService();
        this._requestService = new RequestService();
        this._historyService = new HistoryService();
    }

    /**
     * display help message
     */
    private static _displayHelpMessage(): void {
       /* TODO: add colors to output; It will look nicer :))) */
       let argsStructure: string = '[--help] | --file <file>\n';
   
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
            cui: '13547272',
            name: 'Compnay1',
            logoUrl: 'http://my-company.com/logo.jpg'
        };

        const company2: Record<string, unknown> = {
            userId: v4(),
            username: 'company-two',
            password: 'password',
            email: 'stefan.adrian1997@yahoo.com',
            type: UserType.COMPANY,
            cui: '18189442',
            name: 'Compnay2',
            logoUrl: 'http://my-company.com/logo.jpg'
        };

        const ong1: Record<string, unknown> = {
            userId: v4(),
            username: 'ong-one',
            password: 'password',
            email: 'contact@trsdesign.ro',
            type: UserType.ONG,
            name: 'ONG1'
        };

        const ong2: Record<string, unknown> = {
            userId: v4(),
            username: 'ong-two',
            password: 'password',
            email: 'andrei.trasca@trsdesign.ro',
            type: UserType.ONG,
            name: 'ONG2'
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

    private async _readFromFile(file: string): Promise<EntryInfo[]> {
        return new Promise((resolve, reject) => {
            const csvFilePath = path.resolve(__dirname, file);
  
            const headers = [
                'name',
                'username',
                'password',
                'email',
                'cui',
                'logoUrl',
                'type'
            ];
  
            const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
            parse(fileContent, {
                    delimiter: ';',
                    columns: headers
                }, (error, result: EntryInfo[]) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(result);
            });
        });
    }

    private async _insertFromFile(file: string): Promise<void> {
        const content: EntryInfo[] = await this._readFromFile(file);

        await Promise.all(content.filter((entry: EntryInfo) => { return entry.type === UserType.COMPANY; }).map((entry: EntryInfo, index: number) => {
            return this._userService.add({ ...entry, userId: v4(), currentCredit: (index + 1) * (index * 10), targetCredit: 1000 });
        }));

        await Promise.all(content.filter((entry) => { return entry.type === UserType.ONG; }).map((entry) => {
            return this._userService.add({ ...entry, userId: v4() });
        }));
    }

    private async _run(file: string): Promise<void> {
        console.log('Insert data started. Please be patient :)...');

        if (file) {
            await this._insertFromFile(file);
        } else {
            await this._insertDummyUsers();
            await this._insertDummyActivities();
        }
    };

    private async _populate(): Promise<void> {
        const companies: LeanDocument<UserInterface>[] = await this._userService.find({ type: UserType.COMPANY }, { _id: 0, userId: 1 });
        const ongs: LeanDocument<UserInterface>[] = await this._userService.find({ type: UserType.ONG }, { _id: 0, userId: 1 });
        const activities: LeanDocument<ActivityInterface>[] = await this._activityService.find({}, { _id: 0, activityId: 1 });
        
        /* create actions */
        await Promise.all(Array.apply(null, new Array(8000)).map((_: null, index: number) => {
            const action: Record<string, any> = {
                actionId: v4(),
                ongId: ongs[index % ongs.length].userId,
                activityId: activities[index % activities.length].activityId,
                title: index % 2 ? 'Plantare copaci in Tineretului' : 'Adunare gunoaie spatii verzi',
                description: index % 2 ? 'Green everywhere campaign' : 'Clean green spaces campaign',
                details: {}
            };

            if (index % 2) {
                action.details.nrSquareMeters = (index + 1) * 50;
            } else {
                action.details.nrTrees = (index + 1) * 50;
            }

            return this._actionService.add(action);
        }));

        const actions: LeanDocument<ActionDetailsInterface>[] = await this._actionService.findActions({});

        /* create requests */
        await Promise.all(Array.apply(null, new Array(3000)).map((_: null, index: number) => {
            const request: Record<string, any> = {
                requestId: v4(),
                actionId: actions[index % actions.length].actionId,
                companyId: companies[index % companies.length].userId,
                status: (index % 2) ? RequestStatus.PENDING : RequestStatus.ACCEPTED,
                details: {}
            };

            if (index % 2) {
                request.details.nrSquareMeters = (index + 1) * 10;
            } else {
                request.details.nrTrees = (index + 1) * 10;
            }

            return this._requestService.add(request);
        }));

        const requests: RequestDetailsInterface[] = await this._requestService.findRequests({});

        /* create histories */
        await Promise.all(Array.apply(null, new Array(5000)).map((_: null, index: number) => {
            const history: Record<string, any> = {
                historyId: v4(),
                activityId: activities[index % activities.length].activityId,
                companyId: companies[index % companies.length].userId,
                ongId: ongs[index % ongs.length].userId,
                status: (index % 2) ? RequestStatus.REJECTED : RequestStatus.COMPLETED,
                ongDetails: {},
                companyDetails: {},
                action: {
                    title: index % 2 ? 'Plantare copaci in Tineretului' : 'Adunare gunoaie spatii verzi',
                    description: index % 2 ? 'Green everywhere campaign' : 'Clean green spaces campaign'
                }
            };

            if (index % 2) {
                history.ongDetails.nrSquareMeters = (index + 1) * 50;
                history.companyDetails.nrSquareMeters = (index + 1) * 20;
            } else {
                history.ongDetails.nrTrees = (index + 1) * 10;
                history.companyDetails.nrTrees = (index + 1) * 3;

            }

            return this._historyService.add(history);
        }));
    }

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

            await this._run(opts_map['file']);

            await this._populate();
            
            /* close db connection */
            await connection.disconnect();
        } catch (e: any) {
            console.error(e);
        }
    }
};

new Runner().start(process.argv.slice(2));
