const Users = require('../users/user-model.js');
const db = require('../database/db-config.js')

describe('user tests', () => {

    describe('addUser', () => {

        beforeEach( async () => {
            db('users').truncate()
        })

        it('should add a user to the db', async () => {
            await Users.addUser({username: "Kenichiwa", password: "password"});
            const users = await db('users');
            expect(users).toHaveLength(1);
        })

        it('should hash the password', async () => {
            await Users.addUser({username: "Kenichiwa", password: "password"});
            const user = await db('users').first()
            expect(user.password).not.toBe("password")
        })
    })

})

describe('review tests', () => {
    
})