const db = require('../database/db-config.js');

module.exports = {
    addUser,
    deleteUser,
    getUserBy,
    updateUser
}

async function addUser(user) {
    return await db('users').insert(user)
}

async function deleteUser(id) {
    return await db('users').where({id}).del()
}

async function getUserBy(filter) {
    return await db('users').where(filter).first()
}

async function updateUser(id, user) {
    return await db('users').where({id}).update(user)
}