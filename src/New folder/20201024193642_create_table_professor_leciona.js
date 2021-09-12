
exports.up = function(knex) {
    return knex.schema.createTable('tb_professor_leciona', function(table){
        table.string('id_professor_leciona').primary();
        table.string('fk_id_professor').notNullable();
        table.string('fk_id_disciplina').notNullable();
        table.string('editora_referencia').notNullable();


        table.foreign('fk_id_professor').references('id_professor')
             .inTable('tb_professor');

        table.foreign('fk_id_disciplina').references('id_disciplina')
            .inTable('tb_disciplina'); 

         })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_professor_leciona'); 
};
