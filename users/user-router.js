const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./user-model.js');

//Routers

router.get('/:userId', validateUserId, (req, res) => {
    res.status(200).json(req.user)
})

module.exports = router;