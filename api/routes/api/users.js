const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const ourContactEmail = require('../../config/keys').ourContactEmail;
const ourContactPass = require('../../config/keys').ourContactPass;
const User = require('../../models/User');


/* @route /api/users/register */
router.post('/register', (req, res) => {
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
                msg: "Email is already registerd."
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

    /* Hash the password */
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User is now registerd."
                })
                // TODO - handle database error
            });
        });
    });
});

/* @route /api/users/login */
router.post('/login', (req, res) => {
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
});

/* @route /api/users/profile */
router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({ user })
    } catch (error) {
        console.log(error);
        res.status(404).json('User not found!')
    }
});

// Send Contact Email
router.post("/contact", async (req, res) => {
    try {
        let output = `
            YOU HAVE A NEW CONTACT REQUEST!
            ---------------------------------------------------------
            Contact Details
            ---------------------
            Name: ${req.body.name}
            Email: ${req.body.email}
            Message:
            ${req.body.textMessage}
        `;

        const transporter = await nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: ourContactEmail,
                pass: ourContactPass
            }
        });

        let mailOption = {
            from: req.body.email,
            to: "nemanja.danev.93@gmail.com",
            text: output
        };

        await transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

    } catch (error) {
        console.log(error)
    }
});

module.exports = router;