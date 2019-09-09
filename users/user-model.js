const db = require('../database/db-config.js');

module.exports = {
    addUser,
    deleteUser,
    getUserBy,
    updateUser,
    addReview,
    updateReview,
    deleteReview,
    getReviews,
    getReviewsBy
}

async function addUser(user) {
    return await db('users').insert(user)
}

async function deleteUser(id) {
    return await db('users').where({ id }).del()
}

async function getUserBy(filter) {
    return await db('users').where(filter).first()
}

async function updateUser(id, user) {
    return await db('users').where({ id }).update(user)
}

async function getReviews() {
    return await db('reviews')
}

async function getReviewsBy(filter) {
    return await db('reviews').where(filter)
}

async function addReview(review) {
    return await db('reviews').insert(review)
}

async function updateReview(id, review) {
    return await db('reviews').where({ id }).update(review)
}

async function deleteReview(id) {
    return await db('reviews').where({ id }).del()
}