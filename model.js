import mongoService from './backend/mongodb';
import _ from 'lodash';

const model = {
    getClient: (clientId, clientSecret) => {
        return {
            id: 'secret',
            grants: ['password'],
            accessTokenLifetime: 360000
        };
    },
    getUser: async (username, password) => {
        const user = await mongoService.getUser(username, password);
        return user
    },
    saveToken: async (token, client, user) => {
        await mongoService.saveAccessToken(token, client, user);
        return {
            accessToken: token.accessToken,
            accessTokenExpiresAt: new Date(token.accessTokenExpiresAt),
            client: {
                id: client.id
            },
            user: user
        }
    },
    getAccessToken: async (accessToken) => {
        const res = await mongoService.getAccessToken(accessToken);
        if (res) {
            return {
                accessToken: res.token.accessToken,
                accessTokenExpiresAt: new Date(res.token.accessTokenExpiresAt),
                client: {
                    id: 'secret'
                },
                user: _.omit(res, ['token', 'password'])
            }
        }
        return false;
    }
};

export default model;