
exports.up = function(knex) {
    return knex.schema.createTable('tb_cutsheet', function(table){
        table.increments('pk_id_cutsheet').primary();    
        table.string('codigo_cutsheet').notNullable();
        table.string('cod_tecido1').notNullable(); 
        table.string('cod_tecido2');        
        table.string('tipo_peca').notNullable();
        table.integer('quantidade_peca').notNullable(); 
        table.double('metragem_tecido').notNullable();
        table.string('cod_intertela1').notNullable(); 
        table.string('cod_intertela2'); 
        table.double('metragem_intertela').notNullable();        
        table.string('cod_bolso1'); 
        table.string('cod_bolso2');         
        table.double('metragem_bolso');    
        table.string('tipo_etiqueta').notNullable(); 
        table.string('especifidade_peca').notNullable();                
        table.integer('nr_cortes').notNullable();    
        table.string('cor').notNullable();              
        table.string('sticker_tipo');
        table.string('cod_cones');
        table.datetime('created_at_cutsheet').defaultTo(knex.fn.now());      
        table.datetime('update_at_cutsheet').defaultTo(knex.fn.now());  
  
         })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('tb_cutsheet');
  };
          