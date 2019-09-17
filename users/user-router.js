const express = require('express');
const router = express.Router();

const { validateUserId, validateReviewId, validateReviewInputs, authorizeUser } = require('../middlewares.js');

const Users = require('./user-model.js');

//Routers

router.get('/', async (req, res) => {
    try {
        const users = await Users.getUsers()
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({ message: "Could Not Get Users", error: error })
    }
})

router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Users.getAllReviews()
        res.status(200).json(reviews)
    }
    catch (error) {
        res.status(500).json({ message: "Could Not Get Users", error: error })
    }
})

router.get('/:userId', authorizeUser, validateUserId, async (req, res) => {
    const { userId } = req.params;
    const user = req.body;
    try {
        const users = await Users(userId, user);
        console.log(users)
        res.status(201).json({ message: "User validated" });
    }
    catch (error) {
        res.status(500).json({ message: "Could not validate user", error: error });
    }
})

router.put('/:userId', authorizeUser, validateUserId, async (req, res) => {
    const { userId } = req.params;
    const user = req.body;
    try {
        await Users.updateUser(userId, user);
        res.status(201).json({ message: "User Updated", user: user });
    }
    catch (error) {
        res.status(500).json({ message: "Could Not Update User", error: error });
    }
})

router.delete('/:userId', authorizeUser, validateUserId, async (req, res) => {
    const id = req.params.userId;
    try {
        const deletedUser = await Users.getUserBy({ id })
        await Users.deleteUser(id);
        res.status(201).json({ message: "User Deleted", deletedUser: deletedUser })
    }
    catch (error) {
        res.status(500).json({ message: "Could Not Delete User", error: error })
    }
})

router.get('/:userId/reviews', authorizeUser, validateUserId, async (req, res) => {
    const { userId } = req.params
    try {
        const reviews = await Users.getReviews(userId)
        res.status(200).json(reviews)
    }
    catch (error) {
        res.status(500).json({ message: "Could Not Get Reviews", error: error })
    }
})

router.post('/:userId/reviews', authorizeUser, validateUserId, validateReviewInputs, async (req, res) => {
    const review = req.body

    try {
        console.log(review)
        const add = await Users.addReview(review)
        res.status(200).json({ message: "Review Added", review: review })
    }
    catch (error) {
        res.status(500).json({ message: "Could Not Add Review", error: error })
    }
})

router.put('/:userId/reviews/:reviewId', authorizeUser, validateUserId, validateReviewId, validateReviewInputs, async (req, res) => {
    const { reviewId } = req.params;
    const review = req.body;
    const { userId } = req.params;
    try {
        await Users.updateReview(reviewId, review);
        const reviewList = await Users.getReviews(userId)
        res.status(201).json({ message: "Updated Review", review: review, reviewList: reviewList })
    }
    catch (error) {
        res.status(500).json({ message: "Could Not Get Review", error: error });
    }
})

router.delete('/:userId/reviews/:reviewId', authorizeUser, validateUserId, validateReviewId, async (req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.params.userId;
    try {
        await Users.deleteReview(reviewId);
        const reviewList = await Users.getReviews(userId);
        res.status(201).json({ message: "Review Deleted", reviewList: reviewList })
    }
    catch (error) {
        res.status(500).json({ message: "Could Not Delete Review", error: error });
    }
})

module.exports = router;