const Users = require('./user-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



module.exports = {
    validateUserId, authorizeUser, validateUser, validateReviewInputs
}


async function validateUserId(req, res, next) { //middleware for validating userID
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

const authorizeUser = (req, res, next) => { //middleware for authorization
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

};

const validateUser = (req, res, next) => { //middleware for validating user and users
    const { username, password } = req.body;

    if (username && password ) {
        next();
    } else {
        res.status(400).json({ message: 'username and password are required' });
    }
}

const validateReviewInputs = (req, res, next) => { //middleware for review inputs on restaurant name, restaurant type, item name, rating, comments and visit date
    const { restaurantName, restaurantType, itemName, rating, comments, visitDate } = req.body;

    if (restaurantName && restaurantType && itemName && rating && comments && visitDate) {
        next();
    } else {
        res.status(400).json({ message: 'Missing required information'});
    }
      
}
