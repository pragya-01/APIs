const { User, validate } = require('../models/userschema')
const jwt = require('jsonwebtoken');


//password reset requirements
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const { schema } = require('../models/token');

//FORGOT PASSWORD , RESET PASSWORD

const forgotPassword = async(req, res) => {
    try {
        const schema = joi.object({ email: joi.string().email.required() });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("user with given email doesn't exist");
        }

        let token = await Token.findOne({ UserId: user._id })
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }


        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`
        await sendEmail(user.email, "password reset", link)

        res.send("Password reset link sent to your email account")
    }
    catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}

const resetPassword = async(req, res) => {
    try {
        const schema = Joi.object({ password: joi.string().required() })
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}

module.exports = {
    forgotPassword,
    resetPassword
}