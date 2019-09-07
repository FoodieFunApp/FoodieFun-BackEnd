const express = require('express');
const router = express.Router();

const Users = require('./user-model');
//const restricted = require('../auth/restricted-middleware.js');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send({ message: 'You shall not pass!' }))
})
module.exports = router;