
exports.up = function(knex) {
    return knex.schema.createTable('tb_alocacao_turma', function(table){
        table.string('id_alocacao_turma').primary();
        table.string('fk_id_turma').notNullable();
        table.string('fk_id_sala').notNullable();
        table.date('ano_lectivo').notNullable();
        table.string('hora_entrada');
        table.string('hora_saida');
        table.foreign('fk_id_turma').references('id_turma')
             .inTable('tb_turma');

        table.foreign('fk_id_sala').references('id_sala')
            .inTable('tb_sala');

         })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_alocacao_turma'); 
};
