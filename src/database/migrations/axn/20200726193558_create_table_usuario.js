
exports.up = function(knex) {
  return knex.schema.createTable('tb_usuario', function(table){
      table.increments('id_users').primary();      
      table.integer('fk_id_tipo_usuario').unsigned().notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable(); 
      table.string('passwordResetToken');
      table.datetime('passwordResetExpires');        
      table.enum('state', ['enable','disable', 'delete']).defaultTo('enable').notNullable();    
      table.datetime('created_at_usuario').defaultTo(knex.fn.now());      
      table.datetime('update_at_usuario').defaultTo(knex.fn.now()); 

      table.foreign('fk_id_tipo_usuario').references('id_tipo_usuario').inTable('tb_tipo_usuario');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_usuario');
};
        