
exports.up = function(knex) {
    return knex.schema.createTable('tb_turma', function(table){
        table.increments('id_turma').primary();
        table.string('nome_turma').notNullable();
        table.date('ano_lectivo').notNullable();
        table.string('detalhes');        
        table.datetime('data_registo').defaultTo(knex.fn.now());
        table.datetime('data_actualizacao').defaultTo(knex.fn.now());

         })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_turma'); 
};
