const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./user-model.js');

//Routers

router.get('/:userId', validateUserId, (req, res) => {
    res.status(200).json(req.user)
})

//Middlewares

async function validateUserId(req, res, next) {
    const { userId } = req.params;
    try {
        const user = await Users.getUserBy({ id: userId });
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({ message: `User with Id: ${id} does not exist` })
        }
    }
    catch (error) {
        res.status(500).json({ message: "validateUserId Error", error: error })
    }
}

const { username, password } = req.body;

if (username && password ) {
    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                next();
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Ran into an unexpected error' });
        });
} else {
    res.status(400).json({ message: 'No credentials provided' });
}

module.exports = (req, res, next) => {
    const authorization = req.body.authorization;

    if(authorization) {
        jwt.verify(authorization, 'areyouforreal', (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: 'areyouserious?'});
            } else { 
                req.decodedJwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({message: 'nope not gonna work'});
    }
};

module.exports = router;