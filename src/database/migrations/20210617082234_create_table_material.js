
exports.up = function(knex) {
    return knex.schema.createTable('tb_material', function(table){
        table.increments('pk_id_material').primary();      
        table.integer('fk_id_referencia').unsigned().notNullable();        
        table.integer('fk_id_cutsheet').unsigned().notNullable();
        table.integer('fk_id_tamanho').unsigned().notNullable();;
        table.string('nome').notNullable();
        table.integer('quantidade'); 
        table.double('dimensao'); 
        table.string('cor');
        table.string('numero_buracos');
        table.double('metragem'); 
        table.integer('bale_number');
        table.string('cod_cones'),
        table.string('tipo');
        table.string('cod_tecido');
        table.string('tamanho');
        table.enum('estado_rolo', ['armazenado','cortado','danificado', 'por_cortar']).defaultTo('armazenado'); 
        table.string('quantidade_Stock');
        table.string('shade');
        table.datetime('created_at').defaultTo(knex.fn.now());      
        table.datetime('update_at').defaultTo(knex.fn.now()); 
  
        table.foreign('fk_id_referencia').references('pk_id_referencia').inTable('tb_referencia_produto');
        table.foreign('fk_id_cutsheet').references('pk_id_cutsheet').inTable('tb_cutsheet');
        table.foreign('fk_id_tamanho').references('pk_id_tamanho').inTable('tb_tamanho');
    })
  }; 
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_material');
  };
          