import Joi from 'joi';

export const createUrlSchema = Joi.object({
    url: Joi.string().uri().required().messages({
        'string.empty': 'URL is required',
        'any.required': 'URL is required',
        'string.uri': 'Invalid URL format'
    }),
    customCode: Joi.string().pattern(/^[a-zA-Z0-9_-]+$/).optional().allow('').messages({
        'string.pattern.base': 'Custom code can only contain letters, numbers, underscores, and dashes'
    })
});

export interface CreateUrlInput {
    url: string;
    customCode?: string;
}
