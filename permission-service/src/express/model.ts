import * as mongoose from 'mongoose';

import { IUser } from './interface';
import config from '../config';

const UserSchema = new mongoose.Schema({
    adfsId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: false
    },
    permission: {
        type: [Number],
        required: true
    }
}, { versionKey: false });

const UserModel = mongoose.model<IUser & mongoose.Document>(config.mongo.CollectionName, UserSchema);

export default UserModel;
