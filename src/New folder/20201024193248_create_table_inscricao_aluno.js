
exports.up = function(knex) {
    return knex.schema.createTable('tb_inscricao', function(table){
        table.string('id_inscricao').primary();
        table.string('fk_id_turma').notNullable();
        table.string('fk_id_classe').notNullable();        
        table.string('fk_id_aluno').notNullable();
        table.datetime('ano_lectivo').notNullable();        
        table.datetime('data_registo').defaultTo(knex.fn.now());
        table.datetime('data_actualizacao').defaultTo(knex.fn.now());

        table.foreign('fk_id_turma').references('id_turma').inTable('tb_turma');
        table.foreign('fk_id_classe').references('id_classe').inTable('tb_classe');
        table.foreign('fk_id_aluno').references('id_aluno').inTable('tb_aluno'); 

         })
};

exports.down = function(knex) {
  
    return knex.schema.dropTable('tb_inscricao'); 
};
