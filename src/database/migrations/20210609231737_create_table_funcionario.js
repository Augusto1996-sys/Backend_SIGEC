
exports.up = function(knex) {
    return knex.schema.createTable('tb_funcionario', function(table){
        table.increments('pk_id_funcionario').primary();         
        table.integer('fk_id_linha').unsigned().notNullable();      
        table.string('nome_funcionario').notNullable();
        table.string('genero').notNullable();        
        table.string('nr_bi').notNullable();
        table.string('nr_nui').notNullable(); 
        table.string('nome_bairro').notNullable();
        table.string('quarteirao_nr').notNullable();        
        table.string('casa_nr').notNullable();    
        table.string('nr_telefone').notNullable(); 
        table.string('nr_funcionario').notNullable();      
        table.date('data_nascimento').notNullable();
        table.datetime('created_at').defaultTo(knex.fn.now());      
        table.datetime('update_at').defaultTo(knex.fn.now());  

        table.foreign('fk_id_linha').references('pk_id_linha').inTable('tb_linha');
  
         })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_funcionario');
  };
          