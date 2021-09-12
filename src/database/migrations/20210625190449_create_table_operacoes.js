
exports.up = function(knex) {
    return knex.schema.createTable('tb_operacoes', function(table){
        table.increments('pk_id_operacoes').primary();      
        table.string('nome_operacao').notNullable();
        table.string('detalhes')  
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_operacoes');
  };
          