
exports.up = function(knex) {
  return knex.schema.createTable('tb_endereco', function(table){
        table.increments('id_endereco').primary().notNullable();       
        table.string('nme_bairro').notNullable();
        table.string('rua');
        table.string('nr_casa').notNullable();
        table.string('nr_quarteirao').notNullable();
    })};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_endereco');
};