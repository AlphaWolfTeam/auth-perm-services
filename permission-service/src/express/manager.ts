import { IUser } from './interface';
import UserModel from './model'
import { permissionNumRangeCheck } from '../utils'

export class AppManager {
    static getUserDetails(adfsId: String) {
        return UserModel.find({ adfsId: adfsId }, { '_id': 0 });
    }

    static getAllUsers() {
        return UserModel.find({}, { '_id': 0 });
    }

    static async createUser(user: Omit<IUser, "name">) {
        if (permissionNumRangeCheck(user.permission)) {
            const newUser = new UserModel(user);
            try {
                await newUser.save();
            } catch (error) {
                console.error("MongoError: Failed saving new user");
                return false;
            }
            console.log(`Mongo: New user (${user.adfsId}) saved to collection`);
            return true;
        } return false;
    }

    static async updateUser(user: Omit<IUser, "name">) {
        if (permissionNumRangeCheck(user.permission)) {
            const res = await UserModel.findOneAndUpdate({ adfsId: user.adfsId }, user, {
                new: true,
                rawResult: true
            });
            if (res.lastErrorObject.updatedExisting) {
                const { _id, ...updatedUser } = res.value['_doc'];
                console.log(`Mongo: User ${user.adfsId} data updated`);
                return { status: 'success', updatedUser: updatedUser };
            } else {
                console.error("MongoError: Failed updating user data (User doesn't exist)");
                return false;
            }
        } return false;
    }

    static async deleteUser(adfsId: String) {
        const result = await UserModel.deleteOne({ adfsId: adfsId });
        if (result.deletedCount) {
            console.log(`Mongo: User ${adfsId} deleted successfully`);
            return { status: 'success', adfsId: adfsId };
        } return false;
    }

}

export default AppManager;
