
exports.up = function(knex) {
    return knex.schema.createTable('tb_professor', function(table){
        table.string('id_professor').primary();
        table.string('fk_id_pessoa').notNullable();
        table.string('fk_id_users').notNullable();

        table.foreign('fk_id_pessoa').references('id_pessoa')
             .inTable('tb_pessoa') 

        table.foreign('fk_id_users').references('id_users')
             .inTable('users') 
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_professor');  
};
