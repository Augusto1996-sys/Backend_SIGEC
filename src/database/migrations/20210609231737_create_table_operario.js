
exports.up = function(knex) {
    return knex.schema.createTable('tb_operario', function(table){
        table.increments('pk_id_operario').primary();               
        table.string('nome_operario').notNullable();
        table.string('genero').notNullable();        
        table.string('nr_bi').notNullable();
        table.string('nr_nui').notNullable(); 
        table.string('nome_bairro').notNullable();
        table.string('quarteirao_nr').notNullable();        
        table.string('casa_nr').notNullable();    
        table.string('nr_telefone').notNullable(); 
        table.string('nr_operario').notNullable();      
        table.date('data_nascimento').notNullable();
        table.datetime('created_at_operario').defaultTo(knex.fn.now());      
        table.datetime('update_at_operario').defaultTo(knex.fn.now());  

  
         })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_funcionario');
  };
          