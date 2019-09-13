
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments('id');
        tbl.string('username').notNullable().unique();
        tbl.string('password').notNullable();
    })
    .createTable('reviews', tbl => {
        tbl.increments('id');
        tbl.string('restaurantName').notNullable();
        tbl.string('restaurantType').notNullable();
        tbl.string('itemName').notNullable();
        tbl.integer('userId').unsigned().references('id').inTable('users');
        tbl.string('photoUrl');
        tbl.decimal('price');
        tbl.integer('rating').notNullable();
        tbl.string('waitTime');
        tbl.string('comments').notNullable();
        tbl.date('visitDate').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('reviews')
    .dropTableIfExists('users')
};
