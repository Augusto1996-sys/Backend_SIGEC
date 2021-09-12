
exports.up = function(knex) {
    return knex.schema.createTable('tb_classe', function(table){
        table.string('id_classe').primary();
        table.integer('nome_classe').notNullable();
         })
};

exports.down = function(knex) {
  
    return knex.schema.dropTable('tb_classe'); 
};
