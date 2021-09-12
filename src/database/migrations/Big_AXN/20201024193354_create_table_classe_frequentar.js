
exports.up = function(knex) {
    return knex.schema.createTable('tb_classe', function(table){
        table.increments('id_classe').primary();
        table.string('nome_classe').notNullable();        
        table.string('detalhes').notNullable();
         })
};

exports.down = function(knex) {
  
    return knex.schema.dropTable('tb_classe'); 
};
