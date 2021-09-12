
exports.up = function(knex) {
    return knex.schema.createTable('tb_referencia_produto', function(table){
        table.increments('pk_id_referencia').primary();      
        table.string('refencia').notNullable();    
        table.string('descricao')
    })
  };  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_referencia_produto');
  };
          