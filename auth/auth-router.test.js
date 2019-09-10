const db = require('../database/db-config');
const Users = require('../users/user-model');

beforeEach(async () => {
    await db('users').truncate();
});

describe('Users.addUser', () => {
    it('Registers new user to db', async () => {
        let newUser = { "username": "RegTest", "password": "testpass" }
        let user = await Users.addUser(newUser);
        expect(user).toHaveLength(1)
    })
})

describe('User.getUserBy(filter)', () => {
    it('Should find the user that was just registered', async () => {
        let username = "RegTest";
        let testUser = await Users.getUserBy(username);
        expect(testUser.username).toBe("RegTest");
    })
})