import { Document } from 'mongoose';
import { UserType } from '../utils/user_type';

export interface UserInterface extends Document {
    userId: string;
    username: string;
    password: string;
    type: UserType;
    name: string;
    cui?: string;
    targetCredit?: number;
    currentCredit?: number;
    matchPassword?: (password: string) => PromiseLike<boolean>;
};

interface Entity {
    name: string;
    email: string;
    cui?: string;
};

export interface OngInterface extends Entity {
};

export interface CompanyInterface extends Entity {
};
