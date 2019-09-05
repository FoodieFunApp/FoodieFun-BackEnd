const db = require('../database/db-config.js');

module.exports = {
    addUser,
    deleteUser
}

async function addUser(user) {
    return await db('users').insert(user)
}

async function deleteUser(id) {
    return await db('users').where({id}).del()
}