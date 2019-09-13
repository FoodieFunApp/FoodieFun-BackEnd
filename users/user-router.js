const express = require('express');
const router = express.Router();

const Users = require('./user-model.js');

//Routers

router.get('/:userId', validateUserId, (req, res) => {
    res.status(200).json(req.user)
})

router.put('/:userId', validateUserId, async (req, res) => {
    const {userId} = req.params;
    const user = req.body;
    try {
        await Users.updateUser(userId, user);
        res.status(201).json({message: "User Updated", user: user});
    }
    catch(error) {
        res.status(500).json({message: "Could Not Update User", erro: error});
    }
})

router.delete('/:userId', validateUserId, async (req, res) => {
    const id = req.params.userId;
    try {
        const deletedUser = await Users.getUserBy({id})
        await Users.deleteUser(id);
        res.status(201).json({message: "User Deleted", deletedUser: deletedUser})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Delete User", error: error})
    }
})

router.get('/:userId/reviews', validateUserId, async(req, res) => {
    const {userId} = req.params
    try {
        const reviews = await Users.getReviews(userId)
        res.status(200).json(reviews)
    }
    catch(error) {
        res.status(500).json({message: "Could Not Get Reviews", error: error})
    }
})

router.post('/:userId/reviews', validateUserId, async ( req, res ) => {
    const review = req.body
    try {
        console.log(review)
        const add = await Users.addReview(review)
        res.status(200).json({message: "Review Added", review: review})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Add Review", error: error})
    }
})

router.put('/:userId/reviews/:reviewId', validateUserId, validateReviewId, async (req, res) => {
    const {reviewId} = req.params;
    const review = req.body;
    try {
        await Users.updateReview(reviewId, review);
        res.status(201).json({message: "Updated Review", review: review})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Get Review", error: error});
    }
})

router.delete('/:userId/reviews/:reviewId', validateUserId, validateReviewId, async (req, res) => {
    const id = req.params.reviewId;
    try {
        const deletedReview = await Users.getReviewsBy({id});
        await Users.deleteReview(id);
        res.status(201).json({message: "Review Deleted", deletedReview: deletedReview})
    }
    catch(error) {
        res.status(500).json({message: "Could Not Delete Review", error: error});
    }
})

//Middlewares

async function validateUserId(req, res, next) {
    const id = req.params.userId;
    try {
        const user = await Users.getUserBy({ id });
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({message: `User with Id: ${id} does not exist`});
        }
    }
    catch(error) {
        res.status(500).json({message: "validateUserId Error", error: error});
    }
}

async function validateReviewId (req, res, next) {
    const id = req.params.reviewId;
    try {
        const review = await Users.getReviewsBy({id});
        if(review) {
            next();
        } else {
            res.status(400).json({message: `Review with id ${id} does not exist`})
        }
    }
    catch(error) {
        res.status(500).json({message: "validateReviewId Error", error: error})
    }
}

module.exports = router;