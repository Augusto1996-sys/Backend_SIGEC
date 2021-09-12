
exports.up = function(knex) {
    return knex.schema.createTable('tb_disciplina', function(table){
        table.increments('id_disciplina').primary();
        table.integer('fk_id_classe').unsigned().notNullable();
        table.string('nome_disciplina').notNullable();        
        table.datetime('data_registo').defaultTo(knex.fn.now());
        table.datetime('data_actualizacao').defaultTo(knex.fn.now());

        table.foreign('fk_id_classe').references('id_classe').inTable('tb_classe'); 
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_disciplina');  
};
