import * as Joi from '@hapi/joi';

export const getUserPermissionSchema = Joi.object({
    query: {},
    body: {
        currentUser: Joi.object({
            adfsId: Joi.string().required(),
            name: Joi.string(),
            permission: Joi.number().required()
        }).required()
    },
    params: {},
});

export const updateUserPermissionSchema = Joi.object({
    query: {},
    body: {
        currentUser: Joi.object({
            adfsId: Joi.string().required(),
            name: Joi.string(),
            permission: Joi.number().required()
        }).required()
    },
    params: {},
});