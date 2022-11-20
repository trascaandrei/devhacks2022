import { Service } from './service';
import { User } from '../models/user_model';
import { UserInterface } from '../interfaces/user_interface';
import { Constants } from '../constants';
import { ServerError } from '../errors/server_error';

export class UserService extends Service {
    public async findOne(filter: object, projection: object = {}): Promise<UserInterface> {
        const user: UserInterface | null = await User.findOne(filter, projection).exec();

        if (!user) {
            throw new ServerError(Constants.ERR_MESSAGES.INVALID_DATA, Constants.STATUS_CODE.UNAUTHENTICATED);
        }

        return user;
    }

    public async add(data: Record<string, unknown>): Promise<UserInterface> {
        const user: UserInterface = new User(data);

        return user.save();
    }

    public async updateOne(filter: Record<string, unknown>, data: Record<string, unknown>) {
        return User.updateOne(filter, data)
    }
};
