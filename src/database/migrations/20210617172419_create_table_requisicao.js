
exports.up = function(knex) {
    return knex.schema.createTable('tb_requisicao', function(table){
        table.increments('pk_id_requisicao').primary();           
        table.integer('fk_id_estado_requisicao').unsigned().notNullable();         
        table.integer('recolha').unsigned().notNullable();                    
        table.integer('cordenador').unsigned();
        table.integer('fielarmazem').unsigned();
        table.datetime('created_at').defaultTo(knex.fn.now());      
        table.datetime('update_at').defaultTo(knex.fn.now());   
        table.foreign('recolha').references('pk_id_funcionario').inTable('tb_funcionario');
        table.foreign('cordenador').references('pk_id_funcionario').inTable('tb_funcionario');
        table.foreign('fielarmazem').references('pk_id_funcionario').inTable('tb_funcionario');


        table.foreign('fk_id_estado_requisicao').references('pk_estado_requisicao').inTable('tb_estado_requisicao');
    })
  }; 
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_requisicao');
  };
          