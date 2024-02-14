import Joi from "joi"

export const LogIn = Joi.object({
    email: Joi.string().required().trim().min(3).max(50).email(),
    password:Joi.string().required().trim().min(3).max(50)
});

export const SignUp = Joi.object({
    userName: Joi.string().required().trim().min(3).max(50),
    email: Joi.string().required().trim().min(3).max(50).email(),
    password:Joi.string().required().trim().min(3).max(50)
});