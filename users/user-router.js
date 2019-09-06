const express = require('express');
const router = express.Router();

const Users = require('./user-model.js');

//Routers

router.get('/:userId', validateUserId, (req, res) => {
    res.status(200).json(req.user)
})

router.post('/auth/register', async (req, res) => {
    const user = req.body;
    try {
        const register = await Users.addUser(user);
        res.status(200).json({message: "Login Success", user: user})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Register User", error: error})
    }
})

//Middlewares

async function validateUserId (req, res, next) {
    const {userId} = req.params;
    try {
        const user = await Users.getUserBy({id: userId});
        if(user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({message: `User with Id: ${id} does not exist`})
        }
    }
    catch(error) {
        res.status(500).json({message: "validateUserId Error", error: error})
    }
}

module.exports = router;