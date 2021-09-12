
exports.up = function(knex) {
    return knex.schema.createTable('tb_tipo_usuario', function(table){
        table.increments('id_tipo_usuario').primary();
        table.string('tipo_usuario').notNullable();
        table.string('detalhes').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_tipo_usuario');
};
