
exports.up = function(knex) {
    return knex.schema.createTable('tb_pessoa', function(table){
        table.string('id_pessoa').primary();
        table.string('fk_id_endereco').notNullable();
        table.string('apelido').notNullable();
        table.string('outros_nomes').notNullable();
        table.string('nr_bi').notNullable();
        table.date('data_nascimento').notNullable();
        table.enum('genero',['M','F']).notNullable();
        table.datetime('data_registo').defaultTo(knex.fn.now());
        table.datetime('data_actualizacao').defaultTo(knex.fn.now());

        table.foreign('fk_id_endereco').references('id_endereco').inTable('tb_endereco'); 
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_pessoa');  
};
