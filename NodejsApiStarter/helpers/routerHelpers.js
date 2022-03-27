const Joi = require('@hapi/joi');




const validatorBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body);

        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        } else {
            if (!req.value) req.value = {}

            if (!req.value['params']) req.value.params = {}

            //    console.log(validatorResult)
            req.value.body = validatorResult.value;
            next();
        }
    }
}

/* shecma: dieu kien cua Param
   name: ten cua Param
*/
const validateParam = (schema, name) => {
        return (req, res, next) => {
            const validatorResult = schema.validate({ param: req.params[name] })

            //console.log(validatorResult);
            // console.log('Day ne: ', req.params)
            if (validatorResult.error) {

                return res.status(400).json(validatorResult.error)
            } else {
                if (!req.value) req.value = {}
                if (!req.value['params']) req.value.params = {}

                req.value.params[name] = req.params[name];
                //console.log('day ne: ', req.value)
                next()
            }
        }
    }
    /* Check dieu kien */
const schemas = {
    // post of deck
    deckSchema: Joi.object().keys({
        name: Joi.string().min(6).required(),
        description: Joi.string().min(10).required()

    }),
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    // for Put User
    userSchema: Joi.object().keys({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required()
    }),
    // for Patch User
    userOptionalSchema: Joi.object().keys({
        firstName: Joi.string().min(2),
        lastName: Joi.string().min(2),
        email: Joi.string().email()
    })
}
module.exports = {
    validatorBody,
    validateParam,
    schemas
}