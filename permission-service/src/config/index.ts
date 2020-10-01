import * as env from 'env-var';
import './dotenv';

const config = {
    service: {
        port: process.env.PORT ? parseInt(process.env.PORT) : env.get('PORT').required().asPortNumber(),
        clientURL: process.env.CLIENT_URL || env.get('CLIENT_URL').required().asString()
    },
    userPermission: {
        generalAccessPermissionId: process.env.GENERAL_ACCESS_PERMISSION_ID || env.get('GENERAL_ACCESS_PERMISSION_ID').required().asInt(),
        getAllUsersPermissionId: process.env.GET_ALL_USERS_PERMISSION_ID || env.get('GET_ALL_USERS_PERMISSION_ID').required().asInt(),
        getCurrentUserPermissionId: process.env.GET_CURRENT_USER_PERMISSION_ID || env.get('GET_CURRENT_USER_PERMISSION_ID').required().asInt(),
        getUserByIdPermissionId: process.env.GET_USER_BY_ID_PERMISSION_ID || env.get('GET_USER_BY_ID_PERMISSION_ID').required().asInt(),
        createUserPermissionId: process.env.CREATE_USER_PERMISSION_ID || env.get('CREATE_USER_PERMISSION_ID').required().asInt(),
        updateUserPermissionId: process.env.UPDATE_USER_PERMISSION_ID || env.get('UPDATE_USER_PERMISSION_ID').required().asInt(),
        deleteUserPermissionId: process.env.DELETE_USER_PERMISSION_ID || env.get('DELETE_USER_PERMISSION_ID').required().asInt(),

    },
    mongo: {
        uri: process.env.MONGO_URI || env.get('MONGO_URI').required().asUrlString(),
        CollectionName: process.env.MONGO_COLLECTION_NAME || env.get('MONGO_COLLECTION_NAME').required().asString(),
    }
};

export default config;
