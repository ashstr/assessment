var Joi = require('joi');
var shortid = require('shortid');


module.exports = Joi.object().keys({
	id: Joi.string().default(shortid.generate()),
	text: Joi.string().regex(/^[a-zA-Z]+$/).required(),
	priority: Joi.number().integer().default(3),
	done: Joi.boolean()
});
