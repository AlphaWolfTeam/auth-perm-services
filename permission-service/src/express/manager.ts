import { IUser } from './interface';
import UserModel from './model'

export class AppManager {
    static getUser(user: Partial<IUser>) {
        return UserModel.find({ adfsId: user.adfsId }, { '_id': 0 });
    }
}

export default AppManager;
