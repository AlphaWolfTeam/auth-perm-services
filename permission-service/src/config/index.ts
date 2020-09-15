import * as env from 'env-var';
import './dotenv';

const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
        clientURL: env.get('CLIENT_URL').required().asString()
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asUrlString(),
        CollectionName: env.get('MONGO_COLLECTION_NAME').required().asString(),
    }
};

export default config;
