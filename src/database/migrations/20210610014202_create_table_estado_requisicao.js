
exports.up = function(knex) {
    return knex.schema.createTable('tb_estado_requisicao', function(table){
        table.increments('pk_estado_requisicao').primary();      
        table.string('nome').notNullable();    
        table.string('descricao')
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_estado_requisicao');
  };
          