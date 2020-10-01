import * as Joi from '@hapi/joi';

export const getUserPermissionSchema = Joi.object({
    body: {
        currentUser: Joi.object({
            adfsId: Joi.string().required(),
            name: Joi.string(),
            permission: Joi.array().items(Joi.number()).required()
        }).required()
    }
});

export const updateUserPermissionSchema = Joi.object({
    body: {
        currentUser: Joi.object({
            adfsId: Joi.string().required(),
            name: Joi.string(),
            permission: Joi.array().items(Joi.number()).required()
        }).required()
    }
});