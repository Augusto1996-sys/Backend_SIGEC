yy
exports.up = function(knex) {
    return knex.schema.createTable('tb_sala', function(table){
        table.increments('id_sala').primary();
        table.integer('nr_sala').notNullable();
        table.integer('lotacao_sala').notNullable();
        table.string('detalhes');

         })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_sala'); 
};
