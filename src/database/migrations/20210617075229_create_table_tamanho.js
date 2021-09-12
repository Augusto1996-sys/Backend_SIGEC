
exports.up = function(knex) {
    return knex.schema.createTable('tb_tamanho', function(table){
        table.increments('pk_id_tamanho').primary();      
        table.string('tamanho').notNullable();
        table.string('detalhes').notNullable();        
         })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_tamanho');
  };
          