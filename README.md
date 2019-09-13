# FoodieFun-BackEnd

FoodieFun App:

FoodieFun is an app designed to allow food critics from all over the world to express their love for food by telling all of us about their overall experience!  Users can create an account, tells us a little bit about themselves and travels all over letting us know what places to try, what types of food and desserts to salivate over, places that have really long lines, etc.  

Getting Started:

You can fork your own copy of this repo here:  https://github.com/FoodieFunApp/FoodieFun-BackEnd

Dependencies needed:

Express.js = npm install express --save

Nodemon = npm install -g nodemon

Knex = $ npm install knex -g

Jest = npm install --save-dev jest

supertest = npm install supertest --save-dev

dotenv = npm install dotenv

bcrypt.js = npm install bcryptjs

Built with:

Backend:
  express
  sqlite3
  knex
  jest
  supertest
  dotenv
  cross-env
  nodemon
  cors
  helmet
  bcryptjs
  jwt
  postgres

MVP:

1. On-boarding process for users
2. Ability to create and post a menu item review (restaurant name, restaurant type, menu item name, photo of your order, price, food rating).  Hitting submit adds item to the homepage
3. Ability to edit/delete a review.  Deleting removes from homepage.
4. Homepage to see a grid of all your recent menu item reviews.  Can filter by restaurant, price, food type, date visited and your rating

STRETCH GOAL:

Add a social aspect.  You can friend other users, and see what they order frequenty or rate the highest at places new and old.