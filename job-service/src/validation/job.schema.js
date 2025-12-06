const Joi = require('joi');

const createJobSchema = Joi.object({
    type: Joi.string().required(),
    date: Joi.string().required(),
    maxAttempts: Joi.number().integer().min(1).default(3),
});

function validate(schema){
    return (req, res, next)=>{
        const { error, value } = schema.validate(req.body, { stripUnknown: true, abortEarly: false });

        if(error) return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        req.body = value;
        next();
    };
}

export.validateCreateJob = validate(createJobSchema);