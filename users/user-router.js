const express = require('express');
const router = express.Router();

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

async function validateUserCredentials(req, res, next) {
    const { userCredentials } = req.body;
    try {
        const user = await Users.getUserBy({ userCredentials });
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({ message: "user credentials invalid" })
        }
    }
    catch (error) {
        res.status(500).json({ message: "validateUserCredentials error", error: error })
    }
}

module.exports = router;