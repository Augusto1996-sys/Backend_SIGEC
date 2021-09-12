
exports.up = function(knex) {
    return knex.schema.createTable('tb_pauta', function(table){
        table.string('id_pauta').primary();
        table.string('fk_id_inscricao').notNullable();
        table.string('fk_id_disciplina').notNullable();
        table.decimal('teste_1');
        table.decimal('teste_2'); 
        table.decimal('teste_3');
        table.decimal('trabalho_1');
        table.decimal('trabalho_2');
        table.decimal('trabalho_3');        
        table.datetime('data_registo').defaultTo(knex.fn.now());
        table.datetime('data_actualizacao').defaultTo(knex.fn.now());

        table.foreign('fk_id_inscricao').references('id_inscricao').inTable('tb_inscricao');
        table.foreign('fk_id_disciplina').references('id_disciplina').inTable('tb_disciplina'); 
        
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_pauta');  
};
