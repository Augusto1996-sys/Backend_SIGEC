
exports.up = function(knex) {
    return knex.schema.createTable('tb_usuarioc', function(table){
        table.increments('pk_id_usuarioc').primary();      
        table.string('email').notNullable();
        table.string('password').notNullable(); 
        table.string('nivel');
        table.string('passwordResetToken');
        table.datetime('passwordResetExpires');        
        table.enum('state', ['enable','disable', 'delete']).defaultTo('enable').notNullable();    
        table.datetime('created_at_usuarioc').defaultTo(knex.fn.now());      
        table.datetime('update_at_usuarioc').defaultTo(knex.fn.now()); 
  
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_usuarioc');
  };
          