
exports.up = function(knex) {
    return knex.schema.createTable('tb_stock', function(table){
        table.increments('pk_id_stock').primary();              
        table.integer('fk_id_cutsheet').unsigned().notNullable();                     
        table.integer('fk_id_referencia').unsigned().notNullable();                            
        table.integer('fk_id_tamanho').unsigned().notNullable();
        table.string('nome')
        table.string('cor_stock')
        table.double('qty_recebida'); 
        table.double('qty_erequisitada'); 
        table.double('qty_remanascente');
        
        table.datetime('created_at_stock').defaultTo(knex.fn.now());
        
        table.foreign('fk_id_referencia').references('pk_id_referencia').inTable('tb_referencia_produto');
        table.foreign('fk_id_tamanho').references('pk_id_tamanho').inTable('tb_tamanho');
        table.foreign('fk_id_cutsheet').references('pk_id_cutsheet').inTable('tb_cutsheet');
    })
  }; 
 
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_stock');
  };