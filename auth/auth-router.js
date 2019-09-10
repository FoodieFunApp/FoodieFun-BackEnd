const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const Users = require('../users/user-model');

//
// when we register, all we do is take the username
// and password, hash the password (with salt, of course!),
// and store them in the DB, and return success.
//
// these will be used in any /login request to validate
// the login attempt.
//
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Users.addUser(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    // get the username and password from the body.
    let { username, password } = req.body;

    Users.getUserBy({ username })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user);
                console.log('token : ', token);

                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    token
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        // this is for DB lookup errors...
        .catch(error => {
            res.status(500).json(error);
        });
});


function genToken(user) {
    const payload = {
        subject: "user",
        username: user.username
    };

    const secret = secrets.jwtSecret;

    const options = {
        expiresIn: '1h'
    };

    //
    // finally, just sign the dang thing and return it already!
    //
    return jwt.sign(payload, secret, options);

}

module.exports = router;