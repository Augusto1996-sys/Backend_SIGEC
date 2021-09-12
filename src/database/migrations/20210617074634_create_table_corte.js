
exports.up = function(knex) {
    return knex.schema.createTable('tb_corte', function(table){
        table.increments('pk_id_corte').primary();      
        table.integer('fk_id_cutsheet').unsigned().notNullable();
        table.string('ordem_corte').notNullable();        
        table.double('tamanho_folha').notNullable();
        table.double('nr_folha').notNullable();
        table.double('metragem_total').notNullable();
        table.string('estado_corte').notNullable();
        table.string('detalhes').notNullable();        
        table.datetime('created_at').defaultTo(knex.fn.now());      
        table.datetime('update_at').defaultTo(knex.fn.now()); 
         })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_corte');
  };
          