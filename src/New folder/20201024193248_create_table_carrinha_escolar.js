
exports.up = function(knex) {
  
    return knex.schema.createTable('tb_carrinha', function(table){
        table.increments('id_carrinha').primary();
        table.string('fk_id_aluno').notNullable();
        table.string('matricula').notNullable();
        table.integer('lotacao').notNullable();
        table.string('zonas_de_recolha').notNullable();
        table.string('outros_detalhes').notNullable();

        table.foreign('fk_id_aluno').references('id_aluno').inTable('tb_aluno').onDelete('SET NULL'); 
    })
};

exports.down = function(knex) {    
    return knex.schema.dropTable('tb_aluno');   
};
