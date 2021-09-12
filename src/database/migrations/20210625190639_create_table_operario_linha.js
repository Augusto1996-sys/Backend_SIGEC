
exports.up = function (knex) {
    return knex.schema.createTable('tb_operario_linha', function (table) {
        table.increments('pk_id_operario_linha').primary();
        table.integer('fk_id_operario').unsigned().notNullable();
        table.integer('fk_id_linha').unsigned();
        table.integer('fk_id_operacao').unsigned();        
        table.integer('fk_id_cutsheet').unsigned();
        /*table.integer('meta1');
        table.integer('concerto1');
        table.integer('meta2');
        table.integer('concerto2');
        table.integer('meta3');
        table.integer('concerto3');
        table.integer('meta4');
        table.integer('concerto4');
        table.integer('meta5');
        table.integer('concerto5');
        table.integer('meta6');
        table.integer('concerto6');
        table.integer('meta7');
        table.integer('concerto7');
        table.integer('meta8');
        table.integer('concerto8');
        table.integer('meta9');
        table.integer('concerto9');*/

        
        table.foreign('fk_id_cutsheet').references('pk_id_cutsheet').inTable('tb_cutsheet');
        table.foreign('fk_id_linha').references('pk_id_linha').inTable('tb_linha');
        table.foreign('fk_id_operacao').references('pk_id_operacoes').inTable('tb_operacoes');
        table.foreign('fk_id_operario').references('pk_id_operario').inTable('tb_operario');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('tb_operario_linha');
};
