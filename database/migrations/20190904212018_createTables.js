
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments('id');
        tbl.string('username').notNullable().unique();
        tbl.string('password').notNullable();
    })
    .createTable('reviews', tbl => {
        tbl.increments('id');
        tbl.string('restaurant-name').notNullable();
        tbl.string('restaurant-type').notNullable();
        tbl.string('item-name').notNullable();
        tbl.integer('user-id').unsigned().references('id').inTable('users');
        tbl.string('photo-url');
        tbl.decmial('price');
        tbl.integer('rating').notNullable();
        tbl.string('wait time');
        tbl.string('comments').notNullable();
        tbl.date('visit-date').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('reviews')
    .dropTableIfExists('users')
};
