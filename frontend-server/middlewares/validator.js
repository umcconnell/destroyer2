// see: http://brianyang.com/joi-awesome-code-validation-for-node-js-and-express/
let Joi = require('@hapi/joi');;

const middleware = (prop, schema) => {
    return (req, res, next) => {
        const { error } = Joi.validate(req[prop], schema);
        const valid = error || null;

        if (!valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(detail => detail.message).join(",");
            res.status(400).json({
                error: message
            });
        }
    };
};

module.exports = middleware;
