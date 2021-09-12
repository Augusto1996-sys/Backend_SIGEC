
exports.up = function(knex) {
    return knex.schema.createTable('tb_bairro', function(table){
        table.string('id_bairro').primary();
        table.string('nome_bairro').notNullable();
        table.string('distrito').notNullable();
        table.string('detalhes');         
        table.datetime('data_registo').defaultTo(knex.fn.now());
        table.datetime('data_actualizacao').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_bairro');
};
