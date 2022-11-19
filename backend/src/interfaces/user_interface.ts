import { Document } from 'mongoose';
import { UserType } from '../utils/user_type';

export interface UserInterface extends Document {
    userId: string;
    username: string;
    password: string;
    type: UserType;
    cui?: String;
    matchPassword?: (password: string) => PromiseLike<boolean>;
};
