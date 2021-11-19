exports.up = function (knex) {
  return knex.schema.createTable('theaters', (table) => {
    table.increments('theater_id').primary(); // sets theater_id as the primary key
    table.string('name');
    table.string('address_line_1');
    table.string('address_line_2');
    table.string('city');
    table.string('state');
    table.string('zip');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('theaters');
};