import * as Validators from "./schemas/schema.js"

export function Validate(validator) {
    return async function(req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            if(err.isJoi) {
                res.status(400).send({
                    message:err.details[0].message.replaceAll('\"', ''),
                })
            }
        }
    }
}