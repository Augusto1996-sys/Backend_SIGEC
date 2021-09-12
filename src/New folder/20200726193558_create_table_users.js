
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
      table.string('id_users').primary();
      table.string('email').notNullable();
      table.string('password').notNullable(); 
      table.string('passwordResetToken');
      table.datetime('passwordResetExpires');        
      table.enum('state', ['enable','disable', 'delete']).defaultTo('enable').notNullable();    
      table.datetime('created_at').defaultTo(knex.fn.now());      
      table.datetime('update_at').defaultTo(knex.fn.now()); 
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
        