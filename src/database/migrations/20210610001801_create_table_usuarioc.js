
exports.up = function(knex) {
    return knex.schema.createTable('tb_usuarioc', function(table){
        table.increments('pk_id_usuarioc').primary();      
        table.integer('fk_id_funcionario').unsigned().notNullable(); 
        table.string('email').notNullable();
        table.string('password').notNullable(); 
        table.boolean('isoque');
        table.string('passwordResetToken');
        table.datetime('passwordResetExpires');        
        table.enum('state', ['enable','disable', 'delete']).defaultTo('enable').notNullable();    
        table.datetime('created_at').defaultTo(knex.fn.now());      
        table.datetime('update_at').defaultTo(knex.fn.now()); 
  
        table.foreign('fk_id_funcionario').references('pk_id_funcionario').inTable('tb_funcionario');
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_usuarioc');
  };
          