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

interface Entity {em
    email: string;
    cui?: string;
};

export interface OngInterface extends Entity {
};

export interface CompanyInterface extends Entity {
};
