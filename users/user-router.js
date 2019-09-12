const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./user-model.js');

//Routers

router.get('/:userId', validateUserId, async (req, res) => {
    const {userId} = req.params;
    const user = req.body;
    try {
        await Users(userId, user);
        res.status(201).json({message: "User validated"});
    }
    catch(error) {
        res.status(500).json({ message: "Could not validate user", error: error});
    }
})

router.put('/:userId', validateUserId, async (req, res) => {
    const {userId} = req.params;
    const user = req.body;
    try {
        await Users.updateUser(userId, user);
        res.status(201).json({message: "User Updated", user: user});
    }
    catch(error) {
        res.status(500).json({message: "Could Not Update User", error: error});
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



module.exports = router;