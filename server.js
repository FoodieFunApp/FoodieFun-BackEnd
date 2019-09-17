const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRouter = require('./users/user-router.js')
const authRouter = require('./auth/auth-router');
const reviewRouter = require('./reviews/review-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);
server.use('/api/reviews', reviewRouter);

server.get('/', (req, res) => {
    res.send('<h1>Backend API for FoodieFun</h1>');
})

module.exports = server;