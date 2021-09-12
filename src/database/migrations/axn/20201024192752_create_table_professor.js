
exports.up = function(knex) {
    return knex.schema.createTable('tb_professor', function(table){
        table.increments('id_professor').primary();        
        table.string('fk_id_pessoa').notNullable();        
        table.string('codigo_professor').notNullable();

        table.foreign('fk_id_pessoa').references('id_pessoa')
             .inTable('tb_pessoa') 
 
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_professor');  
};
