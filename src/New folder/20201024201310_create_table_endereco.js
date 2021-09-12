
exports.up = function(knex) {
  return knex.schema.createTable('tb_endereco', function(table){
        table.string('id_endereco').primary();
        table.string('fk_id_bairro').notNullable();
        table.string('rua').notNullable();
        table.string('nr_casa').notNullable();
        table.string('nr_quarteirao');
        table.foreign('fk_id_bairro').references('id_bairro').inTable('tb_bairro'); 
    })};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_endereco');
};