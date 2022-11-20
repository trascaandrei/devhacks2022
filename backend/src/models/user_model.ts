import { Schema, model } from 'mongoose';
import { UserInterface } from '../interfaces/user_interface';
import bycrypt from 'bcryptjs';
import { Config } from '../config/config';
import { UserType } from '../utils/user_type';

const UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    username: {
        type: String,
        required: [true, '\'username\' is required'],
        index: {
            unique: true,
            sparse: true
        }
    },
    password: {
        type: String,
        required: [true, '\'password\' is required'],
    },
    email: {
        type: String,
        required: [true, '\'email\' is required'],
        index: {
            unique: true,
            sparse: true
        }
    },
    type: {
        type: String,
        enum: [UserType.ONG, UserType.COMPANY],
        required: [true, '\'type\' is required']
    },
    name: {
        type: String,
        required: true
    },
    cui: {
        type: String
    },
    targetCredit: {
        type: Number
    },
    currentCredit: {
        type: Number
    }
});

UserSchema.pre<UserInterface>('save', async function (next: any) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt: string = await bycrypt.genSalt(Config.ROUNDS);
        this.password = bycrypt.hashSync(this.password, salt);
        next();
    } catch (e) {
        next(e);
    }
});

UserSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
    return bycrypt.compare(password, this.password);
}

export const User = model<UserInterface>('User', UserSchema);
