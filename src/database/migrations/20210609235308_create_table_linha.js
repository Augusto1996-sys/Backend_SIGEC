
exports.up = function(knex) {
    return knex.schema.createTable('tb_linha', function(table){
        table.increments('pk_id_linha').primary();      
        table.string('nome_sector').notNullable(); 
        table.integer('nr_linha')  
        table.string('descricao').notNullable();   
  
         })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_linha');
  };
          