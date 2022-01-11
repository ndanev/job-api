const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = global.gConfig.secret;

const register = (c, req, res) => {

    let { name, username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        res.status(400).json({
            msg: "Password does not matched.",

        });
    }

    /* Check for username */
    User.findOne({ username: username }).then(user => {
        if (user) {
            res.status(400).json({
                msg: "Username is already taken."
            });
        }
    });

    /* Check for email */
    User.findOne({ email: email }).then(user => {
        if (user) {
            res.status(400).json({
                msg: "Email is already used."
            });
        }
    });

    /* Register a new user */
    let newUser = new User({
        name,
        username,
        password,
        email
    });

    /* Hash the password & save user in database */
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User is now registerd."
                }).catch(error => {
                    // TODO - handle database error
                    console.log(error);
                    return res.status(404).json({
                        success: false,
                        msg: "Something went wrong."
                    })
                })
            });
        });
    });
}

const login = (c, req, res) => {
    User.findOne({ username: req.body.username }).then(user => {
        if (!user) {
            res.status(404).json({
                msg: "User is not found.",
                success: false
            });
        }

        /* If there is a user, go to compare a passowrds */
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email
                }

                /* Add a token to the user using jwt */
                jwt.sign(payload, key, { expiresIn: "24h" }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        user: user,
                        token: `Bearer ${token}`,
                        msg: "You are logged in."
                    })
                });

            } else {
                res.status(404).json({
                    msg: "Incorrect password.",
                    success: false
                });
            }
        });
    });
}

const profile = async (c, req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({ user })
    } catch (error) {
        console.log(error);
        res.status(404).json('User not found!')
    }
}


module.exports = { register, login, profile }