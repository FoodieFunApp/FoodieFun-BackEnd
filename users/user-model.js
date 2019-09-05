const db = require('../database/db-config.js');

module.exports = {
    addUser
}

function addUser(user) {
    db('users').insert(user)
}