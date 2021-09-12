
exports.up = function (knex) {
    return knex.schema.createTable('tb_requisicao', function (table) {
        table.increments('pk_id_requisicao').primary();
        table.integer('fk_id_estado_requisicao').unsigned().notNullable();        
        table.integer('fk_id_usuario').unsigned()
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('update_at').defaultTo(knex.fn.now());


        table.foreign('fk_id_estado_requisicao').references('pk_estado_requisicao').inTable('tb_estado_requisicao');        
        table.foreign('fk_id_usuario').references('pk_id_usuarioc').inTable('tb_usuarioc');
    })
};

exports.down = function (knex) {
    
    return knex.schema.dropTable('tb_requisicao');
};
