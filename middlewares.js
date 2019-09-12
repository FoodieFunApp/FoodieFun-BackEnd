const Users = require('./user-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



module.exports = {
    validateUserId, authorizeUser, validateUser, validateReviewInputs
}


async function validateUserId(req, res, next) { //middlware for validating userID
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
    }
};

const validateUser = (req, res, next) => { //middleware for validating user or users
    const { username, password } = req.body;

    if (username && password ) {
        next();
    } else {
        res.status(400).json({ message: 'username and password are required' });
    }
}

const validateReviewInputs = (req, res, next) => { //middleware for review inputs on restaurant name, restaurant type, item name, rating, comments and visit date
    const { restaurant_name, restaurant_type, item_name, rating, comments, visit_date } = req.body;

    if (restaurant_name) {
        next();
    } else {
        res.status(400).json({ message: 'Restaurant Name'});
    }
    if (restaurant_type) {
        next();
    } else {
        res.status(400).json({ message: 'Restaurant Type'});
    }
    if (item_name) {
        next();
    } else {
        res.status(400).json({ message: 'Item Name'});
    }
    if (rating) {
        next();
    } else {
        res.status(400).json({ message: 'Rating'});
    }
    if (comments) {
        next();
    } else {
        res.status(400).json({ message: 'Comments'});
    }
    if (visit_date) {
        next();
    } else {
        res.status(400).json({ message: 'Date visited'});
    }
}





