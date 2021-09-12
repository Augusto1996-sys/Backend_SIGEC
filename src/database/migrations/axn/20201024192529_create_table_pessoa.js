
exports.up = function(knex) {
    return knex.schema.createTable('tb_pessoa', function(table){
        table.string('id_pessoa').primary();      
        table.integer('fk_id_users').unsigned().notNullable();             
        table.integer('fk_id_endereco').unsigned().notNullable();
        table.string('apelido').notNullable();
        table.string('outros_nomes').notNullable();
        table.string('nr_bi').notNullable();
        table.date('data_nascimento').notNullable();
        table.enum('genero',['M','F']).notNullable();        
        table.string('nome_bairro').notNullable();
        table.string('distrito').notNullable();    
        table.datetime('data_registo').defaultTo(knex.fn.now());
        table.datetime('data_actualizacao').defaultTo(knex.fn.now());
        
        table.foreign('fk_id_users').references('id_users').inTable('tb_usuario'); 
        table.foreign('fk_id_endereco').references('id_endereco').inTable('tb_endereco'); 
        
          })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_pessoa');  
};
