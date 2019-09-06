const express = require('express');
const router = express.Router();

const Users = require('./user-model.js');

router.get('/:userId', validateUserId, (req, res) => {
    res.status(200).json(req.user)
})

//Middlewares

const validateUserId = async (req, res, next) => {
    const {id} = req.params;
    try {
        const user = await Users.getUserBy({id});
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