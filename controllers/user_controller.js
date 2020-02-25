const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 10;
const fs = require('fs');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.deleteUser = (req, res) => {
    User.deleteOne({ email : req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            res.json(user);
        }
    });
};

exports.getUserByEmail = (req, res) => {
    User.findOne({ email : req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            res.json(user);
        }
    });
};

exports.list = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            res.json(user);
        }
    });
};

exports.login = (req, res, next) => {
    // On cherche d'abord si l'utilisateur existe
    User.findOne({ email : req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: err });
        } else {
            // Si l'utilisateur (l'email) existe
            if (user) {
                // Comparaison du mot de passe saisi et du hash
                bcrypt.compare(req.body.password, user.hash_password, (err, match) => {
                    if (match) {
                        const jwtUser = { email: user.email, userId: user._id };
                        const token = jwt.sign(jwtUser, 'RESTFULAPIs');
                        res.json({ token: token, user: jwtUser });
                    } else {
                        res.status(400).send('Passwords not matching');
                    }
                });
            } else {
                res.status(400).send('Email not found');
            }
        }
    });
};

exports.register = (req, res, next) => {
    User.findOne({ email : req.body.email }, (err, user) => {
        if (user == null) { // Aucun utilisateur n'utilise cet email

            /* Cryptage du mot de passe avant insertion dans la base de données */
            bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS, (err, hashedPassword) => {
                var newUser = new User(req.body);
                newUser.hash_password = hashedPassword;
                newUser.save((err, user) => {
                    if (err) {
                        return res.status(400).send({ message: err });
                    } else {
                        user.hash_password = undefined;
                        res.json(user);
                    }
                });
            });
        } else {
            res.status(401).send('User already exists');
        }
    });
};
